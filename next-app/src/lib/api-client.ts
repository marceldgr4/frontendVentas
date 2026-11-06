import { useAuthStore } from "@/store/use-auth-store";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import type { ApiResponse } from "@/types/api";
import type { AuthResponse } from "@/types/modules/auth";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const apiClient = axios.create({
    baseURL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});

type RetriableRequest = InternalAxiosRequestConfig & { _retry?: boolean };
let refreshPromise: Promise<string> | null = null;

const refreshAccessToken = (): Promise<string> => {
    if (refreshPromise) return refreshPromise;

    const request = axios
        .post<ApiResponse<AuthResponse>>(`${baseURL}/auth/refresh`, null, {
            withCredentials: true,
        })
        .then((res) => {
            const session = res.data.data;
            if (!session) throw new Error("Empty refresh response");
            useAuthStore.getState().setSession(session);
            return session.accessToken;
        })
        .finally(() => {
            refreshPromise = null;
        });

    refreshPromise = request;
    return request;
};

apiClient.interceptors.request.use((config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

apiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const original = error.config as RetriableRequest | undefined;
        const isAuthEndpoint = original?.url?.includes("/auth/");
        if (!original || error.response?.status !== 401 || original._retry || isAuthEndpoint) {
            return Promise.reject(error);
        }
        original._retry = true;

        try {
            const newToken = await refreshAccessToken();
            original.headers.Authorization = `Bearer ${newToken}`;
            return apiClient(original);
        } catch (refreshError) {
            useAuthStore.getState().clearSession();
            return Promise.reject(refreshError);
        }
    }
);