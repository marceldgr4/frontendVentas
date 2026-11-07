import axios from "axios";
import type { ApiResponse} from "@/types/api";


export function getErrorMessage(error: unknown): string {
    if(axios.isAxiosError<ApiResponse<unknown>>(error)) {
        return error.response?.data?.error?.message ?? error.response?.data?.message ?? "No se pudo conectar con el servidor";
    }
    return  error instanceof Error ? error.message : "Ocurrió un error inesperado";
}

export function unwrap<T>(response:ApiResponse<T> ): T {
    if (!response.success || response.data === null) {
        throw new Error(response.error?.message ?? response.message);
    }
    return response.data;
}