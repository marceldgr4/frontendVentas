import type {DashboardSummaryDto} from "@/types/modules/dashboard";
import type {DashboardRepository} from "@/repositories/dashboard.repository";
import {simulateLatency} from "@/mocks/latency";

const dashboardSummaryFixture: DashboardSummaryDto ={
    Kpis: [
        { key: "DAILY_REVENUE", label: "Ingresos del día", value: 1850000, format: "CURRENCY" },
        { key: "ACTIVE_PAWNS", label: "Empeños activos", value: 42, format: "COUNT" },
        { key: "OVERDUE_PAWNS", label: "Empeños vencidos", value: 5, format: "COUNT" },
        { key: "LOW_STOCK_ITEMS", label: "Artículos con stock bajo", value: 3, format: "COUNT" },
    ],
    alerts: [
        {
            type: "PAWN_OVERDUE",
            articleGlobalId: "a1000000-0000-0000-0000-000000000001",
            title: "Portátil Lenovo",
            details: "Vencido hace 3 días",
        },
        {
            type: "LOW_STOCK",
            articleGlobalId: "a1000000-0000-0000-0000-000000000002",
            title: "Licuadora Oster",
            details: "Quedan 1 unidades",
        },
    ],
};

export const mockDashboardRepository: DashboardRepository = {
    async getSummary(){
        await simulateLatency(400);
        return dashboardSummaryFixture;
    },
};
