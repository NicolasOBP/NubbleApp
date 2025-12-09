import React from 'react';
import { FlatList, FlatListProps, RefreshControl } from 'react-native';

import { usePaginatedList } from '@infra';
import { useScrollToTop } from '@react-navigation/native';

import { EmptyList, EmptyListProps } from './components/EmptyList';

type ItemTConstraints = { id: number | string };

type Props<ItemT extends ItemTConstraints> = {
  querKey: Parameters<typeof usePaginatedList<ItemT>>[0];
  getList: Parameters<typeof usePaginatedList<ItemT>>[1];
  renderItem: FlatListProps<ItemT>['renderItem'];
  emptyListProps?: Pick<EmptyListProps, 'emptyMessage' | 'errorMessage'>;
  flatListProps?: Omit<Partial<FlatListProps<ItemT>>, 'renderItem'>;
};

export function InfinityScrollList<ItemT extends ItemTConstraints>({
  emptyListProps,
  flatListProps,
  getList,
  querKey,
  renderItem,
}: Props<ItemT>) {
  const { isError, isLoading, list, refresh, fetchNextPage } = usePaginatedList(
    querKey,
    getList,
  );

  const flatListRef = React.useRef<FlatList<ItemT>>(null);
  useScrollToTop(flatListRef);

  return (
    <FlatList
      ref={flatListRef}
      data={list}
      keyExtractor={item => item.id.toString()}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      onEndReached={fetchNextPage}
      onEndReachedThreshold={0.2}
      refreshing={isLoading}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refresh} />
      }
      ListEmptyComponent={
        <EmptyList
          refetch={refresh}
          error={isError}
          loading={isLoading}
          {...emptyListProps}
        />
      }
      {...flatListProps}
      contentContainerStyle={[
        { flex: list.length === 0 ? 1 : undefined },
        flatListProps?.contentContainerStyle,
      ]}
    />
  );
}
