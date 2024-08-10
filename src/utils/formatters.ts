export function formatPriceCents(price: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price / 100)
}
