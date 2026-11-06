import {authService} from "@/services/auth.service";
import {useAuthStore} from "@/store/use-auth-store";
import {useEffect} from "react";
import {useRouter} from "next/router";
import {useMutation, useQueryClient} from "@tanstack/react-query";

let bootstrapPromise: Promise<void> | null = null;

const bootstrapSession = (): Promise<void> => {
    bootstrapPromise ??= authService
        .refresh()
        .then((session) => useAuthStore.getState().setSession(session))
        .catch(() => useAuthStore.getState().clearSession())
        .finally(()=>{
            bootstrapPromise = null;
        });
    return bootstrapPromise;

};

export function useAuthBootstrap() {
    const status = useAuthStore((state) => state.status);

    useEffect(()=>{
        if(useAuthStore.getState().status ==="initializing") void bootstrapSession();

    },[]);
    return status;
}
export function useLogin(){
    const  router = useRouter();
    const  setSession = useAuthStore((state) => state.setSession);
    return useMutation({
        mutationFn: authService.login,
        onSuccess:( session ) => {
            setSession(session);
            router.replace("/");
        },
    });
}

export function useLogout(){
    const  router = useRouter();
    const queryClient = useQueryClient();
    const clearSession = useAuthStore((state) => state.clearSession);

    return useMutation({
        mutationFn: authService.logout,
        onSettled: () =>{
            clearSession();
            queryClient.clear();
            router.replace("/login");
        },
    });
}