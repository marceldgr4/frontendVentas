import {AuthResponse, EmployeeProfile} from "@/types/modules/auth";
import {AuthRepository} from "@/repositories/auth.repository";
import {simulateLatency} from "@/mocks/latency";

interface TestAccount{
    password: string;
    profile: EmployeeProfile;
}

const testAccount: TestAccount []= [
    {
        password:"admin123",
        profile:{
            id:"1",
            email: "admin@test.com",
            fullName: "admin prueba",
            role: "ADMIN",
            active: true,
        },
    },
    {
        password:"empelado123",
        profile: {
            id :"2",
            email:"empleado@test.com",
            fullName:"empleado prueba",
            role:"EMPLEADO",
            active: true,
        },
    },
];
let activeSession :AuthResponse | null = null;

export const mockAuthRepository: AuthRepository ={
    async login({email,password }){
        await simulateLatency(400);
        const account = testAccount.find(
            (candidate) => candidate.profile.email === email && candidate.password === password
        );
        if(!account) throw new Error("Correo o contraseña incorrectos");

        activeSession ={
            accessToken: `mock-token-${account.profile.id}`,
            employee: account.profile,
        };
        return activeSession;
    },
    async refresh(){
        await simulateLatency(400);
        if(!activeSession) throw  new Error("sin ssesion active");
        return activeSession;
    },
    async logout(){
        await simulateLatency(400);
        activeSession = null;
    },

};