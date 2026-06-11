"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { editUserSchema } from "@/lib/zod-validation-schemas";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { User } from "@prisma/client/edge";
import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { Loader2, Upload, Check } from "lucide-react";
import { updateUserProfile } from "@/actions/updateUserProfile";

const EditUserForm = ({
  user,
  setOpen,
}: {
  user: User;
  setOpen: (open: boolean) => void;
}) => {
  const router = useRouter();
  const { update } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof editUserSchema>>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      username: user?.username || "",
      image: user?.imageUrl || "",
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = form;

  const currentImage = watch("image");

  const onSubmit = async (data: z.infer<typeof editUserSchema>) => {
    setIsLoading(true);
    try {
      const res = await updateUserProfile(user.id, {
        username: data.username,
        imageUrl: data.image || "",
      });

      if (res.success) {
        await update();
        toast.success("Profile updated successfully");
        router.refresh();
        setOpen(false);
      } else {
        toast.error(res.message || "Failed to update profile");
      }
    } catch {
      toast.error("Something went wrong");
    }
    setIsLoading(false);
  };

  const handleUpload = (results: CloudinaryUploadWidgetResults) => {
    if (
      results.event === "success" &&
      results.info &&
      typeof results.info === "object" &&
      "secure_url" in results.info
    ) {
      setValue("image", results.info.secure_url, { shouldValidate: true });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Username */}
      <div>
        <label className="block font-[family-name:var(--font-jetbrains-mono)] text-[10px] text-on-surface-variant/60 uppercase tracking-wider mb-2">
          Username
        </label>
        <input
          {...register("username")}
          className="w-full px-4 py-3 rounded-xl border border-white/[0.06] bg-white/[0.02] text-on-surface font-[family-name:var(--font-jakarta)] text-sm placeholder:text-on-surface-variant/30 focus:border-primary/50 hover:bg-white/[0.04] focus:bg-white/[0.04] transition-all duration-300 outline-none"
          placeholder="Enter username"
        />
        {errors.username && (
          <p className="mt-1 text-red-400 font-[family-name:var(--font-jakarta)] text-xs">
            {errors.username.message}
          </p>
        )}
      </div>

      {/* Profile Image */}
      <div>
        <label className="block font-[family-name:var(--font-jetbrains-mono)] text-[10px] text-on-surface-variant/60 uppercase tracking-wider mb-2">
          Profile Image
        </label>
        <div className="flex items-center gap-4">
          {currentImage && (
            <div className="relative w-16 h-16 rounded-full overflow-hidden border border-white/[0.06]">
              <img
                src={currentImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <CldUploadWidget
            uploadPreset="DevFlow"
            onSuccessAction={handleUpload}
          >
            {({ open }) => (
              <button
                type="button"
                onClick={() => open()}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] text-on-surface-variant hover:text-on-surface font-[family-name:var(--font-jakarta)] text-sm transition-all duration-300"
              >
                <Upload className="w-4 h-4" />
                Upload Image
              </button>
            )}
          </CldUploadWidget>
        </div>
      </div>

      {/* Submit */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={isSubmitting || isLoading}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl gradient-bg text-black font-[family-name:var(--font-jakarta)] text-sm font-semibold hover:opacity-90 transition-all duration-300 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Check className="w-4 h-4" />
              Save Changes
            </>
          )}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          disabled={isLoading}
          className="px-6 py-3 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] text-on-surface font-[family-name:var(--font-jakarta)] text-sm font-medium transition-all duration-300"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditUserForm;
