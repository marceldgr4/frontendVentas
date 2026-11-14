import Link from "next/link";
import type {PawnResponse} from "@/types/modules/pawn";
import {currencyFormatter, formatDate, shortId} from "@/lib/format";
import {PawnStatusBadge} from "@/components/modules/pawns/pawn-status-badhe";

export function PawnTable({pawns}: { pawns: PawnResponse[]}){
    if(pawns.length === 0 ){
        return <p className= "text-sm text-muted-foreground">No hay empeño con ese filtro</p>
    }
    return (
        <div className='overflow-x-auto'>
            <table className="w-full text-sm">
                <thead className="border-b text-left text-muted-foreground">
                <tr>
                    <th className="py-2 pr-4 font-medium">Contrato</th>
                    <th className="py-2 pr-4 text-right font-medium">Préstamo</th>
                    <th className="py-2 pr-4 text-right font-medium">Cuotas</th>
                    <th className="py-2 pr-4 font-medium">Fecha de empeño</th>
                    <th className="py-2 pr-4 font-medium">Vence</th>
                    <th className="py-2 font-medium">Estado</th>
                </tr>
                </thead>
                <tbody className="divide-y">
                {pawns.map((pawn) => (
                    <tr key={pawn.globalId}>
                        <td className="py-2 pr-4 font-medium">
                            <Link href={`/pawns/${pawn.globalId}`} className="text-primary hover:underline">
                                #{shortId(pawn.globalId)}
                                </Link>
                        </td>
                        <td className="py-2 pr-4 text-right">{currencyFormatter.format(pawn.price)}</td>
                        <td className="py-2 pr-4 text-right">{pawn.installmentCount}</td>
                        <td className="py-2 pr-4">{formatDate(pawn.pawnDate)}</td>
                        <td className="py-2 pr-4">{formatDate(pawn.returnDate)}</td>
                        <td className="py-2"><PawnStatusBadge status={pawn.status}/></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}