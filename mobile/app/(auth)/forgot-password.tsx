import { View, Text, Image, Modal } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ResetPasswordForm from '@/components/forms/ResetPasswordForm'

const ForgotPassword = () => {
    return (
        <SafeAreaView className='bg-gray-900 flex-1 px-2 justify-end'>
            <Image source={require("@/assets/images/forgot.png")} className='w-[400px] h-[400px] mx-auto object-cover' />
            <Text className='text-3xl font-extrabold text-blue-700'>Forgot Password!</Text>

            <ResetPasswordForm />

        </SafeAreaView>
    )
}

export default ForgotPassword