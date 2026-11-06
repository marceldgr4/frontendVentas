import { z } from "zod";
export const loginSchema = z.object({
    email: z.email("correo incorrecto"),
    password: z.string().min(1,"la contraseña es obligatorio"),
});

export type LoginFormValues =z.infer<typeof loginSchema>;