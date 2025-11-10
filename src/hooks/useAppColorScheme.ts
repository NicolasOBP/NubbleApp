import { useEffect } from 'react';
import { Appearance } from 'react-native';

import { settingsService, useAppColor, useSettingsService } from '@service';

/**
 * To listen to device color scheme changes (dark mode & light mode)
 */
export function useAppColorScheme() {
  const appColor = useAppColor();
  const { onSystemChange } = useSettingsService();

  useEffect(() => {
    onSystemChange(Appearance.getColorScheme());
  }, [onSystemChange]);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(preferences => {
      onSystemChange(preferences.colorScheme);
    });

    return () => {
      subscription.remove();
    };
  }, [onSystemChange]);

  useEffect(() => {
    settingsService.handleStatusBar(appColor);
  }, [appColor]);

  return appColor;
}
