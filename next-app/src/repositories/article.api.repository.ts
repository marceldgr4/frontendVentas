import {ArticleRepository} from "@/repositories/article.repository";
import {ArticleResponse, ListArticlesParams} from "@/types/modules/article";
import {apiClient} from "@/lib/api-client";
import {ApiResponse, Page} from "@/types/api";
import {unwrap} from "@/lib/api-error";

export const apiArticleRepository: ArticleRepository = {
    async findAll(params:ListArticlesParams){
        const queryParams ={
            search: params.term || undefined,
            category: params.category||undefined,
            onlyAvailable:params.lowStockOnly ? true : false,
            page: params.page,
            size: params.size,
        };
        const {data} = await apiClient.get<ApiResponse<Page<ArticleResponse>>>("/article",{params: queryParams,},);
        return unwrap(data);
    },
};