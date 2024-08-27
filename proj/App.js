import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import React, {useState} from 'react';
import { StyleSheet, Text, View , TextInput, Button} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Auth/Login';
import Regis from './Auth/register';
import store from './store'
import { Provider } from 'react-redux';
import Menu from './components/Menu';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
//rncs


const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <GestureHandlerRootView>
    <NavigationContainer>
<Provider store={store}>
    <Stack.Navigator>
    <Stack.Screen
        name="Гимназия 587"
        component={Menu}
        options={{ headerShown: false }}
      />
    <Stack.Screen
        name="Регистрация"
        component={Regis}
      />
      <Stack.Screen
        name="Авторизация"
        component={Login}
      />
    

    </Stack.Navigator>
    </Provider>
  </NavigationContainer>
  </GestureHandlerRootView> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});