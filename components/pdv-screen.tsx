"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { formatBRL, formatQtd, parseNumero, produtos, type Produto } from "@/lib/bakery-data"
import {
  Banknote,
  CreditCard,
  Minus,
  Plus,
  QrCode,
  Receipt,
  Scale,
  Trash2,
} from "lucide-react"

type ItemCarrinho = { produto: Produto; qtd: number }
type Pagamento = "pix" | "cartao" | "dinheiro"

export function PdvScreen() {
  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([
    { produto: produtos[0], qtd: 0.32 },
    { produto: produtos[2], qtd: 2 },
  ])
  const [peso, setPeso] = useState("")
  const [pagamento, setPagamento] = useState<Pagamento>("pix")

  function adicionar(produto: Produto, qtd = 1) {
    setCarrinho((atual) => {
      const existente = atual.find((i) => i.produto.id === produto.id)
      if (existente) {
        return atual.map((i) =>
          i.produto.id === produto.id ? { ...i, qtd: +(i.qtd + qtd).toFixed(2) } : i,
        )
      }
      return [...atual, { produto, qtd }]
    })
  }

  function alterarQtd(id: string, delta: number) {
    setCarrinho((atual) =>
      atual
        .map((i) => (i.produto.id === id ? { ...i, qtd: +(i.qtd + delta).toFixed(2) } : i))
        .filter((i) => i.qtd > 0),
    )
  }

  function remover(id: string) {
    setCarrinho((atual) => atual.filter((i) => i.produto.id !== id))
  }

  function lerBalanca() {
    const valor = peso ? parseNumero(peso) : +(Math.random() * 0.8 + 0.2).toFixed(3)
    if (!Number.isNaN(valor) && valor > 0) {
      adicionar(produtos[0], valor)
      setPeso("")
    }
  }

  const subtotal = carrinho.reduce((acc, i) => acc + i.produto.preco * i.qtd, 0)
  const total = subtotal

  return (
    <div className="flex flex-1 flex-col gap-6 overflow-hidden lg:flex-row">
      {/* Grade de produtos */}
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-2 rounded-full bg-emerald-500" />
          <p className="text-sm font-medium text-zinc-500">Mais vendidos hoje</p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
          {produtos.map((produto) => (
            <button
              key={produto.id}
              type="button"
              onClick={() => adicionar(produto)}
              className="group flex flex-col items-start gap-3 rounded-2xl border border-zinc-200 bg-white p-4 text-left transition-all hover:border-amber-500 hover:shadow-md hover:shadow-amber-600/5"
            >
              <span className="flex size-12 items-center justify-center rounded-xl bg-zinc-100 text-2xl transition-colors group-hover:bg-amber-50">
                {produto.emoji}
              </span>
              <div className="w-full">
                <p className="truncate text-sm font-semibold text-zinc-900">{produto.nome}</p>
                <p className="text-xs text-zinc-400">{produto.categoria}</p>
              </div>
              <div className="flex w-full items-end justify-between">
                <span className="text-base font-bold text-amber-600">
                  {formatBRL(produto.preco)}
                </span>
                <span className="text-xs text-zinc-400">/{produto.unidade}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Carrinho / Cupom */}
      <div className="flex w-full shrink-0 flex-col rounded-2xl border border-zinc-200 bg-white lg:w-96">
        <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4">
          <div className="flex items-center gap-2">
            <Receipt className="size-5 text-amber-600" />
            <h2 className="font-bold text-zinc-900">Cupom Fiscal</h2>
          </div>
          <Badge variant="secondary" className="bg-zinc-100 text-zinc-600">
            {carrinho.length} itens
          </Badge>
        </div>

        {/* Leitura de balança */}
        <div className="border-b border-zinc-200 p-4">
          <label htmlFor="balanca" className="mb-2 block text-xs font-semibold uppercase tracking-wide text-zinc-400">
            Produto por peso
          </label>
          <div className="flex items-center gap-2">
            <input
              id="balanca"
              inputMode="decimal"
              value={peso}
              onChange={(e) => setPeso(e.target.value)}
              placeholder="0,000 kg"
              className="h-14 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 text-2xl font-bold tabular-nums text-zinc-900 outline-none placeholder:text-zinc-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
            />
            <Button
              type="button"
              onClick={lerBalanca}
              className="h-14 shrink-0 gap-2 bg-zinc-900 px-4 text-white hover:bg-zinc-800"
            >
              <Scale className="size-5" />
              <span className="hidden sm:inline">Ler Balança</span>
            </Button>
          </div>
          <p className="mt-1.5 text-xs text-zinc-400">Integração com balança Toledo Prix</p>
        </div>

        {/* Itens */}
        <div className="flex-1 overflow-y-auto p-4">
          {carrinho.length === 0 ? (
            <div className="flex h-full min-h-32 flex-col items-center justify-center gap-2 text-center">
              <Receipt className="size-8 text-zinc-300" />
              <p className="text-sm text-zinc-400">Nenhum item no cupom</p>
            </div>
          ) : (
            <ul className="flex flex-col gap-2">
              {carrinho.map((item) => (
                <li
                  key={item.produto.id}
                  className="flex items-center gap-3 rounded-xl bg-zinc-50 p-2.5"
                >
                  <span className="flex size-9 items-center justify-center rounded-lg bg-white text-lg">
                    {item.produto.emoji}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-zinc-900">
                      {item.produto.nome}
                    </p>
                    <p className="text-xs text-zinc-400">
                      {formatQtd(item.qtd, item.produto.unidade)} {item.produto.unidade} · {formatBRL(item.produto.preco)}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => alterarQtd(item.produto.id, item.produto.unidade === "kg" ? -0.1 : -1)}
                      className="flex size-7 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-100"
                      aria-label="Diminuir"
                    >
                      <Minus className="size-3.5" />
                    </button>
                    <span className="w-16 text-right text-sm font-bold tabular-nums text-zinc-900">
                      {formatBRL(item.produto.preco * item.qtd)}
                    </span>
                    <button
                      type="button"
                      onClick={() => alterarQtd(item.produto.id, item.produto.unidade === "kg" ? 0.1 : 1)}
                      className="flex size-7 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-100"
                      aria-label="Aumentar"
                    >
                      <Plus className="size-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => remover(item.produto.id)}
                      className="flex size-7 items-center justify-center rounded-lg text-zinc-300 hover:bg-red-50 hover:text-red-600"
                      aria-label="Remover"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Totais + Pagamento */}
        <div className="border-t border-zinc-200 p-4">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-sm text-zinc-500">
              <span>Subtotal</span>
              <span className="tabular-nums">{formatBRL(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-zinc-900">Total</span>
              <span className="text-2xl font-bold tabular-nums text-zinc-900">
                {formatBRL(total)}
              </span>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="grid grid-cols-3 gap-2">
            {(
              [
                { id: "pix", label: "Pix", icon: QrCode },
                { id: "cartao", label: "Cartão", icon: CreditCard },
                { id: "dinheiro", label: "Dinheiro", icon: Banknote },
              ] as const
            ).map((op) => {
              const Icon = op.icon
              const ativo = pagamento === op.id
              return (
                <button
                  key={op.id}
                  type="button"
                  onClick={() => setPagamento(op.id)}
                  className={cn(
                    "flex flex-col items-center gap-1.5 rounded-xl border p-3 text-xs font-semibold transition-colors",
                    ativo
                      ? "border-amber-600 bg-amber-50 text-amber-700"
                      : "border-zinc-200 bg-white text-zinc-500 hover:bg-zinc-50",
                  )}
                >
                  <Icon className="size-5" />
                  {op.label}
                </button>
              )
            })}
          </div>

          <Button
            type="button"
            disabled={carrinho.length === 0}
            className="mt-3 h-16 w-full gap-2 rounded-xl bg-emerald-600 text-base font-bold text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 disabled:opacity-40"
          >
            <Receipt className="size-5" />
            Finalizar &amp; Emitir NFC-e
          </Button>
        </div>
      </div>
    </div>
  )
}
