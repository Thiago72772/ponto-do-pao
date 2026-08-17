"use client"

import { useState } from "react"
import { AppSidebar, type Tela } from "@/components/app-sidebar"
import { PdvScreen } from "@/components/pdv-screen"
import { EstoqueScreen } from "@/components/estoque-screen"
import { ReceitasScreen } from "@/components/receitas-screen"
import { CalendarDays } from "lucide-react"

const titulos: Record<Tela, { titulo: string; sub: string }> = {
  pdv: { titulo: "Frente de Caixa", sub: "Registre vendas e emita notas fiscais" },
  estoque: { titulo: "Estoque", sub: "Controle de matérias-primas" },
  receitas: { titulo: "Receitas", sub: "Fichas técnicas e custos de produção" },
}

export default function Home() {
  const [tela, setTela] = useState<Tela>("pdv")
  const info = titulos[tela]

  return (
    <div className="flex h-svh overflow-hidden bg-zinc-50 text-zinc-900">
      <AppSidebar telaAtiva={tela} onSelecionar={setTela} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-zinc-200 bg-white px-5 md:px-8">
          <div>
            <h1 className="text-base font-bold leading-tight text-zinc-900">{info.titulo}</h1>
            <p className="text-xs text-zinc-400">{info.sub}</p>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-zinc-200 px-3 py-2 text-sm text-zinc-500">
            <CalendarDays className="size-4 text-amber-600" />
            <span className="hidden font-medium sm:inline">Terça, 13 Ago 2026</span>
            <span className="sm:hidden font-medium">13/08</span>
          </div>
        </header>

        <main className="flex flex-1 flex-col overflow-hidden p-5 md:p-8">
          {tela === "pdv" && <PdvScreen />}
          {tela === "estoque" && <EstoqueScreen />}
          {tela === "receitas" && <ReceitasScreen />}
        </main>
      </div>
    </div>
  )
}
