import { useEffect, useState } from 'react';

import { Page } from '@types';

export function usePaginatedList<Data>(
  getList: (page: number) => Promise<Page<Data>>,
) {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean | null>(null);
  const [list, setList] = useState<Data[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);

  async function fetchData() {
    try {
      setError(null);
      setLoading(true);
      const { data, meta } = await getList(1);
      setList(data);
      if (meta.hasNextPage) {
        setPage(2);
        setHasNextPage(true);
      } else {
        setHasNextPage(false);
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  async function fetchNextPage() {
    if (loading || !hasNextPage) return;

    try {
      setLoading(true);
      const { data, meta } = await getList(page);
      setList(prev => [...prev, ...data]);
      if (meta.hasNextPage) {
        setPage(prev => prev + 1);
      } else {
        setHasNextPage(false);
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    list,
    error,
    loading,
    refresh: fetchData,
    fetchNextPage,
  };
}
