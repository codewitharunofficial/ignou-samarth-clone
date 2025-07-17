import axios from "axios";

// utils/auth.ts
export const validateToken = async (): Promise<boolean> => {
  const token = localStorage.getItem("auth_token");
  if (!token) return false;

  const res = await fetch("/api/validate-token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });

  const data = await res.json();
  return res.ok && data.valid;
};

// utils/auth.ts
export const login = async (userId: string, password: string) => {
  const res = await axios.request({
    url: "/api/auth",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({ userId, password }),
  });

  const data = await res.data;
  if (res.status === 200 && data.token) {
    localStorage.setItem("auth_token", data.token);
    return { success: true };
  }
  return { success: false, error: data.error };
};
