import React from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  RefreshControl,
  StyleProp,
  ViewStyle,
} from 'react-native';

import { Post, usePostList } from '@domain';
import { useScrollToTop } from '@react-navigation/native';

import { PostItem, Screen } from '@components';
import { AppTabScreenProps } from '@routes';

import { HomeEmpty } from './components/HomeEmpty';
import { HomeHeader } from './components/HomeHeader';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function HomeScreen({ navigation }: AppTabScreenProps<'HomeScreen'>) {
  const { error, loading, postList, refresh, fetchNextPage } = usePostList();

  const flatListRef = React.useRef<FlatList<Post>>(null);
  useScrollToTop(flatListRef);

  function renderItem({ item }: ListRenderItemInfo<Post>) {
    return <PostItem post={item} />;
  }

  return (
    <Screen style={$screen}>
      <FlatList
        ref={flatListRef}
        data={postList}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        onEndReached={fetchNextPage}
        onEndReachedThreshold={0.2}
        contentContainerStyle={{ flex: postList.length === 0 ? 1 : undefined }}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refresh} />
        }
        refreshing={loading}
        ListHeaderComponent={<HomeHeader />}
        ListEmptyComponent={
          <HomeEmpty refetch={refresh} error={error} loading={loading} />
        }
      />
    </Screen>
  );
}

const $screen: StyleProp<ViewStyle> = {
  paddingTop: 0,
  paddingBottom: 0,
  paddingHorizontal: 0,
  flex: 1,
};
