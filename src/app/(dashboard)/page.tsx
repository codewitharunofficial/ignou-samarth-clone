// app/(dashboard)/page.tsx
"use client";
import { useEffect } from "react";
import Main from "../../../components/Main";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      // Redirect to login if no token
      router.push("/auth");
    }
  }, []);

  return <Main />;
}
