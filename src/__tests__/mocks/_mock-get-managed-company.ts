import { http, HttpResponse } from 'msw'

import { GetManagedCompanyResponse } from '@/services/get-managed-company'

export const getManagedCompanyMock = http.get<
  never,
  never,
  GetManagedCompanyResponse
>('/managed-company', () => {
  return HttpResponse.json({
    id: 'custom-company-id',
    name: 'Quad Dash',
    description: 'Custom Company description.',
    managerId: 'custom-user-id',
    createdAt: new Date(),
    updatedAt: null,
  })
})
