import { api } from '@/lib/axios'

export interface RegisterCompanyBody {
  companyName: string
  managerName: string
  email: string
  phone: string
}

export async function registerCompany({
  email,
  managerName,
  phone,
  companyName,
}: RegisterCompanyBody) {
  await api.post('/company', { email, managerName, phone, companyName })
}
