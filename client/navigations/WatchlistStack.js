import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import MovieList from '../screens/MovieList'
import ShowList from '../screens/ShowList'

const Stack = createStackNavigator()

export default function MovieStack() {
  return (
    <Stack.Navigator
      initialRouteName="MovieList"
    >
      <Stack.Screen name="MovieList" component={MovieList}></Stack.Screen>
      <Stack.Screen name="ShowList" component={ShowList}></Stack.Screen>
    </Stack.Navigator>
  )
}