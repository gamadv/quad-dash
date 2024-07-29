import { api } from '@/lib/axios'

export interface GetManagedCompanyResponse {
  id: string
  name: string
  createdAt: Date | null
  updatedAt: Date | null
  description: string | null
  managerId: string | null
}

export async function getManagedCompany() {
  const response = await api.get<GetManagedCompanyResponse>('/managed-company')

  return response.data
}
