import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
    return (
        <section className="space-y-4">
            <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Sesión activa</CardTitle>
                    <CardDescription>
                        Los KPIs y alertas de inventario se construyen en la Fase 3.
                    </CardDescription>
                </CardHeader>
                <CardContent />
            </Card>
        </section>
    );
}
