import React, { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ListRenderItemInfo,
  Pressable,
} from 'react-native';

import { useCameraRoll, usePermission } from '@service';

import { PermissionManager, Screen } from '@components';
import { AppTabScreenProps } from '@routes';

import { Header } from './components/Header';

const SCREEN_WIDTH = Dimensions.get('window').width;
const NUMBER_OF_COLUMNS = 4;
const ITEM_WIDTH = SCREEN_WIDTH / NUMBER_OF_COLUMNS;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function NewPostScreen(props: AppTabScreenProps<'NewPostScreen'>) {
  const [selectedImage, setSelectedImage] = useState<string>('');
  const permission = usePermission('photoLibrary');
  const { photoList, fetchNextPage } = useCameraRoll(
    permission.status === 'granted',
    setSelectedImage,
  );

  const flatListRef = useRef<FlatList>(null);

  function onSelectImage(imageUri: string) {
    setSelectedImage(imageUri);
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  }

  function renderItem({ item }: ListRenderItemInfo<string>) {
    return (
      <Pressable onPress={() => onSelectImage(item)}>
        <Image
          key={item}
          source={{ uri: item }}
          width={ITEM_WIDTH}
          height={ITEM_WIDTH}
        />
      </Pressable>
    );
  }

  return (
    <PermissionManager
      permissionName="photoLibrary"
      description="Permita o Nubble acessar as imagens da sua galeria"
    >
      <Screen noPaddingHorizontal canGoBack title="Novo Post">
        <FlatList
          ref={flatListRef}
          ListHeaderComponent={
            <Header imageWidth={SCREEN_WIDTH} imageUri={selectedImage} />
          }
          numColumns={NUMBER_OF_COLUMNS}
          data={photoList}
          renderItem={renderItem}
          onEndReachedThreshold={0.1}
          onEndReached={fetchNextPage}
        />
      </Screen>
    </PermissionManager>
  );
}
