import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/Landing'
import RegisterScreen from '../screens/Register'

const Stack = createStackNavigator()

export default function LandingStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
    >
      <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>
      <Stack.Screen name="Register" component={RegisterScreen}></Stack.Screen>
    </Stack.Navigator>
  )
}