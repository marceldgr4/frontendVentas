import {date} from "zod/v3";

export const currencyFormatter = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency:"COP",
    maximumFractionDigits: 0,
});

export const dateFormatter = new Intl.DateTimeFormat("es-CO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
});
export const formatDate =(isoDate: string) => dateFormatter.format(new Date(`${isoDate}T00:00:00.000`));
export const shortId = (globalId: string) => globalId.slice(-8).toUpperCase();