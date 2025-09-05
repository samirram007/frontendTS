// AppRouter.tsx
import { createRouter, RouterProvider } from '@tanstack/react-router';
import LoadingBar from 'react-top-loading-bar';
import { useAuth } from './features/auth/contexts/AuthContext';
import * as TanstackQuery from './integrations/tanstack-query/root-provider';
import { routeTree } from './routeTree.gen';

export const router = createRouter({
    routeTree,
    context: undefined!,
    defaultPreload: 'intent',
    scrollRestoration: true,
    defaultStructuralSharing: true,
    defaultPreloadStaleTime: 0,
});

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
        context: {
            auth: ReturnType<typeof useAuth>;
            queryClient: ReturnType<typeof TanstackQuery.getContext>['queryClient'];

        };
    }
}

export function AppRouter() {
    const auth = useAuth();
    const { queryClient } = TanstackQuery.getContext();
    console.log('AppRouter: auth', auth);

    if (auth.isLoading) return <LoadingBar />;

    return (
        <RouterProvider
            router={router}
            context={{
                auth,
                queryClient,
            }}
        />
    );
}
