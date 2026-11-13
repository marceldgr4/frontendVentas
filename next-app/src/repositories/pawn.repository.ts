import {ListPawnParams, PawnResponse} from "@/types/modules/pawn";
import {Page} from "@/types/api";

export interface PawnRepository{
    findAll(params: ListPawnParams):Promise<Page<PawnResponse>>;
    findByGlobalId(globalId: string): Promise<PawnResponse>;
}