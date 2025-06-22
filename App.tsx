import { SafeAreaView, View } from 'react-native';
import { Text } from './src/Components/Text/text';
import { Button } from './src/Components/Button/button';
import { ThemeProvider } from '@shopify/restyle';
import { theme } from './src/theme/theme';

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
      </SafeAreaView>
    </ThemeProvider>
  );
}

export default App;
