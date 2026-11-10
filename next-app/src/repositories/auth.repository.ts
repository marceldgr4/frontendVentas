import type { AuthResponse, LoginRequest } from "@/types/modules/auth";

export interface AuthRepository {
  login(request: LoginRequest): Promise<AuthResponse>;
  refresh(): Promise<AuthResponse>;
  logout(): Promise<void>;
}
