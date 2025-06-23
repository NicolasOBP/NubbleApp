import { SafeAreaView, View } from 'react-native';
import { Text } from './src/components/Text/Text';
import { Button } from './src/components/Button/Button';
import { ThemeProvider } from '@shopify/restyle';
import { theme } from './src/theme/theme';
import { Icon } from './src/components/Icon/Icon';
import { TextInput } from './src/components/TextInput/TextInput';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView>
        <View style={{ paddingHorizontal: 24 }}>
          <Text mb="s8" preset="headingLarge">
            Olá
          </Text>
          <Text mb="s40" preset="paragraphLarge">
            Digite seu e-mail e senha para entrar
          </Text>

          <TextInput
            label="Email"
            placeholder="Digite seu e-mail"
            errorMessage="Erro"
            boxProps={{ mb: 's20' }}
          />

          <TextInput
            RighComponent={<Icon name="eyeOn" color="gray2" />}
            label="Senha"
            placeholder="Digite sua senha"
            boxProps={{ mb: 's10' }}
          />

          <Text color="primary" preset="paragraphSmall" bold>
            Esqueci minha senha
          </Text>

          <Button mt="s48" title="Entrar" />
          <Button mt="s12" title="Criar uma Conta" preset="outline" />
        </View>
      </SafeAreaView>
    </ThemeProvider>
  );
}

export default App;
