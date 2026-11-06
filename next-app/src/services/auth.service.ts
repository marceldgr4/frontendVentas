import {AuthResponse, LoginRequest} from "@/types/modules/auth";
import {apiClient} from "@/lib/api-client";
import {ApiResponse} from "@/types/api";
import {unwrap} from "@/lib/api-error";


export const authService = {
    async login(payload:LoginRequest): Promise<AuthResponse>{
        const { data } = await apiClient.post<ApiResponse<AuthResponse>>("/auth/login", payload);
        return unwrap(data);
    },
    async refresh(): Promise<AuthResponse> {
        const { data } = await apiClient.post<ApiResponse<AuthResponse>>("/auth/refresh");
        return unwrap(data);
    },
    async logout(): Promise<void> {
        await apiClient.post<ApiResponse<void>>("/auth/logout");
    },
};