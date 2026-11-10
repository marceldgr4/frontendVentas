"use client";

import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {useAuthBootstrap, useLogin} from "@/hooks/use-auth";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {loginSchema, type LoginFormValues} from "@/lib/validators";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {getErrorMessage} from "@/lib/api-error";



export default function LoginPage() {
    const router = useRouter();
    const status = useAuthBootstrap();
    const  { mutate,isPending, error }= useLogin();

    useEffect(() => {
        if (status === "authenticated") router.replace("/");
    }, [status, router]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });

    return(
        <main className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>{process.env.NEXT_PUBLIC_APP_NAME}</CardTitle>
                    <CardDescription>Ingresa con tu cuenta de empleado</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit((values) => mutate(values))} className="space-y-4" noValidate>
                        <div className="space-y-1.5">
                            <Label htmlFor="email">Correo</Label>
                            <Input id="email" type="email" autoComplete="email" aria-invalid={!!errors.email} {...register("email")} />
                            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="password">Contraseña</Label>
                            <Input id="password" type="password" autoComplete="current-password" aria-invalid={!!errors.password} {...register("password")} />
                            {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
                        </div>
                        {error && <p role="alert" className="text-sm text-destructive">{getErrorMessage(error)}</p>}
                        <Button type="submit" className="w-full" disabled={isPending}>
                            {isPending ? "Ingresando..." : "Ingresar"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </main>
    );
}