import React from 'react';
import { Dimensions, FlatList, Image, ListRenderItemInfo } from 'react-native';

import { useCameraRoll } from '@service';

import { Screen } from '@components';
import { AppTabScreenProps } from '@routes';

import { Header } from './components/Header';

const SCREEN_WIDTH = Dimensions.get('window').width;
const NUMBER_OF_COLUMNS = 4;
const ITEM_WIDTH = SCREEN_WIDTH / NUMBER_OF_COLUMNS;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function NewPostScreen(props: AppTabScreenProps<'NewPostScreen'>) {
  const { list } = useCameraRoll();

  function renderItem({ item }: ListRenderItemInfo<string>) {
    return (
      <Image
        key={item}
        source={{ uri: item }}
        width={ITEM_WIDTH}
        height={ITEM_WIDTH}
      />
    );
  }

  return (
    <Screen noPaddingHorizontal canGoBack title="Novo Post">
      <FlatList
        ListHeaderComponent={
          <Header imageWidth={SCREEN_WIDTH} imageUri={list[0]} />
        }
        numColumns={NUMBER_OF_COLUMNS}
        data={list}
        renderItem={renderItem}
      />
    </Screen>
  );
}
