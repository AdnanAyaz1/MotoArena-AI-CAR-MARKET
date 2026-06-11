"use client";

import React, { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LogOutIcon, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import EditUserDialog from "../Dialoges/EditUserDialog";
import { User as UserType } from "@prisma/client/edge";

const UserDropDown = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const [openEditUserDialog, setOpenEditUserDialog] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!session?.user?.id) return;
      try {
        const res = await fetch(`/api/user/${session.user.id}`);
        const data = await res.json();
        if (data.success) {
          setUser(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    fetchUser();
  }, [session?.user?.id, openEditUserDialog]);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/sign-in" });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
        <DropdownMenuContent className="p-2 bg-[#1a2024] border border-white/[0.08] shadow-xl shadow-black/30">
          <DropdownMenuLabel className="font-[family-name:var(--font-jetbrains-mono)] text-[10px] text-on-surface-variant/50 uppercase tracking-wider">
            My Account
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-white/[0.06]" />

          <DropdownMenuItem
            className="cursor-pointer focus:bg-white/[0.04] focus:text-on-surface text-on-surface-variant hover:text-on-surface font-[family-name:var(--font-jakarta)] text-sm rounded-lg px-3 py-2.5 transition-colors"
            onClick={() => setOpenEditUserDialog(true)}
          >
            <div className="flex items-center gap-2.5">
              <User className="w-4 h-4" />
              Profile
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="cursor-pointer focus:bg-red-500/10 focus:text-red-400 text-on-surface-variant hover:text-red-400 font-[family-name:var(--font-jakarta)] text-sm rounded-lg px-3 py-2.5 transition-colors"
            onClick={handleLogout}
          >
            <div className="flex items-center gap-2.5">
              <LogOutIcon className="w-4 h-4" />
              Logout
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <EditUserDialog
        open={openEditUserDialog}
        setOpen={setOpenEditUserDialog}
        user={user}
      />
    </>
  );
};

export default UserDropDown;
