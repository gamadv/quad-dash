import { setupWorker } from 'msw/browser'

import { env } from '@/env'

import {
  approveOrderMock,
  cancelOrderMock,
  deliverOrderMock,
  dispatchOrderMock,
  getDailyRevenueInPeriodMock,
  getDayOrdersAmountMock,
  getManagedCompanyMock,
  getMonthCanceledOrdersAmountMock,
  getMonthOrdersAmountMock,
  getMonthRevenueMock,
  getOrderDetailsMock,
  getOrdersMock,
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
  getOrderDetailsMock,
  getOrdersMock,
  cancelOrderMock,
  approveOrderMock,
  deliverOrderMock,
  dispatchOrderMock,
)

export async function enableMSW() {
  if (env.MODE !== 'test') {
    return
  }

  await worker.start()
}
