"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { formatBRL, ingredientes } from "@/lib/bakery-data"
import { AlertTriangle, PackagePlus, TrendingDown, Wallet } from "lucide-react"

export function EstoqueScreen() {
  const baixos = ingredientes.filter((i) => i.qtdAtual <= i.minimo)
  const valorTotal = ingredientes.reduce((acc, i) => acc + i.qtdAtual * i.custoPorUnidade, 0)

  return (
    <div className="flex flex-1 flex-col gap-6 overflow-y-auto">
      {/* Cabeçalho */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-zinc-900">Estoque de Ingredientes</h2>
          <p className="text-sm text-zinc-500">Matérias-primas e insumos de produção</p>
        </div>
        <Button className="h-11 gap-2 rounded-xl bg-amber-600 px-5 font-semibold text-white hover:bg-amber-700">
          <PackagePlus className="size-4" />
          Nova Compra de Insumo
        </Button>
      </div>

      {/* Cards de resumo */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <ResumoCard
          icon={Wallet}
          label="Valor em estoque"
          valor={formatBRL(valorTotal)}
          tom="neutro"
        />
        <ResumoCard
          icon={PackagePlus}
          label="Insumos cadastrados"
          valor={String(ingredientes.length)}
          tom="neutro"
        />
        <ResumoCard
          icon={TrendingDown}
          label="Abaixo do mínimo"
          valor={String(baixos.length)}
          tom={baixos.length > 0 ? "alerta" : "neutro"}
        />
      </div>

      {/* Tabela */}
      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
        <Table>
          <TableHeader>
            <TableRow className="border-zinc-200 hover:bg-transparent">
              <TableHead className="text-zinc-500">Ingrediente</TableHead>
              <TableHead className="text-right text-zinc-500">Qtd. Atual</TableHead>
              <TableHead className="text-right text-zinc-500">Custo / Unidade</TableHead>
              <TableHead className="text-right text-zinc-500">Valor Total</TableHead>
              <TableHead className="text-right text-zinc-500">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ingredientes.map((item) => {
              const baixo = item.qtdAtual <= item.minimo
              return (
                <TableRow key={item.id} className="border-zinc-100">
                  <TableCell className="font-semibold text-zinc-900">{item.nome}</TableCell>
                  <TableCell className="text-right tabular-nums text-zinc-700">
                    {item.qtdAtual.toLocaleString("pt-BR")} {item.unidade}
                  </TableCell>
                  <TableCell className="text-right tabular-nums text-zinc-700">
                    {formatBRL(item.custoPorUnidade)}
                  </TableCell>
                  <TableCell className="text-right font-medium tabular-nums text-zinc-900">
                    {formatBRL(item.qtdAtual * item.custoPorUnidade)}
                  </TableCell>
                  <TableCell className="text-right">
                    {baixo ? (
                      <Badge className="gap-1 border-red-200 bg-red-50 text-red-700">
                        <AlertTriangle className="size-3" />
                        Estoque Baixo
                      </Badge>
                    ) : (
                      <Badge className="border-emerald-200 bg-emerald-50 text-emerald-700">
                        Normal
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

function ResumoCard({
  icon: Icon,
  label,
  valor,
  tom,
}: {
  icon: typeof Wallet
  label: string
  valor: string
  tom: "neutro" | "alerta"
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-4">
      <div
        className={cn(
          "flex size-11 items-center justify-center rounded-xl",
          tom === "alerta" ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-600",
        )}
      >
        <Icon className="size-5" />
      </div>
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">{label}</p>
        <p
          className={cn(
            "text-xl font-bold tabular-nums",
            tom === "alerta" ? "text-red-600" : "text-zinc-900",
          )}
        >
          {valor}
        </p>
      </div>
    </div>
  )
}
