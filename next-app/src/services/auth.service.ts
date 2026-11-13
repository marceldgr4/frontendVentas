
import type {AuthRepository} from "@/repositories/auth.repository";
import {selectRepository} from "@/lib/data-source";
import {apiAuthRepository} from "@/repositories/auth.api.repository";
import {mockAuthRepository} from "@/mocks/auth.mock"


export const authService: AuthRepository = selectRepository(mockAuthRepository, apiAuthRepository);
  /*  async login(payload:LoginRequest): Promise<AuthResponse>{
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
};*/