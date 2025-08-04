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
  const { data } = await axios.request({
    url: "/api/auth",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({ userId, password }),
  });
  if (data.success && data.token) {
    localStorage.setItem("auth_token", data.token);
    localStorage.setItem("user_info", JSON.stringify(data.user));
    return data;
  }
  return data;
};

export const getUserRole = (): string => {
  const data = localStorage.getItem("user_info");
  if (data) {
    const user = JSON.parse(data);
    return user.role;
  } else {
    return "Error";
  }
};
