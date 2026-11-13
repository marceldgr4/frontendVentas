"use client";

import {type ChangeEvent, useState} from "react";
import type {ListPawnParams, PawnStatus} from "@/types/modules/pawn";
import {usePawns} from "@/hooks/use-pawns";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label"
import {pawnStatusLabels} from "@/components/modules/pawns/pawn-labels";
import {getErrorMessage} from "@/lib/api-error";
import {PawnTable} from "@/components/modules/pawns/pawn-table";
import {Button} from "@/components/ui/button";

const PAGE_SIZE = 10;
export default function pawnsPage(){
    const [status, setStatus]= useState<PawnStatus | "">("");
    const [page,setPage]= useState(0);

    const params:ListPawnParams ={page, size: PAGE_SIZE, status:status || undefined};
    const {data,isError,error,refetch, isPlaceholderData} = usePawns(params);
    const handleStatusChange =(event:ChangeEvent<HTMLSelectElement>)  => {
        setStatus(event.target.value as PawnStatus| "");
        setPage(0);
    };

    return (
        <section className="space-y-6">
            <h1 className="text-2xl font-semibold tracking-tight">Empeños</h1>

            <Card>
                <CardHeader>
                    <CardTitle>Contratos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-3 md:grid-cols-[200px] md:items-end">
                        <div className="space-y-1.5">
                            <Label htmlFor="status">Estado</Label>
                            <select
                                id="status"
                                value={status}
                                onChange={handleStatusChange}
                                className="h-9 w-full rounded-lg border bg-transparent px-2.5 text-sm"
                            >
                                <option value="">Todos</option>
                                {(Object.keys(pawnStatusLabels) as PawnStatus[]).map((option) => (
                                    <option key={option} value={option}>
                                        {pawnStatusLabels[option]}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {isError && (
                        <div className="space-y-3" role="alert">
                            <p className="text-destructive">{getErrorMessage(error)}</p>
                            <Button variant="outline" onClick={() => refetch()}>
                                Reintentar
                            </Button>
                        </div>
                    )}

                    {!isError && !data && <p className="text-muted-foreground">Cargando empeños...</p>}

                    {!isError && data && (
                        <>
                            <PawnTable pawns={data.content}/>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">
                                    Página {data.number + 1} de {data.totalPages} · {data.totalElements} empeños
                                </span>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setPage((current) => current - 1)}
                                        disabled={data.number === 0 || isPlaceholderData}
                                    >
                                        Anterior
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setPage((current) => current + 1)}
                                        disabled={data.number + 1 >= data.totalPages || isPlaceholderData}
                                    >
                                        Siguiente
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>
        </section>
    );
}
