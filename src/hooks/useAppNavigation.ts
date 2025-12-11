import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuthCredentials } from '@service';

import { AppStackParamList } from '@routes';

export function useAppNavigation() {
  const { authCredentials } = useAuthCredentials();

  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();

  function toProfile(userId: number) {
    if (authCredentials?.user.id === userId) {
      navigation.push('AppTabNavigator', { screen: 'MyProfileScreen' });
    } else {
      navigation.push('ProfileScreen', { userId });
    }
  }

  type CommentParams = Omit<AppStackParamList['PostCommentScreen'], 'showPost'>;
  function toPostComment(params: CommentParams) {
    navigation.push('PostCommentScreen', params);
  }

  function toPostDetails(params: CommentParams) {
    navigation.push('PostCommentScreen', { ...params, showPost: true });
  }

  const navigate = {
    toProfile,
    toPostComment,
    toPostDetails,
  };

  return navigate;
}
