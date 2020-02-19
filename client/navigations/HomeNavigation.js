import React from 'react'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MovieStack from './MovieStack'
import ShowStack from './ShowStack'
import WatchlistStack from './WatchlistStack'

const Tab = createBottomTabNavigator()

export default function HomeNavigation() {
  
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: 'black',
        inactiveTintColor: 'gray',
        labelStyle: {
          fontWeight: 'bold'
        }
      }}
    >
      <Tab.Screen
        name="Movies"
        component={MovieStack}
        options={{
          tabBarLabel: 'Movies',
          tabBarIcon: () => <MaterialIcons name="movie" size={32} color="red" />,
        }}
      />
      <Tab.Screen
        name="Shows"
        component={ShowStack}
        options={{
          tabBarLabel: 'Shows',
          tabBarIcon: () => <MaterialCommunityIcons name="movie-roll" size={32} color="red" />,
        }}
      />
      <Tab.Screen
        name="Watchlist"
        component={WatchlistStack}
        options={{
          tabBarLabel: 'Watchlist',
          tabBarIcon: () => <
          MaterialIcons name="bookmark" size={32} color="red" />,
        }}
      />
    </Tab.Navigator>
  )
}