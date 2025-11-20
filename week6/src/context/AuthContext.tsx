import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { tokenStore } from "../hooks/useTokenStore";

type AuthContextValue = {
  isLoggedIn: boolean;
  setLoggedIn: (value: boolean) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    // 새로고침해도 토큰 있으면 로그인 상태 유지
    return tokenStore.get() !== null;
  });

  useEffect(() => {
    if (!isLoggedIn) {
      // 로그아웃되면 토큰도 제거
      tokenStore.clear();
    }
  }, [isLoggedIn]);

  const value = useMemo(
    () => ({
      isLoggedIn,
      setLoggedIn: setIsLoggedIn,
    }),
    [isLoggedIn]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (ctx === null) {
    throw new Error(
      "useAuthContext는 AuthProvider 안에서만 사용할 수 있습니다."
    );
  }
  return ctx;
}
