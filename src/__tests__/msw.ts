import { setupWorker } from 'msw/browser'

import { env } from '@/env'

import {
  getDailyRevenueInPeriodMock,
  getDayOrdersAmountMock,
  getManagedCompanyMock,
  getMonthCanceledOrdersAmountMock,
  getMonthOrdersAmountMock,
  getMonthRevenueMock,
  getPopularProductsMock,
  getProfileMock,
  registerCompanyMock,
  signInMock,
  updateProfileMock,
} from './mocks'

export const worker = setupWorker(
  signInMock,
  registerCompanyMock,
  getDayOrdersAmountMock,
  getMonthOrdersAmountMock,
  getMonthCanceledOrdersAmountMock,
  getMonthRevenueMock,
  getDailyRevenueInPeriodMock,
  getPopularProductsMock,
  getManagedCompanyMock,
  getProfileMock,
  updateProfileMock,
)

export async function enableMSW() {
  if (env.MODE !== 'test') {
    return
  }

  await worker.start()
}
