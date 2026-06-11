"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, Path } from "react-hook-form";
import { z } from "zod";
import { motion } from "framer-motion";
import { Mail, Lock, User } from "lucide-react";

import SubmitButton from "@/components/Buttons/SubmitButton";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import PasswordToggle from "../PasswordToggle";
import UsernameCheck from "../UsernameCheck";
import AuthFormWrapper from "../Wrappers/AuthFormWrapper";

interface AuthFormProps<T extends z.ZodType> {
  type: "Sign In" | "Sign Up";
  schema: T;
  defaultValues: z.infer<T>;
  onSubmit: (data: z.infer<T>) => void;
  isLoading?: boolean;
}

const getFieldIcon = (fieldName: string) => {
  switch (fieldName) {
    case "email":
      return <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/50" />;
    case "password":
    case "confirmPassword":
      return <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/50" />;
    case "username":
      return <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/50" />;
    default:
      return null;
  }
};

const AuthForm = <T extends z.ZodType>({
  type,
  schema,
  defaultValues,
  onSubmit,
  isLoading = false,
}: AuthFormProps<T>) => {
  const [showPassword, setShowPassword] = useState({
    passwordField: false,
    confirmPasswordField: false,
  });

  const togglePasswordType = (fieldName: string) => {
    if (fieldName.toLocaleLowerCase() === "password") {
      setShowPassword((pre) => ({
        ...pre,
        passwordField: !pre.passwordField,
      }));
    }
    if (fieldName.toLocaleLowerCase() === "confirmpassword") {
      setShowPassword((pre) => ({
        ...pre,
        confirmPasswordField: !pre.confirmPasswordField,
      }));
    }
  };

  const form = useForm<z.infer<T>>({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const { errors } = form.formState;

  const getFieldLabel = (fieldName: string) => {
    if (fieldName === "email") return "Email Address";
    if (fieldName === "confirmPassword") return "Confirm Password";
    if (fieldName === "username") return "Username";
    return fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
  };

  return (
    <AuthFormWrapper type={type}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {Object.keys(defaultValues).map((field, index) => (
            <motion.div
              key={field}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.05 }}
            >
              <FormField
                control={form.control}
                name={field as Path<z.infer<T>>}
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-on-surface font-[family-name:var(--font-sora)] text-sm font-semibold">
                      {getFieldLabel(field.name)}
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        {getFieldIcon(field.name)}
                        <Input
                          required
                          type={
                            field.name === "password"
                              ? showPassword.passwordField
                                ? "text"
                                : "password"
                              : field.name === "confirmPassword"
                                ? showPassword.confirmPasswordField
                                  ? "text"
                                  : "password"
                                : "text"
                          }
                          {...field}
                          className={`w-full ${
                            getFieldIcon(field.name) ? "pl-11" : "pl-4"
                          } pr-11 py-4 rounded-xl border bg-white/[0.02] text-on-surface font-[family-name:var(--font-jakarta)] text-sm placeholder:text-on-surface-variant/40 transition-all duration-300 ${
                            errors[field.name]
                              ? "border-red-500/50 focus:border-red-500 bg-red-500/[0.02]"
                              : "border-white/[0.06] focus:border-primary/50 hover:bg-white/[0.04] focus:bg-white/[0.04]"
                          }`}
                        />
                        {field.name === "username" && (
                          <UsernameCheck form={form} />
                        )}
                        {field.name?.toLocaleLowerCase().includes("password") && (
                          <PasswordToggle
                            togglePasswordType={togglePasswordType}
                            fieldName={field.name}
                          />
                        )}
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs font-[family-name:var(--font-jakarta)]" />
                  </FormItem>
                )}
              />
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <SubmitButton
              isLoading={isLoading}
              text={type}
              disabled={Object.keys(errors).length > 0}
            />
          </motion.div>
        </form>
      </Form>
    </AuthFormWrapper>
  );
};

export default AuthForm;
