"use client"

import { cn } from "@/lib/utils"
import { brandConfig } from "@/lib/brand-config"
import { Croissant, ScrollText, ShoppingCart, Warehouse } from "lucide-react"

export type Tela = "pdv" | "estoque" | "receitas"

const itens: { id: Tela; label: string; descricao: string; icon: typeof ShoppingCart }[] = [
  { id: "pdv", label: "Frente de Caixa", descricao: "PDV & NFC-e", icon: ShoppingCart },
  { id: "estoque", label: "Estoque", descricao: "Ingredientes", icon: Warehouse },
  { id: "receitas", label: "Receitas", descricao: "Ficha Técnica", icon: ScrollText },
]

export function AppSidebar({
  telaAtiva,
  onSelecionar,
}: {
  telaAtiva: Tela
  onSelecionar: (tela: Tela) => void
}) {
  return (
    <aside className="flex w-20 shrink-0 flex-col border-r border-zinc-200 bg-white md:w-64">
      <div className="flex h-16 items-center gap-3 border-b border-zinc-200 px-4 md:px-6">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber-600 text-white">
          <Croissant className="size-5" />
        </div>
        <div className="hidden md:block">
          <p className="text-sm font-bold leading-tight text-zinc-900">{brandConfig.nomeFantasia}</p>
          <p className="text-xs font-medium text-amber-600">OS · {brandConfig.slogan}</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-3">
        <p className="hidden px-3 pb-2 pt-3 text-xs font-semibold uppercase tracking-wider text-zinc-400 md:block">
          Operação
        </p>
        {itens.map((item) => {
          const ativo = telaAtiva === item.id
          const Icon = item.icon
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelecionar(item.id)}
              aria-current={ativo ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors",
                "justify-center md:justify-start",
                ativo
                  ? "bg-amber-600 text-white shadow-sm shadow-amber-600/20"
                  : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900",
              )}
            >
              <Icon className="size-5 shrink-0" />
              <span className="hidden flex-col md:flex">
                <span className="text-sm font-semibold leading-tight">{item.label}</span>
                <span
                  className={cn(
                    "text-xs leading-tight",
                    ativo ? "text-amber-100" : "text-zinc-400",
                  )}
                >
                  {item.descricao}
                </span>
              </span>
            </button>
          )
        })}
      </nav>

      <div className="border-t border-zinc-200 p-3">
        <div className="flex items-center gap-3 rounded-xl px-3 py-2">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-xs font-bold text-white">
            MB
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-semibold leading-tight text-zinc-900">Maria Batista</p>
            <p className="text-xs text-zinc-400">Gerente · Turno Manhã</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
