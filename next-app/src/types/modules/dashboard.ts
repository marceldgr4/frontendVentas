export interface KipMetricDto{
    key:string;
    label:string;
    value:number;
    format: "CURRENCY" | "COUNT";
}
export type InventoryAlertType ="LOW_STOCK" | "PAWN_OVERDUE";

export interface InventoryAlertDto{
    type: InventoryAlertType;
    articleGlobalId:string;
    title:string;
    details:string;
}
export interface DashboardSummaryDto{
    Kpis: KipMetricDto[];
    alerts:InventoryAlertDto[];
}