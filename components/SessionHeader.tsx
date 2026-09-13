"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import Header from "./Header";

interface SessionUser {
  role?: string;
  imageUrl?: string | null;
}

const SessionHeader = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState<SessionUser | null>(null);

  useEffect(() => {
    let active = true;
    const userId = session?.user?.id;

    if (!userId) {
      setUser(null);
      return;
    }

    fetch(`/api/user/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (active && data.success) {
          setUser(data.data);
        }
      })
      .catch(() => {
        if (active) setUser(null);
      });

    return () => {
      active = false;
    };
  }, [session?.user?.id]);

  return <Header user={user} />;
};

export default SessionHeader;