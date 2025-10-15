import axios, {
    AxiosError,
    type AxiosInstance,
    type AxiosRequestConfig,
    type AxiosResponse,
    type InternalAxiosRequestConfig,
} from 'axios';

const axiosClient: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true, // Send HTTP-only cookies
});

// --- 🔐 REQUEST INTERCEPTOR ---
axiosClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

// --- ⏳ Refresh Lock & Retry Queue ---
let isRefreshing = false;
let failedQueue: Array<{
    resolve: (value?: AxiosResponse) => void;
    reject: (reason?: AxiosError) => void;
}> = [];

const processQueue = (error: AxiosError | null) => {
    failedQueue.forEach(({ resolve, reject }) => {
        error ? reject(error) : resolve();
    });
    failedQueue = [];
};

// --- 🔁 Refresh Token Handler ---
export type RetryableRequestConfig = InternalAxiosRequestConfig & { _retry?: boolean };

// const handleRefreshToken = async (
//     originalRequest: RetryableRequestConfig
// ): Promise<AxiosResponse | void> => {
//     if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//             failedQueue.push({ resolve, reject });
//         }).then(() => axiosClient(originalRequest));
//     }

//     isRefreshing = true;
//     originalRequest._retry = true;

//     try {
//         await axiosClient.post('/auth/refresh'); // Refreshes HTTP-only cookie

//         processQueue(null);
//         return axiosClient(originalRequest); // Retry original request
//     } catch (refreshError) {
//         console.log('🔁 Refresh token failed:', refreshError);

//         const err = refreshError as AxiosError;
//         processQueue(err);
//         return Promise.reject(err);
//     } finally {
//         isRefreshing = false;
//     }
// };

// --- ⚠️ RESPONSE INTERCEPTOR ---

const handleRefreshToken = async (
    originalRequest: RetryableRequestConfig
) => {
    if (isRefreshing) {
        return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
        }).then(() => axiosClient(originalRequest));
    }

    isRefreshing = true;
    originalRequest._retry = true;

    try {
        // 👇 Prevent retrying refresh token request itself
        if (originalRequest.url?.includes('/auth/refresh')) {
            throw new Error('Cannot retry refresh request');
        }

        await axiosClient.post('/auth/refresh'); // Sets new cookies
        processQueue(null);
        return axiosClient(originalRequest);
    } catch (refreshError) {
        const err = refreshError as AxiosError;
        console.error('🔁 Refresh token failed:', err.response?.data || err.message);

        processQueue(err);

        // Optional: trigger logout if refresh fails
        window.dispatchEvent(new CustomEvent('force-logout'));

        return Promise.reject(err);
    } finally {
        isRefreshing = false;
    }
};

axiosClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as RetryableRequestConfig;
        const status = error.response?.status;

        if (status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // ✅ Set retry flag to avoid re-entrance
            return handleRefreshToken(originalRequest);
        }

        // Log common error status
        const messages: Record<number, string> = {
            403: '⛔ Unauthorized',
            404: '❓ Not Found..',
            422: '⚠️ Validation Failed',
            500: '💥 Server Error',
        };

        if (status && messages[status]) {
            console.warn(`[Error ${status}] ${messages[status]}`);
        }

        return Promise.reject(error);
    }
);

// --- ✅ Export axiosClient & Helper ---
export const request = <T>(config: AxiosRequestConfig): Promise<T> =>
    axiosClient(config).then((res) => res.data);

export default axiosClient;
