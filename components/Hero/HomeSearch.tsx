"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, Loader2, Upload, Trash } from "lucide-react";

import { getCarInfoAi } from "@/actions/getCarInfoAi";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

export function HomeSearch() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTextSearch = async () => {
    if (!searchTerm) return;
    router.push(`/cars?search=${searchTerm}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleTextSearch();
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) setPreviewImage(e.target.result as string);
    };
    reader.readAsDataURL(file);

    setIsLoading(true);
    try {
      const response = await getCarInfoAi(file);
      if (response.success && response.data) {
        router.push(`/cars?search=${response.data.carName}`);
      } else {
        toast.error(
          "Could not identify the car. Try another image or text search."
        );
      }
    } catch {
      toast.error("Error processing image with AI");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full">
      {/* Glassmorphism Search Bar */}
      <div className="glass-card rounded-none p-2.5 flex items-center shadow-2xl mb-16 max-w-5xl mx-auto">
        <div className="flex items-center flex-1 px-8">
          <Search className="w-6 h-6 text-white/70 mr-4" />
          <input
            type="text"
            placeholder="Search by make, model, or year"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent border-none focus:ring-0 text-white placeholder:text-white/50 font-[family-name:var(--font-inter)] text-lg py-5 outline-none"
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-2.5 rounded-full hover:bg-white/10 transition-colors ml-2"
            title="AI Image Search"
          >
            <Upload className="w-5 h-5 text-white/70 hover:text-white transition-colors" />
          </button>
        </div>

        <Button
          onClick={handleTextSearch}
          disabled={isLoading}
          className="gradient-bg text-on-primary-fixed px-12 py-7 rounded-none font-bold text-lg hover:brightness-110 transition-all duration-300 shadow-lg shadow-primary/20"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            "Search"
          )}
        </Button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="absolute top-full left-0 right-0 mt-3 p-4 glass-card rounded-2xl">
          <div className="flex items-center gap-3">
            <Loader2 className="w-5 h-5 text-primary animate-spin" />
            <p className="text-on-surface-variant text-sm font-[family-name:var(--font-inter)]">
              Analyzing image with AI...
            </p>
          </div>
        </div>
      )}

      {/* Image Preview */}
      {previewImage && (
        <div className="absolute top-full left-0 right-0 mt-3 p-3 glass-card rounded-2xl">
          <div className="relative group w-fit">
            <Image
              src={previewImage}
              alt="Uploaded car"
              width={200}
              height={150}
              className="object-cover rounded-xl w-auto h-[120px]"
            />
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-all"
            >
              <Trash size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
