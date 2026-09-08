import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (

    <Stack.Navigator screenOptions={{ headerShown: false }}  >
      
    </Stack.Navigator>
  );
}