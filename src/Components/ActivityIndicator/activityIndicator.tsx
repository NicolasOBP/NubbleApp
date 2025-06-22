import {
  ActivityIndicatorProps,
  ActivityIndicator as RNActivityIndicator,
} from 'react-native';
import { ThemeColor } from '../../theme/theme';
import { useAppTheme } from '../../hooks/useAppTheme';

interface Props extends Omit<ActivityIndicatorProps, 'color'> {
  color: ThemeColor;
}

export function ActivityIndicator({ color }: Props) {
  const { colors } = useAppTheme();

  return <RNActivityIndicator color={colors[color]} />;
}
