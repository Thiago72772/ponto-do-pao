export type Produto = {
  id: string
  nome: string
  preco: number
  unidade: "un" | "kg" | "fatia"
  categoria: string
  emoji: string
}

export type Ingrediente = {
  id: string
  nome: string
  qtdAtual: number
  unidade: "Kg" | "L" | "un"
  custoPorUnidade: number
  minimo: number
}

export type ItemReceita = {
  ingredienteId: string
  quantidade: number
}

export type Receita = {
  id: string
  nome: string
  rendimento: number
  itens: ItemReceita[]
}

export const produtos: Produto[] = [
  { id: "p1", nome: "Pão Francês", preco: 18.9, unidade: "kg", categoria: "Padaria", emoji: "🥖" },
  { id: "p2", nome: "Pão de Queijo", preco: 42.0, unidade: "kg", categoria: "Padaria", emoji: "🧀" },
  { id: "p3", nome: "Café Coado", preco: 4.5, unidade: "un", categoria: "Bebidas", emoji: "☕" },
  { id: "p4", nome: "Bolo de Fubá", preco: 8.5, unidade: "fatia", categoria: "Confeitaria", emoji: "🍰" },
  { id: "p5", nome: "Sonho de Creme", preco: 6.0, unidade: "un", categoria: "Confeitaria", emoji: "🍩" },
  { id: "p6", nome: "Croissant", preco: 9.5, unidade: "un", categoria: "Padaria", emoji: "🥐" },
  { id: "p7", nome: "Suco de Laranja", preco: 7.0, unidade: "un", categoria: "Bebidas", emoji: "🍊" },
  { id: "p8", nome: "Coxinha", preco: 8.0, unidade: "un", categoria: "Salgados", emoji: "🍗" },
  { id: "p9", nome: "Pão de Forma", preco: 12.9, unidade: "un", categoria: "Padaria", emoji: "🍞" },
]

export const ingredientes: Ingrediente[] = [
  { id: "i1", nome: "Farinha de Trigo", qtdAtual: 148.5, unidade: "Kg", custoPorUnidade: 4.2, minimo: 50 },
  { id: "i2", nome: "Fermento Biológico", qtdAtual: 2.3, unidade: "Kg", custoPorUnidade: 32.0, minimo: 3 },
  { id: "i3", nome: "Açúcar Refinado", qtdAtual: 62.0, unidade: "Kg", custoPorUnidade: 5.1, minimo: 25 },
  { id: "i4", nome: "Manteiga sem Sal", qtdAtual: 8.4, unidade: "Kg", custoPorUnidade: 48.9, minimo: 10 },
  { id: "i5", nome: "Ovos", qtdAtual: 320, unidade: "un", custoPorUnidade: 0.85, minimo: 120 },
  { id: "i6", nome: "Leite Integral", qtdAtual: 45.0, unidade: "L", custoPorUnidade: 5.6, minimo: 20 },
  { id: "i7", nome: "Sal Refinado", qtdAtual: 18.0, unidade: "Kg", custoPorUnidade: 2.3, minimo: 8 },
  { id: "i8", nome: "Queijo Minas Padrão", qtdAtual: 4.2, unidade: "Kg", custoPorUnidade: 42.5, minimo: 6 },
  { id: "i9", nome: "Fubá Mimoso", qtdAtual: 22.0, unidade: "Kg", custoPorUnidade: 6.8, minimo: 10 },
  { id: "i10", nome: "Melhorador de Farinha", qtdAtual: 1.1, unidade: "Kg", custoPorUnidade: 58.0, minimo: 2 },
]

export const receitasIniciais: Receita[] = [
  {
    id: "r1",
    nome: "Pão Francês",
    rendimento: 50,
    itens: [
      { ingredienteId: "i1", quantidade: 5 },
      { ingredienteId: "i2", quantidade: 0.15 },
      { ingredienteId: "i7", quantidade: 0.1 },
      { ingredienteId: "i10", quantidade: 0.05 },
    ],
  },
]

export function formatBRL(valor: number) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
}

export function formatQtd(valor: number, unidade: string) {
  const decimais = unidade === "kg" || unidade === "Kg" || unidade === "L" ? 3 : 0
  return valor.toLocaleString("pt-BR", {
    minimumFractionDigits: decimais,
    maximumFractionDigits: decimais,
    useGrouping: false,
  })
}

export function parseNumero(valor: string) {
  return Number.parseFloat(valor.replace(",", "."))
}
