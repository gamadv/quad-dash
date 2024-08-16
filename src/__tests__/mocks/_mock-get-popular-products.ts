import { http, HttpResponse } from 'msw'

import { GetPopularProductsResponse } from '@/services/get-popular-produtcts'

export const getPopularProductsMock = http.get<
  never,
  never,
  GetPopularProductsResponse
>('/metrics/popular-products', () => {
  return HttpResponse.json([
    { product: 'Prod 01', amount: 5 },
    { product: 'Prod 02', amount: 3 },
    { product: 'Prod 03', amount: 2 },
    { product: 'Prod 04', amount: 7 },
    { product: 'Prod 05', amount: 4 },
  ])
})
