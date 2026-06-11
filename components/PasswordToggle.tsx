"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface PasswordToggleProps {
  togglePasswordType: (fieldName: string) => void;
  fieldName: string;
}

const PasswordToggle = ({
  togglePasswordType,
  fieldName,
}: PasswordToggleProps) => {
  const [showIcon, setShowIcon] = useState(false);

  const handleClick = () => {
    setShowIcon(!showIcon);
    togglePasswordType(fieldName);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors"
    >
      {showIcon ? (
        <Eye className="w-4 h-4" />
      ) : (
        <EyeOff className="w-4 h-4" />
      )}
    </button>
  );
};

export default PasswordToggle;
