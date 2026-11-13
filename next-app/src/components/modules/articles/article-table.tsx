import {ArticleResponse} from "@/types/modules/article";
import {categoryLabels, itemStatusLabels} from "@/components/modules/articles/article-labels";
import {currencyFormatter} from "@/lib/format";

export function ArticlesTable({articles}:{ articles: ArticleResponse[] }){
    if(articles.length === 0){
        return <p className="text-sm text-muted-foreground">No hay articulos con ese filtros</p>;
        }
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead className="border-b text-left text-muted-foreground">
                <tr>
                    <th className="py-2 pr-4 font-medium">Nombre</th>
                    <th className="py-2 pr-4 font-medium">Categoría</th>
                    <th className="py-2 pr-4 font-medium">Estado</th>
                    <th className="py-2 pr-4 text-right font-medium">Stock</th>
                    <th className="py-2 text-right font-medium">Precio de venta</th>
                </tr>
                </thead>
                <tbody className="divide-y">
                {articles.map((article) => (
                    <tr key={article.globalId}>
                        <td className="py-2 pr-4 font-medium">{article.nameArticle}</td>
                        <td className="py-2 pr-4">{categoryLabels[article.category]}</td>
                        <td className="py-2 pr-4">{itemStatusLabels[article.itemStatus]}</td>
                        <td className="py-2 pr-4 text-right">{article.amount}</td>
                        <td className="py-2 text-right">{currencyFormatter.format(article.price)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}