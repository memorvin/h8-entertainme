import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/Profile'
import LandingScreen from '../screens/Landing'

const Stack = createStackNavigator()

export default function ProfileStack() {
  return (
    <Stack.Navigator
      initialRouteName="Landing"
    >
      <Stack.Screen name="Landing" component={LandingScreen}></Stack.Screen>
      <Stack.Screen name="Profile" component={ProfileScreen}></Stack.Screen>
    </Stack.Navigator>
  )
}