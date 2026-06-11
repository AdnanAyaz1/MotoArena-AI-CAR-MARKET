"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  ArrowLeft,
  ArrowRight,
  Upload,
  Sparkles,
  Loader2,
  X,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import CarImage from "@/components/CardImages/CarImage";
import { fuelType, transmission, bodyType, status } from "@/lib/constants";
import { carFormSchema } from "@/lib/zod-validation-schemas";
import createCar from "@/actions/createCar";
import { processCarImageWithAI } from "@/actions/createCarAi";
import { FormSection } from "@/components/ui/FormSection";
import { FormField } from "@/components/ui/FormField";
import { SelectField } from "@/components/ui/SelectField";
import { inputClass } from "@/lib/utils";
import { CreateCarFormData, defaultCreateCarFormData } from "@/types/car";

export default function CreateCarPage() {
  const router = useRouter();
  const [step, setStep] = useState<"choose" | "manual" | "ai">("choose");
  const [formData, setFormData] = useState<CreateCarFormData>(defaultCreateCarFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [aiFile, setAiFile] = useState<File | null>(null);
  const [aiPreview, setAiPreview] = useState<string | null>(null);
  const [aiExtracting, setAiExtracting] = useState(false);
  const [aiConfidence, setAiConfidence] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAiFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setAiPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleImageUpload = (results: CloudinaryUploadWidgetResults) => {
    if (
      results.event === "success" &&
      results.info &&
      typeof results.info === "object" &&
      "secure_url" in results.info
    ) {
      const newUrl = results.info.secure_url;
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, newUrl],
      }));
      if (errors.images) setErrors((prev) => ({ ...prev, images: "" }));
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleExtractWithAI = async () => {
    if (!aiFile) return;
    setAiExtracting(true);
    try {
      const res = await processCarImageWithAI(aiFile);
      if (res.success && res.data) {
        const d = res.data;
        setFormData((prev) => ({
          ...prev,
          company: d.company || prev.company,
          model: d.model || prev.model,
          year: d.year ? String(d.year) : prev.year,
          color: d.color || prev.color,
          price: d.price ? String(d.price) : prev.price,
          mileage: d.mileage ? String(d.mileage) : prev.mileage,
          bodyType: d.bodyType || prev.bodyType,
          fuelType: d.fuelType || prev.fuelType,
          transmission: d.transmission || prev.transmission,
          description: d.description || prev.description,
        }));
        setAiConfidence(d.confidence || null);
        toast.success("Car details extracted! Review and submit.");
        setStep("manual");
      } else {
        toast.error(res.message || "Failed to extract car details");
      }
    } catch {
      toast.error("AI extraction failed. Please try again.");
    }
    setAiExtracting(false);
  };

  const handleSubmit = async () => {
    if (formData.images.length === 0) {
      setErrors({ images: "At least one image is required" });
      toast.error("Please upload at least one car image");
      return;
    }

    const validated = carFormSchema.safeParse(formData);
    if (!validated.success) {
      const fieldErrors: Record<string, string> = {};
      Object.entries(validated.error.flatten().fieldErrors).forEach(([key, msgs]) => {
        if (msgs && msgs.length) fieldErrors[key] = msgs[0];
      });
      setErrors(fieldErrors);
      toast.error("Please fix the errors in the form");
      return;
    }
    setSubmitting(true);
    try {
      const res = await createCar(validated.data);
      if (res.success) {
        toast.success(res.message);
        router.push("/admin/cars");
      } else {
        toast.error(res.message || "Failed to create car");
      }
    } catch {
      toast.error("Something went wrong");
    }
    setSubmitting(false);
  };

  return (
    <div className="px-6 md:px-10 max-w-[900px] mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <button
          onClick={() =>
            step === "choose" ? router.push("/admin/cars") : setStep("choose")
          }
          className="flex items-center gap-2 text-on-surface-variant hover:text-on-surface font-[family-name:var(--font-jakarta)] text-sm mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {step === "choose" ? "Back to Cars" : "Back"}
        </button>
        <h1 className="font-[family-name:var(--font-sora)] text-3xl font-bold text-on-surface">
          {step === "choose"
            ? "Add New Car"
            : step === "manual"
            ? "Enter Car Details"
            : "Extract with AI"}
        </h1>
      </motion.div>

      <AnimatePresence mode="wait">
        {/* Step 1: Choose Method */}
        {step === "choose" && (
          <motion.div
            key="choose"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {/* Manual Entry */}
            <button
              onClick={() => setStep("manual")}
              className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 text-left hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-500"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/[0.03] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5">
                  <ArrowRight className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-[family-name:var(--font-sora)] text-xl font-bold text-on-surface mb-2">
                  Manual Entry
                </h3>
                <p className="text-on-surface-variant font-[family-name:var(--font-jakarta)] text-sm leading-relaxed">
                  Fill in the car details yourself. Full control over every field.
                </p>
              </div>
            </button>

            {/* AI Extraction */}
            <button
              onClick={() => setStep("ai")}
              className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 text-left hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-500"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-tertiary/[0.03] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-tertiary/10 border border-tertiary/20 flex items-center justify-center mb-5">
                  <Sparkles className="w-6 h-6 text-tertiary" />
                </div>
                <h3 className="font-[family-name:var(--font-sora)] text-xl font-bold text-on-surface mb-2">
                  AI Extraction
                </h3>
                <p className="text-on-surface-variant font-[family-name:var(--font-jakarta)] text-sm leading-relaxed">
                  Upload a car photo and let AI extract the details automatically.
                </p>
              </div>
            </button>
          </motion.div>
        )}

        {/* Step 2a: AI Upload */}
        {step === "ai" && (
          <motion.div
            key="ai"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-tertiary/[0.02] via-transparent to-transparent" />
              <div className="relative z-10 p-8">
                {/* Upload Area */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
                    aiPreview
                      ? "border-primary/30 bg-primary/[0.02]"
                      : "border-white/[0.08] hover:border-white/[0.15] hover:bg-white/[0.02]"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />

                  {aiPreview ? (
                    <div className="space-y-4">
                      <div className="relative inline-block">
                        <img
                          src={aiPreview}
                          alt="Car preview"
                          className="max-h-64 rounded-xl mx-auto"
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setAiFile(null);
                            setAiPreview(null);
                          }}
                          className="absolute -top-2 -right-2 p-1.5 rounded-full bg-surface border border-white/[0.1] text-on-surface-variant hover:text-red-400 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-on-surface-variant font-[family-name:var(--font-jakarta)] text-sm">
                        {aiFile?.name}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mx-auto">
                        <Upload className="w-7 h-7 text-on-surface-variant/50" />
                      </div>
                      <div>
                        <p className="text-on-surface font-[family-name:var(--font-sora)] font-semibold mb-1">
                          Upload car image
                        </p>
                        <p className="text-on-surface-variant/60 font-[family-name:var(--font-jakarta)] text-sm">
                          PNG, JPG up to 10MB
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Extract Button */}
                {aiPreview && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6"
                  >
                    <button
                      onClick={handleExtractWithAI}
                      disabled={aiExtracting}
                      className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl gradient-bg text-black font-[family-name:var(--font-jakarta)] text-sm font-semibold hover:opacity-90 transition-all duration-300 disabled:opacity-50"
                    >
                      {aiExtracting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Extracting details...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5" />
                          Extract Details with AI
                        </>
                      )}
                    </button>
                  </motion.div>
                )}

                {/* Confidence indicator */}
                {aiConfidence !== null && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 flex items-center gap-2 text-sm"
                  >
                    {aiConfidence >= 0.7 ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-amber-400" />
                    )}
                    <span className="font-[family-name:var(--font-jakarta)] text-on-surface-variant">
                      AI confidence: {Math.round(aiConfidence * 100)}% —
                      Please review all fields before submitting.
                    </span>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 2b: Manual / AI-filled Form */}
        {step === "manual" && (
          <motion.div
            key="manual"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Confidence Banner */}
            {aiConfidence !== null && (
              <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-primary/[0.05] border border-primary/20">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="font-[family-name:var(--font-jakarta)] text-sm text-on-surface">
                  AI-filled form with {Math.round(aiConfidence * 100)}% confidence.{" "}
                  <span className="text-on-surface-variant">Please review all fields.</span>
                </span>
              </div>
            )}

            {/* Car Info Section */}
            <FormSection title="Car Information">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormField label="Company" error={errors.company}>
                  <input
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="e.g. Toyota"
                    className={inputClass(errors.company)}
                  />
                </FormField>
                <FormField label="Model" error={errors.model}>
                  <input
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    placeholder="e.g. Camry"
                    className={inputClass(errors.model)}
                  />
                </FormField>
                <FormField label="Year" error={errors.year}>
                  <input
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    placeholder="e.g. 2024"
                    className={inputClass(errors.year)}
                  />
                </FormField>
                <FormField label="Color" error={errors.color}>
                  <input
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    placeholder="e.g. White"
                    className={inputClass(errors.color)}
                  />
                </FormField>
                <FormField label="Seats" error={errors.seats}>
                  <input
                    name="seats"
                    value={formData.seats}
                    onChange={handleChange}
                    placeholder="e.g. 5"
                    className={inputClass(errors.seats)}
                  />
                </FormField>
              </div>
            </FormSection>

            {/* Pricing & Mileage */}
            <FormSection title="Pricing & Mileage">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormField label="Price" error={errors.price}>
                  <input
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="e.g. 28999"
                    className={inputClass(errors.price)}
                  />
                </FormField>
                <FormField label="Mileage" error={errors.mileage}>
                  <input
                    name="mileage"
                    value={formData.mileage}
                    onChange={handleChange}
                    placeholder="e.g. 15000"
                    className={inputClass(errors.mileage)}
                  />
                </FormField>
              </div>
            </FormSection>

            {/* Specs */}
            <FormSection title="Specifications">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <FormField label="Fuel Type" error={errors.fuelType}>
                  <SelectField
                    name="fuelType"
                    value={formData.fuelType}
                    onChange={handleChange}
                    options={fuelType}
                    placeholder="Select fuel type"
                    error={!!errors.fuelType}
                  />
                </FormField>
                <FormField label="Transmission" error={errors.transmission}>
                  <SelectField
                    name="transmission"
                    value={formData.transmission}
                    onChange={handleChange}
                    options={transmission}
                    placeholder="Select transmission"
                    error={!!errors.transmission}
                  />
                </FormField>
                <FormField label="Body Type" error={errors.bodyType}>
                  <SelectField
                    name="bodyType"
                    value={formData.bodyType}
                    onChange={handleChange}
                    options={bodyType}
                    placeholder="Select body type"
                    error={!!errors.bodyType}
                  />
                </FormField>
              </div>
            </FormSection>

            {/* Status */}
            <FormSection title="Status">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormField label="Status" error={errors.status}>
                  <SelectField
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    options={status}
                    placeholder="Select status"
                    error={!!errors.status}
                  />
                </FormField>
                <div className="flex items-end">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            featured: e.target.checked,
                          }))
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 rounded-full bg-white/[0.06] peer-checked:bg-primary/30 transition-colors duration-300" />
                      <div className="absolute left-0.5 top-0.5 w-5 h-5 rounded-full bg-on-surface-variant peer-checked:bg-primary peer-checked:translate-x-5 transition-all duration-300" />
                    </div>
                    <span className="font-[family-name:var(--font-jakarta)] text-sm text-on-surface group-hover:text-on-surface transition-colors">
                      Featured
                    </span>
                  </label>
                </div>
              </div>
            </FormSection>

            {/* Description */}
            <FormSection title="Description">
              <FormField label="Description" error={errors.description}>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe the car..."
                  className={`${inputClass(errors.description)} resize-none`}
                />
              </FormField>
            </FormSection>

            {/* Images */}
            <FormSection title="Car Images">
              <div className="space-y-4">
                {errors.images && (
                  <p className="text-red-400 font-[family-name:var(--font-jakarta)] text-xs">
                    {errors.images}
                  </p>
                )}

                {/* Uploaded Images Grid */}
                {formData.images.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {formData.images.map((img, index) => (
                      <div
                        key={index}
                        className="relative group rounded-xl overflow-hidden border border-white/[0.06] bg-white/[0.02]"
                      >
                        <CarImage
                          src={img}
                          alt={`Car image ${index + 1}`}
                          className="w-full h-28 object-cover"
                        />
                        <button
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 backdrop-blur-sm text-white/80 hover:bg-red-500/80 hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-200"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                        {index === 0 && (
                          <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-primary/80 backdrop-blur-sm">
                            <span className="font-[family-name:var(--font-jetbrains-mono)] text-[9px] text-black font-bold">
                              PRIMARY
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Upload Button */}
                <CldUploadWidget
                  uploadPreset="DevFlow"
                  options={{
                    multiple: true,
                    maxFiles: 6,
                  }}
                  onSuccessAction={handleImageUpload}
                >
                  {({ open }) => (
                    <button
                      onClick={() => open()}
                      type="button"
                      className="w-full flex items-center justify-center gap-3 px-6 py-8 rounded-xl border-2 border-dashed border-white/[0.08] hover:border-white/[0.15] bg-white/[0.01] hover:bg-white/[0.03] text-on-surface-variant hover:text-on-surface transition-all duration-300"
                    >
                      <Plus className="w-5 h-5" />
                      <span className="font-[family-name:var(--font-jakarta)] text-sm">
                        Add Images
                      </span>
                    </button>
                  )}
                </CldUploadWidget>

                <p className="text-on-surface-variant/40 font-[family-name:var(--font-jakarta)] text-xs">
                  Upload up to 6 images. First image will be the primary thumbnail.
                </p>
              </div>
            </FormSection>

            {/* Submit */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl gradient-bg text-black font-[family-name:var(--font-jakarta)] text-sm font-semibold hover:opacity-90 transition-all duration-300 disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Car"
                )}
              </button>
              <button
                onClick={() => router.push("/admin/cars")}
                disabled={submitting}
                className="px-8 py-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] text-on-surface font-[family-name:var(--font-jakarta)] text-sm font-medium transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
