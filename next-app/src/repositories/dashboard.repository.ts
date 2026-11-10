import type{ DashboardSummaryDto} from "@/types/modules/dashboard";
export interface DashboardRepository {
    getSummary(): Promise<DashboardSummaryDto>;
}