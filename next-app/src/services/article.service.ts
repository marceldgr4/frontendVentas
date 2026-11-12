import type {ArticleRepository} from "@/repositories/article.repository";
import {apiArticleRepository} from "@/repositories/article.api.repository";

export const articleService: ArticleRepository = apiArticleRepository;