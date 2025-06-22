import { SafeAreaView, View } from 'react-native';
import { Text } from './src/Components/Text/text';
import { Button } from './src/Components/Button/button';
import { ThemeProvider } from '@shopify/restyle';
import { theme } from './src/theme/theme';
import { Icon } from './src/Components/Icon/icon';
import { Box } from './src/Components/Box/box';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView>
        <View style={{ paddingHorizontal: 24 }}>
          <Text preset="headingLarge">Coffstack</Text>

          <Button title="Entrar" marginBottom="s10" />

          <Button disabled title="Entrar" marginBottom="s10" />

          <Button title="Entrar" loading marginBottom="s10" />

          <Button title="Outline" preset="outline" marginBottom="s10" />
          <Button title="Outline" preset="outline" loading />
        </View>

        <Box flexDirection="row">
          <Icon name="eyeOn" color="error" size={50} />
          <Icon name="eyeOff" color="error" size={50} />
          <Icon name="chevronRight" color="error" size={50} />
          <Icon name="heartFill" color="error" size={50} />
          <Icon name="profile" color="error" size={50} />
          <Icon name="profileFill" color="error" size={50} />
          <Icon name="heart" color="error" size={50} />
        </Box>
        <Box flexDirection="row">
          <Icon name="newPost" color="error" size={50} />
          <Icon name="camera" color="error" size={50} />
          <Icon name="chat" color="error" size={50} />
          <Icon name="chatOn" color="error" size={50} />
          <Icon name="flashOff" color="error" size={50} />
          <Icon name="flashOn" color="error" size={50} />
          <Icon name="bell" color="error" size={50} />
          <Icon name="bellOn" color="backgroundContrast" size={50} />
        </Box>
      </SafeAreaView>
    </ThemeProvider>
  );
}

export default App;
