import {ListPawnParams} from "@/types/modules/pawn";
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {pawnService} from "@/services/pawn.service";

export function usePawns(params: ListPawnParams) {
    return useQuery({
        queryKey:["pawns",params],
        queryFn:()=> pawnService.findAll(params),
        placeholderData: keepPreviousData,
    });
}
export function usePawn(globalId:string){
    return useQuery({
        queryKey:["pawns",globalId],
        queryFn:() => pawnService.findByGlobalId(
            globalId
        ),
        enabled:globalId.length>0,
    });
}