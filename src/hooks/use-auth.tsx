"use client"
import api from "@/api/api";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { User } from "@/types/types";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import { setCurrentUser } from "../lib/features/user-reducer";
type Props = {
  callback?: (user: User) => void;
  redirectIfNull?: boolean;
}
const useAuth = ({
  callback, redirectIfNull //true if you want to redirect to login page if user is null
}: Props = { redirectIfNull: true }) => {
  const [pending, setPending] = useState<boolean>(false);
  const currentUser = useAppSelector((state: any) => state.UserReducer.user)
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/register";
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<User | null>(null);
  const [lastLogin, setLastLogin] = useState<number>();
  const fetchUser = async () => {
    setPending(true);
    try {
      const userData = await api.currentUser();
      if (!userData) {
        setUser(null);
        dispatch(setCurrentUser(null));
        if (redirectIfNull) {
          setPending(false);
          router.replace("/login")
        }
      } else {
        setUser(userData);
        dispatch(setCurrentUser(userData));
        const jwtToken = localStorage.getItem('x-auth');
        if (jwtToken) {
          const decodedToken: JwtPayload | null = jwt.decode(jwtToken) as JwtPayload;
          if (!decodedToken?.iat) {
            setLastLogin(0);
          } else {
            setLastLogin(decodedToken.iat);
          }
        }
        if (callback) {
          callback(userData);
        }
        if (isAuthPage) {
          setPending(false);
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
    setPending(false);
  };
  useEffect(() => {
    if (!currentUser) fetchUser();
    else setUser(currentUser);
  }, []);

  return { user, lastLogin, pending };
};

export default useAuth;
