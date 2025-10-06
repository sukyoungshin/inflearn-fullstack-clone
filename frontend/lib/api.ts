'use server';

import { cookies } from 'next/headers';

const AUTH_COOKIE_NAME = process.env.NODE_ENV === 'production' ? "__Secure-authjs.session-token": 'authjs.session-token';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {},
  token?: string,
) {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  } as Record<string, string>;

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const config: RequestInit = {
    ...options,
    headers,
    cache: 'no-store',
  };

  if (options.body && typeof options.body !== 'string') {
    config.body = JSON.stringify(options.body);
  }

  const response = await fetch(`${API_URL}${endpoint}`, config);

  if (!response.ok) {
    console.error(`API 요청 실패: ${response.status} - ${response.statusText}`);
    
    // 401, 403과 같은 클라이언트 오류를 구체적으로 처리할 수 있음
    if (response.status === 401) {
      throw new Error("인증 실패 (401 Unauthorized): 유효한 토큰이 없습니다.");
    }
    
    // 이 에러가 서버 컴포넌트에서 잡히지 않으면 Next.js가 500으로 만듭니다.
    throw new Error(`API 요청 실패: ${response.status} ${response.statusText}`);
  }

  if (response.status === 204) {
    return {} as T;
  }

  const contentType = response.headers.get('Content-Type');
  if (contentType && contentType.includes('application/json')) {
    return response.json() as Promise<T>;
  }

  return response.text() as Promise<T>;
}

export async function getUserTest(token?: string) {
  if (!token) {
    try {
      const cookieStore = cookies();
      token = (await cookieStore).get(AUTH_COOKIE_NAME)?.value;
    } catch (e) {
      console.error("서버 환경이 아니거나 쿠키 접근 불가", e);
    }
  }

  return fetchApi('/user-test', {  }, token);
}