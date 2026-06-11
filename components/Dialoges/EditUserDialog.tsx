"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import EditUserForm from "../Forms/EditUserForm";
import { User } from "@prisma/client/edge";

const EditUserDialog = ({
  open,
  setOpen,
  user,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  user?: User | null;
}) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-md"
          >
            <div className="relative rounded-2xl border border-white/[0.06] bg-[#1a2024] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-transparent" />
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/[0.06] rounded-full blur-[80px]" />

              <div className="relative z-10 p-6">
                <button
                  onClick={() => setOpen(false)}
                  className="absolute top-4 right-4 p-2 rounded-xl hover:bg-white/[0.05] text-on-surface-variant hover:text-on-surface transition-all duration-300"
                >
                  <X className="w-5 h-5" />
                </button>

                <h2 className="font-[family-name:var(--font-sora)] text-xl font-bold text-on-surface mb-1">
                  Edit Profile
                </h2>
                <p className="text-on-surface-variant font-[family-name:var(--font-jakarta)] text-sm mb-6">
                  Update your profile information
                </p>

                {user && <EditUserForm user={user} setOpen={setOpen} />}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditUserDialog;
