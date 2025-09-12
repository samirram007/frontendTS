

import axios, {
    AxiosError,
    type AxiosInstance,
    type AxiosRequestConfig,
    type AxiosResponse,
    type InternalAxiosRequestConfig,
} from 'axios';

const axiosClient: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true, // Sends cookies automatically
    validateStatus: (status) => status < 500,
});

// --- 🔐 REQUEST INTERCEPTOR ---
axiosClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // Example: Custom headers or logging
        // config.headers['X-Requested-With'] = 'XMLHttpRequest';
        // console.info(`[Request] ${config.method?.toUpperCase()} ${config.url}`);
        // console.log(`[Request] ${config.method?.toUpperCase()} ${config.url}`, {
        //     headers: config.headers,
        //     request: config,
        //     params: config.params,
        //     data: config.data,
        // });

        return config;
    },
    (error: AxiosError) => {
        // console.log(`[Request Error] ${error.message}`, {
        //     url: error.config?.url,
        //     request: error.config,
        //     method: error.config?.method,
        //     headers: error.config?.headers,
        //     params: error.config?.params,
        //     data: error.config?.data,
        // });

        return Promise.reject(error);
    }
);

// --- 🔁 TOKEN REFRESH HANDLER ---
let isRefreshing = true;
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

const handleRefreshToken = async (
    originalRequest: InternalAxiosRequestConfig & { _retry?: boolean }
) => {

    if (isRefreshing) {
        return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
        }).then(() => axiosClient(originalRequest));
    }

    isRefreshing = true;
    originalRequest._retry = true;

    try {
        console.log('🔄 Attempting to refresh token...');

        await axiosClient.post('/auth/refresh'); // Refresh sets cookie again
        processQueue(null);
        return axiosClient(originalRequest); // Retry original request
    } catch (refreshError) {
        const err = refreshError as AxiosError;
        // console.error('🔄 Token refresh failed:', {
        //     message: err.message,
        //     status: err.response?.status,
        //     data: err.response?.data,
        //     url: err.config?.url,
        //     method: err.config?.method,
        // });
        // window.dispatchEvent(new CustomEvent('force-logout'));
        processQueue(err);
        return Promise.reject(err);
    } finally {
        // console.log('🔄 Token refresh completed');
        isRefreshing = false;
    }
};
export type RetryableRequestConfig = InternalAxiosRequestConfig & { _retry?: boolean };


let originalRequest: RetryableRequestConfig | undefined = undefined;
// --- ⚠️ RESPONSE INTERCEPTOR ---
axiosClient.interceptors.response.use(

    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
        if (!originalRequest) {
            originalRequest = error.config as RetryableRequestConfig;
        }
        // const originalRequest = error.config as RetryableRequestConfig;
        const status = error.response?.status;
        // console.log(status, originalRequest._retry);
        if (status === 401 && !originalRequest._retry) {
            // console.warn('🔒 Unauthorized - Attempting to refresh token');
            originalRequest._retry = true;
            return await handleRefreshToken(originalRequest);
        }
        // Optional logging (or use toast/snackbar here)
        const messages: Record<number, string> = {
            400: '❗ Bad Request',
            401: '🔒 Unauthorized',
            403: '⛔ Unauthorized',
            404: '❓ Not Found',
            422: '⚠️ Validation Failed',
            500: '💥 Server Error',
        };

        if (status && messages[status]) {
            // console.warn(`[Error ${status}] ${messages[status]}`);
        }

        return Promise.reject(error);
    }
);


// Optional: wrap for type-safe usage
export const request = <T>(config: AxiosRequestConfig): Promise<T> =>
    axiosClient(config).then((res) => res.data);

export default axiosClient;
