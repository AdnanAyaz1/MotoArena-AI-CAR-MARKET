import { Loader2 } from "lucide-react";
import React from "react";

const SubmitButton = ({
  isLoading,
  text,
  disabled,
}: {
  isLoading: boolean;
  text?: string;
  disabled?: boolean;
}) => {
  return (
    <button
      type="submit"
      disabled={isLoading || disabled}
      className="w-full py-4 rounded-xl gradient-bg text-black font-[family-name:var(--font-jetbrains-mono)] text-xs font-bold uppercase tracking-[0.2em] hover:opacity-90 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
      {text}
    </button>
  );
};

export default SubmitButton;
