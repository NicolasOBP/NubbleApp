import { useNavigation } from '@react-navigation/native';
import { useAuthCredentials } from '@service';

import { AppStackParamList } from '@routes';

export function useAppNavigation() {
  const { authCredentials } = useAuthCredentials();

  const navigation = useNavigation();

  function toProfile(userId: number) {
    if (authCredentials?.user.id === userId) {
      navigation.navigate('AppTabNavigator', { screen: 'MyProfileScreen' });
    } else {
      navigation.navigate('ProfileScreen', { userId });
    }
  }

  type CommentParams = Omit<AppStackParamList['PostCommentScreen'], 'showPost'>;
  function toPostComment(params: CommentParams) {
    navigation.navigate('PostCommentScreen', params);
  }

  function toPostDetails(params: CommentParams) {
    navigation.navigate('PostCommentScreen', { ...params, showPost: true });
  }

  const navigate = {
    toProfile,
    toPostComment,
    toPostDetails,
  };

  return navigate;
}
