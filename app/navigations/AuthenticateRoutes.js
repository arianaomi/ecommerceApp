
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer'
import  { Icon } from 'react-native-elements'
// My screens
import StoreStack from './StoreStack'
import ProfileStack from './ProfileStack'
import MyStoreStack from './MyStoreStack'
// My components 
import ShopButton from '../components/ShopButton'

const Tab = createBottomTabNavigator()
const Drawer = createDrawerNavigator()

const TabBar = () => {
  return (
    <Tab.Navigator 
      initialRouteName='store'
      tabBarOptions={{
        inactiveTintColor: "#ffffff",
        activeTintColor: "#fff",
        style: {
          borderRadius: 60,
          alignItems: 'center',
          backgroundColor: "#128C7E",
          paddingBottom: 5
        }
      }}

      screenOptions = {({route}) => ({
        tabBarIcon: ({color}) => showIcon (route, color)
      })}
    >
      <Tab.Screen  
        name='store'
        component={StoreStack}
        options={{title: "Tienda"}}
      />
      <Tab.Screen  
        name='myStore'
        component={MyStoreStack}
        options={{
          title: "",
          tabBarIcon: () => <ShopButton />
      }}
      />
      <Tab.Screen  
        name='profile'
        component={ProfileStack}
        options={{
          title: "Mi perfil",
          
        }}
      />
    </Tab.Navigator>
  )
}
function showIcon (route, color) {
  let iconName =''
  switch(route.name) {
    case "store":
      iconName = "cart-outline";
    break;
    case "profile": 
      iconName='account-circle-outline'
    break;
    case "myStore": 
      iconName='cart-outline'
      break;
  }

  return (
    <Icon type='material-community' name={iconName} size={24} color={color} />
  )
}
export default function AuthenticatedRoutes () {
  return (
    <NavigationContainer>
      <TabBar />
    </NavigationContainer>
  )
}