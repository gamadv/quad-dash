import { setupWorker } from 'msw/browser'

import { env } from '@/env'

import { signInMock } from './_mock-sign-in'

export const worker = setupWorker(signInMock)

export async function enableMSW() {
  if (env.MODE !== 'test') {
    return
  }

  await worker.start()
}
