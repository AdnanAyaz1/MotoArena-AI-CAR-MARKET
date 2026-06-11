"use client";
import { getAllUser } from "@/actions/getAllUsers";
import { User } from "@prisma/client/edge";
import { Search, Users, Shield, ShieldOff, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { updateUserRole } from "@/actions/updateUserRole";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const ManageUsers = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [originalUsers, setOriginalUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      const res = await getAllUser();
      if (res.success) {
        setUsers(res.data as User[]);
        setOriginalUsers(res.data as User[]);
      }
      setIsLoading(false);
    };
    fetchUsers();
  }, []);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newData = originalUsers.filter((user) => {
      return (
        user.username.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
      );
    });
    setUsers(newData);
  };

  const handleUserUpdate = async (userId: string, role: "ADMIN" | "USER") => {
    const res = await updateUserRole(userId, role);
    if (res.success) {
      setUsers((pre) => {
        return pre.map((user) => {
          if (user.id === userId) {
            return res.data as User;
          }
          return user;
        });
      });
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search */}
      <form onSubmit={handleSearchSubmit} className="flex w-full sm:w-auto">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/50" />
          <input
            type="search"
            placeholder="Search users..."
            className="w-full sm:w-80 pl-11 pr-4 py-3 rounded-xl border border-white/[0.06] bg-white/[0.02] text-on-surface font-[family-name:var(--font-jakarta)] text-sm placeholder:text-on-surface-variant/40 focus:border-primary/50 hover:bg-white/[0.04] focus:bg-white/[0.04] transition-all duration-300 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </form>

      {/* Content */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-24">
          <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
          <p className="text-on-surface-variant font-[family-name:var(--font-jakarta)] text-sm">
            Loading users...
          </p>
        </div>
      ) : users.length > 0 ? (
        <div className="relative rounded-3xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="text-left px-6 py-4 font-[family-name:var(--font-jetbrains-mono)] text-xs text-on-surface-variant/50 uppercase tracking-wider">
                    User
                  </th>
                  <th className="text-left px-6 py-4 font-[family-name:var(--font-jetbrains-mono)] text-xs text-on-surface-variant/50 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="text-left px-6 py-4 font-[family-name:var(--font-jetbrains-mono)] text-xs text-on-surface-variant/50 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="text-right px-6 py-4 font-[family-name:var(--font-jetbrains-mono)] text-xs text-on-surface-variant/50 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors duration-300"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-white/[0.04] flex-shrink-0">
                          <Image
                            src={user.imageUrl || "/placeholder.jpg"}
                            alt={user.username}
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-on-surface font-[family-name:var(--font-sora)] text-sm font-semibold">
                          {user.username}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-on-surface-variant font-[family-name:var(--font-jakarta)] text-sm">
                        {user.email}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-[family-name:var(--font-jetbrains-mono)] ${
                          user.role === "ADMIN"
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-amber-500/10 text-amber-400"
                        }`}
                      >
                        {user.role === "ADMIN" ? (
                          <Shield className="w-3 h-3" />
                        ) : (
                          <Users className="w-3 h-3" />
                        )}
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end">
                        {user.role === "ADMIN" ? (
                          <button
                            onClick={() => handleUserUpdate(user.id, "USER")}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-red-500/10 hover:border-red-500/20 text-on-surface-variant hover:text-red-400 font-[family-name:var(--font-jakarta)] text-xs font-medium transition-all duration-300"
                          >
                            <ShieldOff className="w-3.5 h-3.5" />
                            Remove Admin
                          </button>
                        ) : (
                          <button
                            onClick={() => handleUserUpdate(user.id, "ADMIN")}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-primary/10 hover:border-primary/20 text-on-surface-variant hover:text-primary font-[family-name:var(--font-jakarta)] text-xs font-medium transition-all duration-300"
                          >
                            <Shield className="w-3.5 h-3.5" />
                            Make Admin
                          </button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="relative rounded-3xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-transparent" />
          <div className="relative z-10 flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="p-4 rounded-2xl bg-primary/10 mb-6">
              <Users className="w-10 h-10 text-primary" />
            </div>
            <h3 className="font-[family-name:var(--font-sora)] text-xl font-bold text-on-surface mb-2">
              No Users Found
            </h3>
            <p className="text-on-surface-variant font-[family-name:var(--font-jakarta)] text-sm">
              {search ? "No users match your search criteria." : "No users yet."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
