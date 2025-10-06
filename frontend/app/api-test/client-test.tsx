"use client";

import { useApi } from "@/hooks/useApi";
import { useQuery } from "@tanstack/react-query";

export default function ClientTest() {
  const api = useApi();

  const { data, error, isLoading } = useQuery({
    queryKey: ["user-test"],
    queryFn: () => api.getUserTest(),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>클라이언트 컴포넌트 API 테스트 결과: </h2>
      <pre>{JSON.stringify(data)}</pre>
    </div>
  );
}
