import {PawnStatus} from "@/types/modules/pawn";
import {pawnStatusLabels, pawnStatusStyles} from "@/components/modules/pawns/pawn-labels";

export function PawnStatusBadge({status}: {status: PawnStatus}) {
    return(
        <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${pawnStatusStyles[status]}`}>
            {pawnStatusLabels[status]}
        </span>
    );
}