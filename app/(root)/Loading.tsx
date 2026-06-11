"use client";

import { AnimatePresence } from "framer-motion";
import LoadingDialog from "@/components/Dialoges/LoadingDialog";

const Loading = () => {
  return (
    <AnimatePresence>
      <LoadingDialog />
    </AnimatePresence>
  );
};

export default Loading;
