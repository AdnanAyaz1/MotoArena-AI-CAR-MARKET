"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, Loader2, Upload, Trash, Sparkles, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { getCarInfoAi } from "@/actions/getCarInfoAi";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

const aiSteps = [
  "Uploading image for high-precision vision analysis...",
  "Scanning body geometry, emblems, and aerodynamic lines...",
  "Matching contours against luxury vehicle database...",
  "Extracting vehicle make, model, and year...",
  "Loading matching showroom listings...",
];

const textSteps = [
  "Scanning database for matching vehicles...",
  "Filtering by model specifications and performance...",
  "Preparing showroom inventory...",
];

export function HomeSearch() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [searchState, setSearchState] = useState<"idle" | "text" | "image">("idle");
  const [aiStep, setAiStep] = useState(0);
  const [textStep, setTextStep] = useState(0);
  const [identifiedCar, setIdentifiedCar] = useState<string | null>(null);

  useEffect(() => {
    if (searchState !== "text") return;
    const t1 = setTimeout(() => setTextStep(1), 500);
    const t2 = setTimeout(() => setTextStep(2), 1200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [searchState]);

  const handleTextSearch = async () => {
    const query = searchTerm.trim();
    if (!query || searchState !== "idle") return;

    setSearchState("text");
    setTextStep(0);
    router.push(`/cars?search=${encodeURIComponent(query)}`);
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

    setSearchState("image");
    setAiStep(0);
    setIdentifiedCar(null);

    const stepInterval = setInterval(() => {
      setAiStep((prev) => (prev < aiSteps.length - 2 ? prev + 1 : prev));
    }, 900);

    try {
      const response = await getCarInfoAi(file);
      clearInterval(stepInterval);

      if (response.success && response.data) {
        setIdentifiedCar(response.data.carName);
        setAiStep(aiSteps.length - 1);
        setTimeout(() => {
          router.push(`/cars?search=${encodeURIComponent(response.data.carName)}`);
        }, 800);
      } else {
        setSearchState("idle");
        toast.error(
          "Could not identify the car. Try another image or text search."
        );
      }
    } catch {
      clearInterval(stepInterval);
      setSearchState("idle");
      toast.error("Error processing image with AI");
    }
  };

  const isSearching = searchState !== "idle";

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      <div className="glass-card rounded-none p-2 sm:p-2.5 flex flex-col sm:flex-row items-stretch sm:items-center shadow-2xl mb-4 max-w-5xl mx-auto gap-2 sm:gap-0">
        <div className="flex items-center flex-1 px-3 sm:px-8">
          {searchState === "text" ? (
            <Loader2 className="w-6 h-6 text-primary animate-spin mr-4 flex-shrink-0" />
          ) : (
            <Search className="w-6 h-6 text-white/70 mr-4 flex-shrink-0" />
          )}
          <input
            type="text"
            placeholder="Search by make, model, or year"
            value={searchTerm}
            disabled={isSearching}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent border-none focus:ring-0 text-white placeholder:text-white/50 font-[family-name:var(--font-inter)] text-sm sm:text-lg py-3 sm:py-5 outline-none disabled:opacity-60"
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            disabled={isSearching}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isSearching}
            className={`p-2.5 rounded-full transition-all ml-2 relative ${
              searchState === "image"
                ? "bg-primary/20 text-primary border border-primary/40"
                : "hover:bg-white/10 text-white/70 hover:text-white"
            } disabled:opacity-50`}
            title="AI Image Search"
          >
            {searchState === "image" ? (
              <Sparkles className="w-5 h-5 animate-spin text-primary" style={{ animationDuration: "3s" }} />
            ) : (
              <Upload className="w-5 h-5" />
            )}
          </button>
        </div>

        <Button
          onClick={handleTextSearch}
          disabled={isSearching || (!searchTerm.trim() && searchState === "idle")}
          className="gradient-bg text-on-primary-fixed w-full sm:w-auto px-6 sm:px-12 py-3.5 sm:py-7 rounded-none font-bold text-base sm:text-lg hover:brightness-110 transition-all duration-300 shadow-lg shadow-primary/20 disabled:opacity-70 flex items-center justify-center gap-2"
        >
          {isSearching ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Searching...</span>
            </>
          ) : (
            "Search"
          )}
        </Button>
      </div>

      <AnimatePresence mode="wait">
        {searchState === "image" && (
          <motion.div
            key="ai-loader"
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card rounded-2xl p-5 border border-primary/30 shadow-2xl relative overflow-hidden mb-12"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.06] via-secondary/[0.03] to-transparent pointer-events-none" />
            <div className="absolute -top-20 -right-20 w-48 h-48 bg-primary/[0.08] rounded-full blur-[60px] pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
              {previewImage && (
                <div className="relative w-full md:w-56 h-36 rounded-xl overflow-hidden border border-primary/30 flex-shrink-0 shadow-lg shadow-primary/10">
                  <Image
                    src={previewImage}
                    alt="AI Car Scan"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-primary/[0.08]" />

                  <motion.div
                    className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00d2ff] to-transparent shadow-[0_0_15px_#00d2ff]"
                    animate={{ top: ["5%", "92%", "5%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />

                  <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-primary" />
                  <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-primary" />
                  <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-primary" />
                  <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-primary" />

                  <div className="absolute bottom-2 left-2 right-2 bg-black/70 backdrop-blur-md py-1 px-2.5 rounded-md flex items-center justify-between border border-white/10">
                    <span className="font-[family-name:var(--font-jetbrains-mono)] text-[9px] uppercase tracking-wider text-primary flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                      AI Vision
                    </span>
                    <span className="font-[family-name:var(--font-jetbrains-mono)] text-[9px] text-white/80 font-bold">
                      {Math.min(100, Math.round(((aiStep + 1) / aiSteps.length) * 100))}%
                    </span>
                  </div>
                </div>
              )}

              <div className="flex-1 w-full space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-primary animate-spin" style={{ animationDuration: "3s" }} />
                    </div>
                    <div>
                      <h4 className="font-[family-name:var(--font-sora)] text-sm font-bold text-on-surface">
                        Analyzing Car Image
                      </h4>
                      <p className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] text-primary uppercase tracking-widest">
                        Gemini Vision Engine
                      </p>
                    </div>
                  </div>

                  {identifiedCar && (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex items-center gap-1.5 bg-secondary/10 border border-secondary/30 px-3 py-1 rounded-full text-secondary font-[family-name:var(--font-jetbrains-mono)] text-xs font-semibold"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{identifiedCar}</span>
                    </motion.div>
                  )}
                </div>

                <div className="min-h-[22px]">
                  <motion.p
                    key={aiStep}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="font-[family-name:var(--font-jakarta)] text-xs text-on-surface-variant flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span>
                      {identifiedCar
                        ? `Car identified: ${identifiedCar} - Opening showroom...`
                        : aiSteps[aiStep]}
                    </span>
                  </motion.p>
                </div>

                <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full gradient-bg"
                    initial={{ width: "15%" }}
                    animate={{
                      width: `${Math.min(100, Math.round(((aiStep + 1) / aiSteps.length) * 100))}%`,
                    }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {searchState === "text" && (
          <motion.div
            key="text-loader"
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card rounded-2xl p-4 border border-primary/30 shadow-2xl relative overflow-hidden mb-12"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.06] via-secondary/[0.03] to-transparent pointer-events-none" />

            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <Loader2 className="w-5 h-5 text-primary animate-spin" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-[family-name:var(--font-sora)] text-sm font-bold text-on-surface">
                      Searching Showroom
                    </h4>
                    <span className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-full">
                      &ldquo;{searchTerm}&rdquo;
                    </span>
                  </div>
                  <motion.p
                    key={textStep}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="font-[family-name:var(--font-jakarta)] text-xs text-on-surface-variant mt-0.5"
                  >
                    {textSteps[textStep]}
                  </motion.p>
                </div>
              </div>

              <div className="w-full sm:w-48 h-1.5 bg-white/[0.06] rounded-full overflow-hidden flex-shrink-0">
                <motion.div
                  className="h-full gradient-bg"
                  initial={{ width: "30%" }}
                  animate={{ width: `${((textStep + 1) / textSteps.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </motion.div>
        )}

        {searchState === "idle" && previewImage && (
          <motion.div
            key="preview-only"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass-card rounded-2xl p-3 border border-white/[0.08] shadow-xl mb-12 w-fit"
          >
            <div className="relative group w-fit">
              <Image
                src={previewImage}
                alt="Uploaded car"
                width={200}
                height={150}
                className="object-cover rounded-xl w-auto h-[100px]"
              />
              <button
                onClick={() => setPreviewImage(null)}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-black/90"
              >
                <Trash size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
