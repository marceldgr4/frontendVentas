"use client";

import { AlertsList } from "@/components/modules/dashboard/alerts-list";
import { KpiCard } from "@/components/modules/dashboard/kpi-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getErrorMessage } from "@/lib/api-error";
import { useDashboardSummary } from "@/hooks/use-dashboard";
import { useAuthStore } from "@/store/use-auth-store";

export default function DashboardPage() {
    const isAdmin = useAuthStore((state) => state.employee?.role === "ADMIN");
    const { data, isPending, isError, error, refetch } = useDashboardSummary();

    if (isPending) {
        return <p className="text-muted-foreground">Cargando indicadores...</p>;
    }

    if (isError) {
        return (
            <div className="space-y-3" role="alert">
                <p className="text-destructive">{getErrorMessage(error)}</p>
                <Button variant="outline" onClick={() => refetch()}>
                    Reintentar
                </Button>
            </div>
        );
    }

    return (
        <section className="space-y-6">
            <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>

            {isAdmin && (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {data.Kpis.map((metric) => (
                        <KpiCard key={metric.key} metric={metric} />
                    ))}
                </div>
            )}

            <Card>
                <CardHeader>
                    <CardTitle>Alertas de inventario</CardTitle>
                </CardHeader>
                <CardContent>
                    <AlertsList alerts={data.alerts} />
                </CardContent>
            </Card>
        </section>
    );
}