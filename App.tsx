import { SafeAreaView } from 'react-native';
import { Text } from './src/Components/Text/text';

function App() {
  return (
    <SafeAreaView>
      <Text semibold preset="headingLarge">
        AAAA
      </Text>
      <Text preset="headingLarge">AAAA</Text>
      <Text preset="headingSmall">AAAA</Text>
      <Text preset="headingLarge" italic>
        AAAA
      </Text>
    </SafeAreaView>
  );
}

export default App;
