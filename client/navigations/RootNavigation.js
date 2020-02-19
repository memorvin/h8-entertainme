import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { MaterialIcons } from '@expo/vector-icons';
import HomeNavigation from './HomeNavigation'
import ProfileStack from './ProfileStack'

const Drawer = createDrawerNavigator()

export default function RootNavigation() {
  
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContentOptions={{
        activeTintColor: 'red',
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeNavigation}
        options={{
          drawerIcon: () => <MaterialIcons name="home" size={32} color={'gray'} />,
        }}
      />
      <Drawer.Screen 
        name="Profile"
        component={ProfileStack}
        options={{
          drawerIcon: () => <MaterialIcons name="person" size={32} color={'gray'} />,
        }}
      />
    </Drawer.Navigator>
  )
}