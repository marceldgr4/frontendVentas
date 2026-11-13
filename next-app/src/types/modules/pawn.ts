

export type PawnStatus = "ACTIVO" | "VENCIDO" | "RETIRADO"|"PERDIDO"|"VENDIDO"|"FINALIZADO"| "DESACTIVADO";

export interface PawnResponse {
    globalId: string;
    articleGlobalId: string;
    clientesGlobalId: string;
    employeeGlobalId: string;
    price:number;
    installmentCount:number;
    pawnDate:string;
    returnDate:string;
    status: PawnStatus;

}
export interface ListPawnParams {
    page: number;
    size: number;
    status?: PawnStatus;
}