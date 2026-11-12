export type ArticleCategory = "ELECTRODOMESTICOS" | "TECNOLOGIA" | "OTROS";
export type ArticleItemStatus = "EXCELENTE" | "BUENO" | "REGULAR" | "MALO";

export interface ArticleResponse {

    globalId: string;
    nameArticle: string;
    category: ArticleCategory;
    itemStatus: ArticleItemStatus;
    amount: number;
    price: number;
    purchasePrice: number;
}
export interface ListArticleParams {
    page: number;
    Size: number;
    term?: string;
    category?: ArticleCategory;
    lowStockOnly?: boolean;

}