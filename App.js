import React from 'react';
import MainStack from './src/Navigation/MainStack';
import { SafeAreaView, Text } from 'react-native';


const App = ({
  
}) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
     <MainStack/>
    </SafeAreaView>
  );
}

export default App;