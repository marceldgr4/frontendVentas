import {ArticleResponse, ListArticleParams} from "@/types/modules/article";
import {Page} from "@/types/api";

export interface ArticleRepository {
    findAll(params: ListArticleParams): Promise<Page<ArticleResponse>>;
}