"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";

export const PaginationComponent = ({ noOfPages }: { noOfPages: number }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const handlePageChange = (page: number) => {
    if (page < 1 || page > noOfPages) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const pageGroupSize = 10;
  const currentGroup = Math.floor((currentPage - 1) / pageGroupSize);
  const startPage = currentGroup * pageGroupSize + 1;
  const endPage = Math.min(startPage + pageGroupSize - 1, noOfPages);
  const pagesArray = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="mt-12 flex justify-center"
    >
      <div className="flex items-center gap-2">
        {/* Previous */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-10 h-10 rounded-xl border border-white/[0.06] bg-white/[0.02] flex items-center justify-center hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-300 disabled:opacity-30 disabled:pointer-events-none"
        >
          <ChevronLeft className="w-4 h-4 text-on-surface" />
        </button>

        {/* First page */}
        {startPage > 1 && (
          <>
            <button
              onClick={() => handlePageChange(1)}
              className="w-10 h-10 rounded-xl border border-white/[0.06] bg-white/[0.02] font-[family-name:var(--font-jetbrains-mono)] text-xs text-on-surface-variant hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-300"
            >
              1
            </button>
            {startPage > 2 && (
              <span className="text-on-surface-variant px-1">...</span>
            )}
          </>
        )}

        {/* Page numbers */}
        {pagesArray.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`w-10 h-10 rounded-xl font-[family-name:var(--font-jetbrains-mono)] text-xs transition-all duration-300 ${
              currentPage === page
                ? "gradient-bg text-black font-bold shadow-lg shadow-primary/20"
                : "border border-white/[0.06] bg-white/[0.02] text-on-surface-variant hover:bg-white/[0.04] hover:border-white/[0.12]"
            }`}
          >
            {page}
          </button>
        ))}

        {/* Last page */}
        {endPage < noOfPages && (
          <>
            {endPage < noOfPages - 1 && (
              <span className="text-on-surface-variant px-1">...</span>
            )}
            <button
              onClick={() => handlePageChange(noOfPages)}
              className="w-10 h-10 rounded-xl border border-white/[0.06] bg-white/[0.02] font-[family-name:var(--font-jetbrains-mono)] text-xs text-on-surface-variant hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-300"
            >
              {noOfPages}
            </button>
          </>
        )}

        {/* Next */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === noOfPages}
          className="w-10 h-10 rounded-xl border border-white/[0.06] bg-white/[0.02] flex items-center justify-center hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-300 disabled:opacity-30 disabled:pointer-events-none"
        >
          <ChevronRight className="w-4 h-4 text-on-surface" />
        </button>
      </div>
    </motion.div>
  );
};
