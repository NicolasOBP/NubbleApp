import { SafeAreaView } from 'react-native';
import { Text } from './src/Components/Text/text';

function App() {
  return (
    <SafeAreaView>
      <Text preset="headingLarge" style={{ fontFamily: 'Satoshi-Black' }}>
        AAAA
      </Text>
      <Text preset="headingLarge" style={{ fontFamily: 'Satoshi-Bold' }}>
        AAAA
      </Text>
      <Text preset="headingSmall">AAAA</Text>
      <Text preset="headingLarge">AAAA</Text>
    </SafeAreaView>
  );
}

export default App;
