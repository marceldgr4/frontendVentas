import type {KipMetricDto} from "@/types/modules/dashboard";
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

const currencyFormatter = new Intl.NumberFormat('en-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
});
const countFormatter = new Intl.NumberFormat("es-CO");

export function KpiCard({metric}:{metric: KipMetricDto}){
    const  formattedValue =
        metric.format === "CURRENCY"
    ? currencyFormatter.format(metric.value)
            :countFormatter.format(metric.value);
    return (
        <Card>
            <CardHeader>
                <CardDescription>{metric.label}</CardDescription>
                <CardTitle className="text-2xl">{formattedValue}</CardTitle>
            </CardHeader>
        </Card>
    );
}
