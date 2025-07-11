import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

const LoadingCompoenent = () => {
    return (
        <View className='flex-1 justify-center items-center bg-gray-900'>
            <ActivityIndicator size={25} color={"#1447E6"} />
        </View>
    )
}

export default LoadingCompoenent