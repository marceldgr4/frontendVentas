import {selectRepository} from "@/lib/data-source";
import {mockDashboardRepository} from "@/mocks/dashboard.mock";
import {apiDashboardRepository} from "@/repositories/dashboard.api.repository";
import type {DashboardRepository} from "@/repositories/dashboard.repository";

export const dashboardService: DashboardRepository = selectRepository(
    mockDashboardRepository,
    apiDashboardRepository
);