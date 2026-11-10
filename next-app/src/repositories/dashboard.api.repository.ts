import type {DashboardRepository} from "@/repositories/dashboard.repository";
import {apiClient} from "@/lib/api-client";
import type {ApiResponse} from "@/types/api";
import {unwrap} from "@/lib/api-error";
import type {DashboardSummaryDto} from "@/types/modules/dashboard";


export const apiDashboardRepository: DashboardRepository ={
    async getSummary(){
        const { data } =await apiClient.get<ApiResponse<DashboardSummaryDto>>("/dashboard/summary");
        return unwrap(data);
    },
};