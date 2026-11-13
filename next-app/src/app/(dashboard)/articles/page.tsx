"use client";

import {type ChangeEvent, useState} from "react";
import type {ArticleCategory, ListArticlesParams} from "@/types/modules/article";
import {useArticles} from "@/hooks/use-articles";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {categoryLabels} from "@/components/modules/articles/article-labels";
import {getErrorMessage} from "@/lib/api-error";
import {Button} from "@/components/ui/button";
import {ArticlesTable} from "@/components/modules/articles/article-table";



const PAGE_SIZE = 10;
export default function ArticlePage(){
    const [term, setTerm] = useState("");
    const [category, setCategory] = useState<ArticleCategory | "">("");
    const [lowStockOnly, setLowStockOnly] = useState(false);
    const [page, setPage] = useState(0);

    const params: ListArticlesParams ={
        page,
        size: PAGE_SIZE,
        term: term || undefined,
        category: category || undefined,
        lowStockOnly,
    };

    const query = useArticles(params);
    const {data, isError, error, refetch,isPlaceholderData } = query;

    const handleTermChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTerm(event.target.value);
        setPage(0);
    };
    const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setCategory(event.target.value as ArticleCategory |"");
        setPage(0);
    };

    const handleLowStockChange = (event: ChangeEvent<HTMLInputElement>) => {
        setLowStockOnly(event.target.checked);
        setPage(0);
    };

    return (
        <section className="space-y-6">
            <h1 className="text-2xl font-semibold tracking-tight">Artículos</h1>

            <Card>
                <CardHeader>
                    <CardTitle>Inventario</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-3 md:grid-cols-[1fr_200px_auto] md:items-end">
                        <div className="space-y-1.5">
                            <Label htmlFor="search">Buscar</Label>
                            <Input id="search" value={term} onChange={handleTermChange} placeholder="Nombre del artículo" />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="category">Categoría</Label>
                            <select
                                id="category"
                                value={category}
                                onChange={handleCategoryChange}
                                className="h-9 w-full rounded-lg border bg-transparent px-2.5 text-sm"
                            >
                                <option value="">Todas</option>
                                {(Object.keys(categoryLabels) as ArticleCategory[]).map((option) => (
                                    <option key={option} value={option}>
                                        {categoryLabels[option]}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <label className="flex items-center gap-2 text-sm">
                            <input type="checkbox" checked={lowStockOnly} onChange={handleLowStockChange} />
                            Solo stock bajo
                        </label>
                    </div>

                    {isError && (
                        <div className="space-y-3" role="alert">
                            <p className="text-destructive">{getErrorMessage(error)}</p>
                            <Button variant="outline" onClick={() => refetch()}>
                                Reintentar
                            </Button>
                        </div>
                    )}

                    {!isError && !data && <p className="text-muted-foreground">Cargando artículos...</p>}

                    {!isError && data && (
                        <>
                            <ArticlesTable articles={data.content} />
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">
                                    Página {data.number + 1} de {data.totalPages} · {data.totalElements} artículos
                                </span>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setPage((current) => current - 1)}
                                        disabled={data.number === 0 || isPlaceholderData}
                                    >
                                        Anterior
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setPage((current) => current + 1)}
                                        disabled={data.number + 1 >= data.totalPages || isPlaceholderData}
                                    >
                                        Siguiente
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>
        </section>
    );
}

