import { http, HttpResponse } from 'msw'

import { RegisterCompanyBody } from '@/services/registerCompany'

export const registerCompanyMock = http.post<never, RegisterCompanyBody>(
  '/company',
  async ({ request }) => {
    const { companyName } = await request.json()

    if (companyName === 'Quad Mock') {
      return new HttpResponse(null, { status: 201 })
    }

    return new HttpResponse(null, { status: 400 })
  },
)
