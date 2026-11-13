import {ListArticlesParams} from "@/types/modules/article";
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {articleService} from "@/services/article.service";

export function useArticles(params:ListArticlesParams){
    return useQuery({
        queryKey:["articles",params],
        queryFn:()=> articleService.findAll(params),
        placeholderData:keepPreviousData,
    });
}