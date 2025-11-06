import React, { useState } from 'react';
import { Dimensions, Image } from 'react-native';

import { usePostCreate } from '@domain';
import { useToastService } from '@service';

import { Button, Screen, Text, TextInput } from '@components';
import { AppScreenProps } from '@routes';

const IMAGE_WIDTH = Dimensions.get('screen').width / 2;

export function PublishPostScreen({
  route,
  navigation,
}: AppScreenProps<'PublishPostScreen'>) {
  const { showToast } = useToastService();
  const imageUri = route.params.imageUri;
  const [description, setDescription] = useState<string>('');
  const { createPost, isLoading } = usePostCreate({
    onSuccess: () => {
      navigation.navigate('AppTabNavigator', { screen: 'HomeScreen' });
      showToast({ message: 'Post publicado com sucesso!', type: 'success' });
    },
  });

  function publishPost() {
    createPost({ description, imageUri });
  }

  return (
    <Screen scrollable canGoBack title="Novo Post">
      <Image
        source={{
          uri: imageUri,
        }}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          width: IMAGE_WIDTH,
          height: IMAGE_WIDTH,
          alignSelf: 'center',
          marginTop: 20,
        }}
      />
      <Text preset="headingSmall" mt="s32" mb="s10">
        Escreva uma legenda
      </Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Digite aqui"
        containerProps={{ borderWidth: 0 }}
      />
      <Button
        loading={isLoading}
        onPress={publishPost}
        title="Publicar post"
        mt="s56"
        disabled={description.length < 1}
      />
    </Screen>
  );
}
