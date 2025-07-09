import { View, Text } from 'react-native'
import React from 'react'
import { router, Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

const MainLayout = () => {
    return (
        <Tabs screenOptions={{
            headerShown: true, tabBarActiveBackgroundColor: "#101828", tabBarActiveTintColor: "#1447E6",
            tabBarShowLabel: false, tabBarHideOnKeyboard: true, tabBarStyle: {
                borderTopWidth: 0.2,
                borderColor: "#1E2939",
                paddingTop:15,
                height:100,
                elevation: 8,
                shadowOpacity: 0,
                backgroundColor: "#101828"

            },
        }}>
            <Tabs.Screen name='index' options={{ headerShown: false, tabBarIcon: ({size, color})=> <Ionicons color={color} size={size}  name='home' /> }} />
            <Tabs.Screen name='profile' options={{ headerShown: false, tabBarIcon: ({size, color})=> <Ionicons color={color} size={size}  name='person' /> }} />
        </Tabs>
    )
}

export default MainLayout