import {PawnRepository} from "@/repositories/pawn.repository";
import {apiClient} from "@/lib/api-client";
import {ApiResponse, Page} from "@/types/api";
import {PawnResponse} from "@/types/modules/pawn";
import {unwrap} from "@/lib/api-error";

export const apiPawnRepository: PawnRepository = {
    async findAll(params){
        const {data} =await apiClient.get<ApiResponse<Page<PawnResponse>>>("/pawns",{params});
        return unwrap(data);
    },
    async findByGlobalId(globalId){
        const {data} =await  apiClient.get<ApiResponse<PawnResponse>>(`/pawns/${encodeURIComponent(globalId)}`);
        return unwrap(data);
    }
}