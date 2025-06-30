import { Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from 'react'
import { Link } from 'expo-router';

const RegisterFrom = () => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <View className='my-2 w-full'>
            <TextInput
                className='border-none bg-gray-800 
             text-white rounded-md h-16 px-4 py-4 my-2 placeholder:text-gray-500'
                placeholder='Email.'
            />


              <TextInput
                className='border-none bg-gray-800 
             text-white rounded-md h-16 px-4 py-4 my-2 placeholder:text-gray-500'
                placeholder='First Name..'
            />



              <TextInput
                className='border-none bg-gray-800 
             text-white rounded-md h-16 px-4 py-4 my-2 placeholder:text-gray-500'
                placeholder='Last Name.'
            />
            <View className='flex h-16  flex-row bg-gray-800 my-2 items-center rounded-md'>
                <TextInput secureTextEntry={showPassword} className='border-none flex-1 text-white bg-gray-800  rounded-md h-full px-4 py-4 my-2 placeholder:text-gray-500'
                    placeholder='Password.' />
                <Pressable onPress={() => setShowPassword(prev => !prev)} className='mx-4'><Ionicons size={20} color={"#6A7282"} name={showPassword ? "eye-off-outline" : "eye-outline"} /></Pressable>
            </View>

            <Link className='text-blue-600 my-2 font-bold' href={"/(auth)/login"}>
                Already have an account login here.
            </Link>
            <TouchableOpacity className="bg-blue-800 p-6 rounded-md my-4">
                <Text className="text-2xl font-bold text-white text-center">Create Now!</Text>
            </TouchableOpacity>





        </View>
    )
}

export default RegisterFrom
