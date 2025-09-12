// src/context/AuthContext.tsx
import { useQueryClient } from '@tanstack/react-query';
import { type ReactNode } from '@tanstack/react-router';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchUserProfileService, loginService, logoutService } from '../services/apis';
import type { IUserDetail } from '../interfaces/profile-interface';
import type { ILoginPayload } from '../interfaces/login-interface';
import { useGetUserProfile } from '../hooks/ProfileQuery';
import { toast } from 'sonner';

export type LoginProps = {
    email: string;
    password: string;
}

export interface AuthContextType {
    user: IUserDetail | null;
    setUser: React.Dispatch<React.SetStateAction<IUserDetail | null>>
    isLoading: boolean;
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    login: (props: LoginProps) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    // const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const {data,isSuccess,isPending,isError} = useGetUserProfile();
    const [isLoading, setIsLoading] = useState(isPending)
    const [user, setUser] = useState<IUserDetail | null>(null);
   
    const queryClient = useQueryClient();
    const fetchProfile = async () => {
        setIsLoading(true);
        // check cookie key "token" is set  else redirect to login
        try {
            console.log("call to profile api");
            const data = await fetchUserProfileService();
            console.log("data",data);
            setUser(data?.data.data);

            // console.log('profile Data: ', data, isAuthenticated, user);
        } catch (error) {
            // console.error("Failed to fetch profile:", error);
            // setIsAuthenticated(false)
            setIsLoading(false);
            setUser(null);
        } finally {
            // console.log('Profile fetch completed');
            setIsLoading(false);
        }
    };
    const login = async (payload:ILoginPayload) => {
        setIsLoading(true);
        const response = await loginService(payload);
        console.log("Response: ",response);
        if (response.status == 200) {
            console.log("User logged in to dashboard");
            fetchProfile();
        }
        else {
            setUser(null);
        }
        setIsLoading(false);


    };

    const logout = async () => {
        // console.log('Logging out...');
        setIsLoading(true);
        try {
            // Optionally hit a logout endpoint to clear server-side auth
            await logoutService();

            // Clear all client-side cache (e.g. React Query)
            queryClient.clear();

            // Clear user state from context
            setUser(null);
            setIsAuthenticated(false);
            

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
        // fetchProfile();
        // console.log("this called on error",isError);

        // if user logout it should not run fetchProfile and to prevent this we need some kind of checking on frontend either of action or something which will prevent this fetch profile call

        if(isSuccess){
            if(data.data.success == true){
                setUser(data.data.data);
            }
            else if(data.data.success == false){
                setUser(null);
                toast.error(data.data.message);
            }
           
            setIsLoading(false);
        }
        if(isError){
            setIsLoading(false);
        }
    },[isSuccess,isError,data]);

    return (
        <AuthContext.Provider
            value={{ user, isLoading, isAuthenticated, setIsAuthenticated, login, logout, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error('useAuth must be used within AuthProvider')
    return context
}
