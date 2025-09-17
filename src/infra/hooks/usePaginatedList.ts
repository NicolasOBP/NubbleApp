import { useEffect, useState } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';
import { Page } from '@types';

interface usePaginatedListResult<TData> {
  list: TData[];
  isError: boolean | null;
  isLoading: boolean;
  refresh: () => void;
  fetchNextPage: () => void;
  hasNextPage: boolean;
}

interface PaginatedListOptions {
  /**
   * Set this to `false` disable automatic refetching when the query mounts or changes query keys.
   */
  enabled?: boolean;
  /**
   * The time in milliseconds after data is considered stale.
   */
  staleTime?: number;
}
export function usePaginatedList<Data>(
  queryKey: readonly unknown[],
  getList: (page: number) => Promise<Page<Data>>,
  options?: PaginatedListOptions,
): usePaginatedListResult<Data> {
  const [list, setList] = useState<Data[]>([]);

  const query = useInfiniteQuery({
    queryKey,
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getList(pageParam),
    getNextPageParam: ({ meta }) =>
      meta.hasNextPage ? meta.currentPage + 1 : null,
    enabled: options?.enabled,
    staleTime: options?.staleTime,
  });

  useEffect(() => {
    if (query.data) {
      const newList = query.data.pages.reduce<Data[]>((prev, corr) => {
        return [...prev, ...corr.data];
      }, []);

      setList(newList);
    }
  }, [query.data]);

  return {
    list,
    isError: query.isError,
    isLoading: query.isLoading,
    refresh: query.refetch,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: !!query.hasNextPage,
  };
}
