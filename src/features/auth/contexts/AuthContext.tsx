// src/context/AuthContext.tsx
import type { User } from '@/types/schema';
import { useQueryClient } from '@tanstack/react-query';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import { fetchUserProfileService, loginService, logoutService } from '../services/apis';
export type LoginProps = {
    email: string;
    password: string;
}

export interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (props: LoginProps) => Promise<void>;
    logout: () => Promise<void>;
    fetchProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    // const navigate = useNavigate();
    // const [isAuthenticated, setIsAuthenticated] = useState(true)
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true)
    const queryClient = useQueryClient();
    const fetchProfile = async () => {
        setIsLoading(true);
        // check cookie key "token" is set  else redirect to login


        try {
            const data = await fetchUserProfileService();
            flushSync(() => {

                setUser(data?.data);
            })

        } catch (error) {
            flushSync(() => {
                setUser(null);

            })
        } finally {
            setIsLoading(false);
        }
    };
    const login = React.useCallback(async ({ email, password }: LoginProps) => {
        setIsLoading(true);
        const response = await loginService({ email, password })
        if (response?.status === 'success') {

            await fetchProfile();
        }
        else {
            flushSync(() => {
                setUser(null);

            })
        }
        setIsLoading(false);
    }, [])

    const logout = React.useCallback(async () => {
        setIsLoading(true);
        try {
            // Optionally hit a logout endpoint to clear server-side auth
            await logoutService();

            // Clear all client-side cache (e.g. React Query)
            flushSync(() => {
                queryClient.clear();
                setUser(null);

            })


            // Optionally clear auth cookies manually, if not HTTP-only
            // document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=aipt-api.local; secure";

        } catch (error) {
            console.error("Logout failed:", error);
        }
        finally {
            setIsLoading(false);

        }
    }, [])

    useEffect(() => {
        fetchProfile();
    }, []);
    return (
        <AuthContext.Provider
            value={{ user, isLoading, isAuthenticated: !!user, login, logout, fetchProfile }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error('useAuth must be used within AuthProvider')
    return context
}
