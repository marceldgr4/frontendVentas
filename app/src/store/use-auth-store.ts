import {create} from "zustand";
import type { AuthResponse, EmployeeProfile } from "@/types/modules/auth";

interface AuthState {
    accessToken: string |null;
    employee: EmployeeProfile | null;
    setSession: (session:AuthResponse ) => void;
    clearSession: () => void;
}
export const  useAuthStore = create<AuthState>((set)=>({
    accessToken:null,
    employee:null,
    setSession:({accessToken, employee}) => set({accessToken, employee}),
    clearSession:()=> set({accessToken:null, employee:null}),
}));