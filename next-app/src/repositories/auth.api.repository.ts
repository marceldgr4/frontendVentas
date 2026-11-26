import { apiClient } from "@/lib/api-client";
import {unwrap} from "@/lib/api-error";
import type{ ApiResponse } from "@/types/api";
import type {AuthResponse, LoginRequest, RefreshRequest} from "@/types/modules/auth";
import type {AuthRepository} from "@/repositories/auth.repository";
import {useAuthStore} from "@/store/use-auth-store";

export const apiAuthRepository: AuthRepository = {
    async login(request: LoginRequest ) {
        const { data } = await apiClient.post<ApiResponse<AuthResponse>>("/auth/login", request);
        return unwrap(data);
    },
    async refresh() {
       const currentRefreshToken = useAuthStore.getState().refreshToken;
       if(!currentRefreshToken){
           throw new Error("sin sesion actuva ni refresh token");
       }
       const body: RefreshRequest ={ refreshToken: currentRefreshToken};
       const {data } = await apiClient.post<ApiResponse<AuthResponse>>(
           "/auth/refresh", body
       );
       return unwrap(data);

    },
    async logout(){
        try {
        await apiClient.post<ApiResponse<void>>("/auth/logout");
    }catch{        }
    },

};