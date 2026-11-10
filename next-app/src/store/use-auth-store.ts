import {create} from "zustand";
import type { AuthResponse, EmployeeProfile } from "@/types/modules/auth";

export type AuthStatus = "initializing" | "authenticated" | "unauthenticated";

interface AuthState {
    accessToken: string |null;
    employee: EmployeeProfile | null;
    status: AuthStatus;
    setSession: (session:AuthResponse ) => void;
    clearSession: () => void;
}
export const  useAuthStore = create<AuthState>((set)=>({
    accessToken:null,
    employee:null,
    status:"initializing",
    setSession:({accessToken, employee}) => set({accessToken, employee, status:"authenticated"}),
    clearSession:()=> set({accessToken:null, employee:null, status:"unauthenticated"}),
}));