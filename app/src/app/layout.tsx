import type { Metadata } from "next";
import type {ReactNode} from "react";
import {Providers} from "@/components/shared/providers";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME ?? "CompraVenta System",
};

export default function RootLayout({ children }:{ children: ReactNode }) {
  return (
    <html lang="es" className={cn("font-sans", geist.variable)}>
    <body>
      <Providers>{children}</Providers>
      </body>
  </html>
  );
}
