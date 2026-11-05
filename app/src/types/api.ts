export interface ApiErrorDetails {
    message: string;
    code: string;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T | null;
    message: string;
    error: ApiErrorDetails| null;
    timestamp: string;
}
export interface Page<T>{
    content:T[];
    totalElements: number;
    totalPages: number;
    number: number;
    size: number;
}