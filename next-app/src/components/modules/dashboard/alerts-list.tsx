import type { InventoryAlertDto, InventoryAlertType } from "@/types/modules/dashboard";

const badgeStyles: Record<InventoryAlertType, string> = {
    LOW_STOCK: "bg-amber-100 text-amber-800",
    PAWN_OVERDUE: "bg-rose-100 text-rose-800",
};

const badgeLabels: Record<InventoryAlertType, string> = {
    LOW_STOCK: "Stock bajo",
    PAWN_OVERDUE: "Empeño vencido",
};

export function AlertsList({ alerts }: { alerts: InventoryAlertDto[] }) {
    if (alerts.length === 0) {
        return <p className="text-sm text-muted-foreground">Sin alertas pendientes.</p>;
    }

    return (
        <ul className="divide-y">
            {alerts.map((alert) => (
                    <li
                        key={`${alert.type}-${alert.articleGlobalId}`}
    className="flex items-center justify-between gap-4 py-3"
    >
    <div>
        <p className="font-medium">{alert.title}</p>
        <p className="text-sm text-muted-foreground">{alert.details}</p>
        </div>
        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${badgeStyles[alert.type]}`}>
    {badgeLabels[alert.type]}
    </span>
    </li>
))}
    </ul>
);
}