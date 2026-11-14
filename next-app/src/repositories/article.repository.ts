import {ArticleResponse, ListArticlesParams} from "@/types/modules/article";
import {Page} from "@/types/api";

export interface ArticleRepository {
    findAll(params: ListArticlesParams): Promise<Page<ArticleResponse>>;
}