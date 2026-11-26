export type EmployeeRole = "ADMIN" | "EMPLEADO";

export interface EmployeeProfile  {
    id:string;
    email:string;
    fullName:string;
    role:EmployeeRole;
    active:boolean;
}
export interface LoginRequest{
    email:string;
    password:string;
}
export interface RefreshRequest{
    refreshToken:string;
}

export interface AuthResponse{
    accessToken: string;
    refreshToken: string;
    employee: EmployeeProfile;
    mode?: string;
}