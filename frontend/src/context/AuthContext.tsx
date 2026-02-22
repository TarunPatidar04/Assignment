import React, {
  createContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import Cookies from "js-cookie";
import type { User, AuthContextType } from "../types";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = Cookies.get("user");
    const token = Cookies.get("token");
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (token: string, userData: User) => {
    Cookies.set("token", token, { expires: 1 }); // 1 day
    Cookies.set("user", JSON.stringify(userData), { expires: 1 });
    setUser(userData);
  };

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
