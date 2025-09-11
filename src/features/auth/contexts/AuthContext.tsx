// src/context/AuthContext.tsx
import type { User } from '@/types/schema';
import { useQueryClient } from '@tanstack/react-query';
import { type ReactNode } from '@tanstack/react-router';
import { createContext, useContext, useEffect, useState } from 'react';
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

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    // const navigate = useNavigate();
    // const [isAuthenticated, setIsAuthenticated] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState<User | null>(null);
    const queryClient = useQueryClient();
    const fetchProfile = async () => {
        setIsLoading(true);
        // check cookie key "token" is set  else redirect to login


        try {
            // console.log('Fetching profile...');
            const data = await fetchUserProfileService();
            setUser(data?.data);
            // console.log('Profile fetched successfully:', data?.data);

            // console.log('profile Data: ', data, isAuthenticated, user);
        } catch (error) {
            // console.error("Failed to fetch profile:", error);
            // setIsAuthenticated(false)
            setUser(null);
        } finally {
            // console.log('Profile fetch completed');

            setIsLoading(false);
        }
    };
    const login = async ({ email, password }: LoginProps) => {
        setIsLoading(true);
        const response = await loginService({ email, password })
        if (response?.status === 'success') {
            // setIsAuthenticated(true);
            // console.log('is authenticated');
            //setUser(response.data);
            // Optionally, you can fetch the user profile immediately after login
            await fetchProfile();
        }
        else {
            console.error('Login failed:', response?.message || 'Unknown error');
            // setIsAuthenticated(false);
            setUser(null);
        }
        setIsLoading(false);
        // axiosClient.get('/cookie-test').then(console.log);
        // await fetchProfile();

    };

    const logout = async () => {
        console.log('Logging out...');
        setIsLoading(true);
        try {
            // Optionally hit a logout endpoint to clear server-side auth
            await logoutService();

            // Clear all client-side cache (e.g. React Query)
            queryClient.clear();

            // Clear user state from context
            setUser(null);

            // Optionally clear auth cookies manually, if not HTTP-only
            // document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=aipt-api.local; secure";

        } catch (error) {
            console.error("Logout failed:", error);
        }
        finally {
            setIsLoading(false);

        }
    };

    useEffect(() => {
        // const tokenEntry = document.cookie
        //     .split('; ')
        //     .find(row => row.startsWith('token='));
        // const token = tokenEntry?.split('=')[1] ?? null;

        // console.log('Token found:', token);

        // if (!token) {
        //     setUser(null);
        //     setIsLoading(false);
        //     return;
        // }
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
