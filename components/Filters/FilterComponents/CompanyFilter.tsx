"use client";

import { Check, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

interface CompanyFilterProps {
  companies: string[];
  selectedCompany: string | null;
  onCompanyChange: (value: string) => void;
}

const CompanyFilter = ({
  companies,
  selectedCompany,
  onCompanyChange,
}: CompanyFilterProps) => {
  const searchParams = useSearchParams();

  return (
    <div className="space-y-3 p-4 border-b border-white/[0.06]">
      <h4 className="text-xs font-bold font-[family-name:var(--font-jetbrains-mono)] text-on-surface-variant uppercase tracking-wider flex justify-between">
        <span>Company</span>
        {searchParams.get("company") && (
          <button
            className="text-primary flex items-center cursor-pointer hover:text-secondary transition-colors"
            onClick={() => onCompanyChange("")}
          >
            <X className="mr-1 h-3 w-3" />
            Clear
          </button>
        )}
      </h4>
      <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
        {companies.map((company) => (
          <button
            key={company}
            onClick={() => onCompanyChange(company)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200",
              selectedCompany === company
                ? "gradient-bg text-black"
                : "bg-white/[0.04] text-on-surface-variant hover:bg-white/[0.08] hover:text-on-surface border border-white/[0.06]"
            )}
          >
            {company}
            {selectedCompany === company && (
              <Check className="h-3 w-3 inline" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CompanyFilter;
