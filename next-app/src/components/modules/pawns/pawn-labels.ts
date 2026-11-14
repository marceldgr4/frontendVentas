import {PawnStatus} from "@/types/modules/pawn";

export const pawnStatusLabels: Record<PawnStatus, string> ={
    ACTIVO: "Activo",
    DESACTIVADO: "Desactivo",
    VENCIDO: "Vencido",
    FINALIZADO:"Finalizado",
    RETIRADO: "Retirado",
    PERDIDO: "Perdido",
    VENDIDO: "Vendido",
};
export const pawnStatusStyles: Record<PawnStatus, string> = {
    ACTIVO: "bg-emerald-100 text-emerald-800",
    DESACTIVADO: "bg-emerald-100 text-emerald-800",
    VENCIDO: "bg-rose-100 text-rose-800",
    FINALIZADO: "bg-slate-100 text-slate-700",
    RETIRADO: "bg-indigo-100 text-indigo-800",
    PERDIDO: "bg-amber-100 text-amber-800",
    VENDIDO: "bg-slate-200 text-slate-800",
};

