import {ArticleRepository} from "@/repositories/article.repository";
import {ArticleResponse, ListArticleParams} from "@/types/modules/article";
import {apiClient} from "@/lib/api-client";
import {ApiResponse, Page} from "@/types/api";
import {unwrap} from "@/lib/api-error";

export const apiArticleRepository: ArticleRepository = {
    async findAll(params:ListArticleParams){
        const {data} = await apiClient.get<ApiResponse<Page<ArticleResponse>>>("/article",{params});
        return unwrap(data);
    },
};