"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useState } from "react";
import { toast } from "react-toastify";
import { z } from "zod";

import AuthForm from "@/components/Forms/AuthForm";
import { signInSchema } from "@/lib/zod-validation-schemas";
import { signIn } from "next-auth/react";

const SignInContent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (res?.error) {
        toast.error("Invalid Email or Password");
      } else {
        toast.success("Login Successful");
        router.push(callbackUrl);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthForm
      type="Sign In"
      schema={signInSchema}
      defaultValues={{ email: "", password: "" }}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    />
  );
};

const SignInPage = () => {
  return (
    <Suspense fallback={null}>
      <SignInContent />
    </Suspense>
  );
};

export default SignInPage;
