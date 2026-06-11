"use client";

import { AnimatePresence } from "framer-motion";
import LoadingDialog from "@/components/Dialoges/LoadingDialog";

const loading = () => {
  return (
    <AnimatePresence>
      <LoadingDialog />
    </AnimatePresence>
  );
};

export default loading;
