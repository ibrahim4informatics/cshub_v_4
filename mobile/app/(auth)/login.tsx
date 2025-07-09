import { View, Text, Image, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import LoginForm from '@/components/forms/LoginForm'


const login = () => {
    return (
        <View className='flex-1 bg-gray-900'>
            <SafeAreaView className='flex-1 p-4'>

                <ScrollView>
                    <Image source={require("@/assets/images/login.png")} className='object-cover w-[300px] h-[300px] mx-auto my-4' />

                    <Text className='text-3xl font-extrabold my-2 text-white mt-auto'>Welcome Back!</Text>
                    <Text className='my-2 font-bold text-gray-500'>provide your email and password to recover your saved files and documents</Text>

                    <LoginForm />
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

export default login