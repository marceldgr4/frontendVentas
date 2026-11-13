import {ListArticleParams} from "@/types/modules/article";
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {articleService} from "@/services/article.service";

export function useArticles(params:ListArticleParams){
    return useQuery({
        queryKey:["articles",params],
        queryFn:()=> articleService.findAll(params),
        placeholderData:keepPreviousData,
    });
}