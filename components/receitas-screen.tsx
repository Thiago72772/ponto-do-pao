"use client"

import { useMemo, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import {
  formatBRL,
  ingredientes,
  receitasIniciais,
  type ItemReceita,
} from "@/lib/bakery-data"
import { Calculator, ChefHat, Package, Plus, Trash2 } from "lucide-react"

export function ReceitasScreen() {
  const [nome, setNome] = useState(receitasIniciais[0].nome)
  const [rendimento, setRendimento] = useState(receitasIniciais[0].rendimento)
  const [itens, setItens] = useState<ItemReceita[]>(receitasIniciais[0].itens)
  const [novoId, setNovoId] = useState(ingredientes[0].id)
  const [novaQtd, setNovaQtd] = useState("")

  function getIngrediente(id: string) {
    return ingredientes.find((i) => i.id === id)!
  }

  function adicionarItem() {
    const qtd = Number.parseFloat(novaQtd.replace(",", "."))
    if (Number.isNaN(qtd) || qtd <= 0) return
    setItens((atual) => {
      const existente = atual.find((i) => i.ingredienteId === novoId)
      if (existente) {
        return atual.map((i) =>
          i.ingredienteId === novoId ? { ...i, quantidade: qtd } : i,
        )
      }
      return [...atual, { ingredienteId: novoId, quantidade: qtd }]
    })
    setNovaQtd("")
  }

  function remover(id: string) {
    setItens((atual) => atual.filter((i) => i.ingredienteId !== id))
  }

  const custoTotal = useMemo(
    () =>
      itens.reduce((acc, item) => {
        const ing = getIngrediente(item.ingredienteId)
        return acc + ing.custoPorUnidade * item.quantidade
      }, 0),
    [itens],
  )

  const custoPorUnidade = rendimento > 0 ? custoTotal / rendimento : 0
  const precoSugerido = custoPorUnidade * 3 // markup 200%

  return (
    <div className="flex flex-1 flex-col gap-6 overflow-y-auto lg:flex-row">
      {/* Configuração da receita */}
      <div className="flex flex-1 flex-col gap-4">
        <div>
          <h2 className="text-xl font-bold text-zinc-900">Ficha Técnica</h2>
          <p className="text-sm text-zinc-500">Cadastro de receitas e custo de produção</p>
        </div>

        {/* Cabeçalho da receita */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="sm:col-span-2">
              <label htmlFor="nome" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-zinc-400">
                Receita
              </label>
              <input
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="h-11 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 text-sm font-semibold text-zinc-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
              />
            </div>
            <div>
              <label htmlFor="rendimento" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-zinc-400">
                Rendimento (un)
              </label>
              <input
                id="rendimento"
                type="number"
                min={1}
                value={rendimento}
                onChange={(e) => setRendimento(Number.parseInt(e.target.value) || 0)}
                className="h-11 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 text-sm font-semibold tabular-nums text-zinc-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
              />
            </div>
          </div>
        </div>

        {/* Adicionar ingrediente */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-5">
          <p className="mb-3 text-sm font-semibold text-zinc-900">Adicionar ingrediente</p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <select
              value={novoId}
              onChange={(e) => setNovoId(e.target.value)}
              className="h-11 flex-1 rounded-xl border border-zinc-200 bg-zinc-50 px-3 text-sm text-zinc-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
            >
              {ingredientes.map((i) => (
                <option key={i.id} value={i.id}>
                  {i.nome} ({formatBRL(i.custoPorUnidade)}/{i.unidade})
                </option>
              ))}
            </select>
            <input
              inputMode="decimal"
              value={novaQtd}
              onChange={(e) => setNovaQtd(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.nativeEvent.isComposing) adicionarItem()
              }}
              placeholder="Qtd."
              className="h-11 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3 text-sm tabular-nums text-zinc-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 sm:w-28"
            />
            <Button
              type="button"
              onClick={adicionarItem}
              className="h-11 gap-2 rounded-xl bg-zinc-900 px-4 font-semibold text-white hover:bg-zinc-800"
            >
              <Plus className="size-4" />
              Adicionar
            </Button>
          </div>

          {/* Lista de ingredientes */}
          <ul className="mt-4 flex flex-col gap-2">
            {itens.length === 0 && (
              <li className="rounded-xl bg-zinc-50 py-6 text-center text-sm text-zinc-400">
                Nenhum ingrediente adicionado
              </li>
            )}
            {itens.map((item) => {
              const ing = getIngrediente(item.ingredienteId)
              const custo = ing.custoPorUnidade * item.quantidade
              return (
                <li
                  key={item.ingredienteId}
                  className="flex items-center gap-3 rounded-xl bg-zinc-50 p-3"
                >
                  <span className="flex size-9 items-center justify-center rounded-lg bg-white text-amber-600">
                    <Package className="size-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-zinc-900">{ing.nome}</p>
                    <p className="text-xs text-zinc-400">
                      {item.quantidade} {ing.unidade} × {formatBRL(ing.custoPorUnidade)}
                    </p>
                  </div>
                  <span className="text-sm font-bold tabular-nums text-zinc-900">
                    {formatBRL(custo)}
                  </span>
                  <button
                    type="button"
                    onClick={() => remover(item.ingredienteId)}
                    className="flex size-8 items-center justify-center rounded-lg text-zinc-300 hover:bg-red-50 hover:text-red-600"
                    aria-label="Remover ingrediente"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      {/* Resumo de custos */}
      <div className="w-full shrink-0 lg:w-80">
        <div className="sticky top-0 flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-5">
          <div className="flex items-center gap-2">
            <ChefHat className="size-5 text-amber-600" />
            <h3 className="font-bold text-zinc-900">Resumo de Produção</h3>
          </div>

          <div className="rounded-xl bg-zinc-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
              {nome || "Receita"}
            </p>
            <p className="mt-1 flex items-baseline gap-1 text-sm text-zinc-500">
              Rendimento:
              <span className="font-bold text-zinc-900">{rendimento} unidades</span>
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-sm text-zinc-500">
              <span>Custo total da receita</span>
              <span className="font-semibold tabular-nums text-zinc-900">
                {formatBRL(custoTotal)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm text-zinc-500">
              <span>Ingredientes</span>
              <span className="tabular-nums">{itens.length}</span>
            </div>
          </div>

          <Separator />

          <div className="rounded-xl bg-amber-600 p-4 text-white">
            <div className="flex items-center gap-2 text-amber-100">
              <Calculator className="size-4" />
              <p className="text-xs font-semibold uppercase tracking-wide">
                Custo de Produção / Unidade
              </p>
            </div>
            <p className="mt-1 text-3xl font-bold tabular-nums">{formatBRL(custoPorUnidade)}</p>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-dashed border-zinc-200 p-3">
            <div>
              <p className="text-xs text-zinc-400">Preço de venda sugerido</p>
              <p className="text-lg font-bold tabular-nums text-emerald-600">
                {formatBRL(precoSugerido)}
              </p>
            </div>
            <Badge className="border-emerald-200 bg-emerald-50 text-emerald-700">
              Markup 200%
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}
