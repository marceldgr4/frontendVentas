import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex min-h-screen max-w-4xl flex-col justify-center gap-6 px-6 py-12">
        <div className="space-y-2">
          <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            Fase 1
          </p>
          <h1 className="text-4xl font-semibold tracking-tight">
            CompraVenta System
          </h1>
          <p className="max-w-2xl text-muted-foreground">
            Fundación lista: Next.js App Router, Tailwind CSS, shadcn/ui, Axios con interceptores
            y TanStack Query configurados para comenzar la Fase 2 (Auth).
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button>Base UI lista</Button>
          <Button variant="outline">Auth pendiente</Button>
          <Button variant="secondary">API lista</Button>
        </div>
      </section>
    </main>
  );
}