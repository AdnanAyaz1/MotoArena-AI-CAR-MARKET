"use client";

import React, { createContext, useContext, useTransition } from "react";
import { useRouter } from "next/navigation";

interface FilterContextType {
  isPending: boolean;
  applyFilter: (newUrl: string) => void;
  startFilterTransition: (callback: () => void) => void;
}

const FilterContext = createContext<FilterContextType>({
  isPending: false,
  applyFilter: () => {},
  startFilterTransition: () => {},
});

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const applyFilter = (newUrl: string) => {
    window.history.replaceState(null, "", newUrl);
    startTransition(() => {
      router.replace(newUrl, { scroll: false });
    });
  };

  return (
    <FilterContext.Provider
      value={{
        isPending,
        applyFilter,
        startFilterTransition: startTransition,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => useContext(FilterContext);
