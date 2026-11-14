import type {ArticleCategory, ArticleItemStatus} from "@/types/modules/article";

export const categoryLabels: Record<ArticleCategory, string>={
    ELECTRODOMESTICOS: "Electrodomesticos",
    TECNOLOGIA: "Tecnologia",
    OTROS: "Otros",
};

export const itemStatusLabels: Record<ArticleItemStatus, string> = {
    EXCELENTE: "Excelente",
    BUENO:"Bueno",
    REGULAR: "Regular",
    MALO: "Malo",


};