"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { APIResponseType, AuthContextType, User } from "@/utils/types";

const AuthContext = createContext<AuthContextType>({
  auth: {
    isLoggedIn: false,
    user: {
      id: 0,
      email: "",
      userName: "",
      loggedIn: false,
    },
  },
  setAuth: (value: { isLoggedIn: boolean; user: User | null }) => {},
  logout: (id: number) => {},
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<{ isLoggedIn: boolean; user: User | null }>({
    isLoggedIn: false,
    user: null,
  });

  const logout = async (id: number) => {
    try {
      const data = JSON.stringify({ userId: id });

      const res: APIResponseType<null> = await fetch("/api/auth/logout", {
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());

      if (!res || res.error) {
        throw new Error(res.message);
      }

      setAuth({ isLoggedIn: false, user: null });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response: APIResponseType<User> = await fetch(
          "/api/auth/check"
        ).then((res) => res.json());

        if (!response || response.error) {
          throw new Error("User not logged In");
        }

        setAuth({ isLoggedIn: response.data.loggedIn, user: response.data });
      } catch (error) {
        console.log(error);
        setAuth({ isLoggedIn: false, user: null });
      }
    };
    checkAuth();
  }, []);

  const contextValue: AuthContextType = {
    auth,
    setAuth,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
