import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import RegisterFrom from '@/components/forms/RegisterForm'

const register = () => {
  return (
     <View className='flex-1 bg-gray-900'>
            <SafeAreaView className='flex-1 p-4'>

                <Text className='text-3xl font-extrabold my-2 text-white mt-auto'>Hello Newbie!</Text>
                <Text className='my-2 font-bold text-gray-500'>Create an Account to Save Your Favourites Documents!</Text>

                <RegisterFrom />
            </SafeAreaView>
        </View>
  )
}

export default register