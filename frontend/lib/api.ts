'use server';

import { appControllerGetUserTest } from '@/generated/openapi-client';

export async function getUserTest(token?: string) {
  const {data, error} = await appControllerGetUserTest();

  return {
    data,
    error,
  }
}