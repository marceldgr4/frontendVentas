import {create} from "zustand";
import type { AuthResponse, EmployeeProfile } from "@/types/modules/auth";
import {createJSONStorage, persist} from "zustand/middleware/persist";

export type AuthStatus = "initializing" | "authenticated" | "unauthenticated";

interface AuthState {
    accessToken: string |null;
    refreshToken: string |null;
    employee: EmployeeProfile | null;
    status: AuthStatus;
    setSession: (session:AuthResponse ) => void;
    clearSession: () => void;
}
export const  useAuthStore = create<AuthState>()(
    persist(
        (set) =>({
            accessToken: null,
            refreshToken: null,
            employee: null,
            status:"initializing",
            setSession:(session:AuthResponse ) =>
                set({
                    accessToken: session.accessToken,
                    refreshToken: session.refreshToken ?? null,
                    employee: session.employee,
                    status:"unauthenticated",
                }),
            clearSession: () => set({
                accessToken: null,
                refreshToken: null,
                employee: null,
                status: "unauthenticated",
            })
        }),
        {
            name: "compraventa_auth_session",
            storage: createJSONStorage(()=>localStorage),
            partialize: (state) =>({
                accessToken: state.accessToken,
                refreshToken: state.refreshToken,
                employee: state.employee,
                status: state.accessToken
                ?("authenticated" as AuthStatus)
                    :("unauthenticated" as AuthStatus),

            }),
        },
    ),
);
