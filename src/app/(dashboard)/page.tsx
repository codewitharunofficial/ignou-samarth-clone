// app/(dashboard)/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import Main from "../../../components/Main";
import { useRouter } from "next/navigation";
import { User } from "@/types";

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = React.useState<User>({ userId: "", role: "user" });

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const user = localStorage.getItem("user_info");

    if (user) {
      const userData = JSON.parse(user);
      console.log("User Data: ", userData);
      setUser({ userId: userData?.userId, role: userData?.role });
    }
    // console.log(user);
    if (!token) {
      // Redirect to login if no token
      router.push("/auth");
    }
  }, []);

  return <Main user={user} />;
}
