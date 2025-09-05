import { redirect } from '@tanstack/react-router';
import { useAuth } from '../features/auth/contexts/AuthContext'; // or use session storage

export async function protectedLoader() {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) {
        throw redirect({
            to: '/sign-in',
            search: { redirect: window.location.pathname }, // optional: after-login redirect
        })
    }
    return null
}