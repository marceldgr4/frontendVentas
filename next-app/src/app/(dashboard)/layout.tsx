"use client";
import {useEffect, type ReactNode } from "react";
import {useRouter} from "next/navigation";
import {useAuthBootstrap, useLogout} from "@/hooks/use-auth";
import {useAuthStore} from "@/store/use-auth-store";
import {Button} from "@/components/ui/button";


export default function  DashboardLayout({ children }: {children: ReactNode}){
    const router = useRouter();
    const status = useAuthBootstrap();
    const employee = useAuthStore((state) => state.employee);
    const { mutate: logout, isPending } = useLogout();

    useEffect(()=>{
        if(status === "unauthenticated") router.replace("/login");
    },[status, router]);

    if(status !=="authenticated"){
        return <div className="flex min-h-screen items-center justify-center text-muted-foreground">Cargando...</div>;

    }
    return (
        <div className="min-h-screen">
            <header className="flex items-center justify-between border-b px-6 py-3">
                <span className="font-semibold">{process.env.NEXT_PUBLIC_APP_NAME}</span>
                <div className="flex items-center gap-3 text-sm">
                    <span>{employee?.fullName}</span>
                    <Button variant="outline" size="sm" onClick={() => logout()} disabled={isPending}>
                        Salir
                    </Button>
                </div>
            </header>
            <main className="p-6">{children}</main>
        </div>
    );
}

