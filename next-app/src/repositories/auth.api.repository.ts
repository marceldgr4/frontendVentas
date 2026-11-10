import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/types/api";
import { AuthResponse, LoginRequest } from "@/types/modules/auth";
import {unwrap} from "@/lib/api-error";
import {request} from "node:http";
import {AuthRepository} from "@/repositories/auth.repository";

export const apiAuthRepository: AuthRepository = {
    async login(request: LoginRequest ) {
        const { data } = await apiClient.post<ApiResponse<AuthResponse>>("/auth/login", request);
        return unwrap(data);
    },
    async refresh() {
        const { data } = await apiClient.post<ApiResponse<AuthResponse>>("/auth/refresh", request);
        return unwrap(data);

    },
    async logout(){
        await apiClient.post<ApiResponse<void>>("/auth/logout");
    },

};