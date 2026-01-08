// import { createContext, useContext, useEffect, useState } from "react";
// import api from "../lib/api";
// import { useRouter } from "next/router";

// const AuthContext = createContext<any>(null);

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   const loadUser = async () => {
//     const token = localStorage.getItem("access");
//     if (!token) {
//       setLoading(false);
//       return;
//     }

//     try {
//         const res = await api.get("/user/me/");
//         // const res = await api.get("/api/user/me/");
//         // const res = await api.get("/user/me/");
//         setUser(res.data);
//     } catch (err) {
//         console.error("Failed to fetch user", err);
//         logout();
//         // setUser(null);
//     } finally {
//         setLoading(false);
//     }
//     //   const res = await api.get("/user/me/");
//     //   const res = await api.get("http://127.0.0.1:8000/api/user/me/");
//     //   http://127.0.0.1:8000/api/token/refresh/
//     //   const res = await api.get("/user_profile/me/");
//   };
//   const login = async (username: string, password: string) => {
//     // const res = await api.post("/api/token/", { username, password });
//     const res = await api.post("/token/", { username, password });
//     localStorage.setItem("access", res.data.access);
//     localStorage.setItem("refresh", res.data.refresh);
//     await loadUser(); // Fetch user data immediately after getting token
//     router.push("/user_dashboard/"); // Redirect to dashboard
//   };

//   const logout = () => {
//     localStorage.removeItem("access");
//     localStorage.removeItem("refresh");
//     setUser(null);
//     // router.push("/login");
//     router.push("/user_login");
//     router.push("/user_login");
//   };

//   useEffect(() => {
//     loadUser();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, setUser, loading, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
import { useRouter } from "next/router";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import api from "../lib/api";

export interface User {
  id: number;
  username: string;
  //   email?: string;
}
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  //   const [user, setUser] = useState<any>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const logout = useCallback(() => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setUser(null);
    router.push("/user_login");
  }, [router]);

  const loadUser = useCallback(async () => {
    const token = localStorage.getItem("access");

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await api.get<User>("/user/me/");
      setUser(res.data);
    } catch (err) {
      console.error("Failed to fetch user", err);
      logout();
    } finally {
      setLoading(false);
    }
  }, [logout]);

  const login = async (username: string, password: string) => {
    const res = await api.post("/token/", { username, password });
    localStorage.setItem("access", res.data.access);
    localStorage.setItem("refresh", res.data.refresh);
    await loadUser();
    router.push("/user_dashboard/");
  };

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// export const useAuth = () => useContext(AuthContext);
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
