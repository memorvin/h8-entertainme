import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import ListScreen from '../screens/List'
import DetailScreen from '../screens/Details'
import EditScreen from '../screens/Edit'

const Stack = createStackNavigator()

export default function MovieStack() {
  return (
    <Stack.Navigator
      initialRouteName="Movies"
    >
      <Stack.Screen name="Movies" component={ListScreen}></Stack.Screen>
      <Stack.Screen name="Detail" component={DetailScreen}></Stack.Screen>
      <Stack.Screen name="Edit" component={EditScreen}></Stack.Screen>
    </Stack.Navigator>
  )
}