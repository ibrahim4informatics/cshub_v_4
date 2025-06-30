import { ActivityIndicator, Alert, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from 'react'
import { Link } from 'expo-router';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { Button } from '@react-navigation/elements';


const shcema = z.object({
    email: z.string().email({ message: "invalid email or passwod" }),
    password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=])[A-Za-z\d!@#$%^&*()_\-+=]{8,}$/, { message: "invalid email or password" })
})

const LoginForm = () => {
    const { control, formState: { isSubmitting, errors }, setError, handleSubmit } = useForm({ resolver: zodResolver(shcema) });
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit: SubmitHandler<z.infer<typeof shcema>> = async (data) => {
        console.log("first")
        return new Promise((res) => {
            setTimeout(() => {
                console.log(data);
                Alert.alert("CSHUB", "User Register Success", [{ text: "Ok", onPress: () => { return }}])
                res(data);
            }, 2000);
        })
    }
    return (
        <View className='my-2 w-full'>
            <Controller control={control} render={({ field: { value, onBlur, onChange } }) => (<TextInput onChangeText={onChange} onBlur={onBlur} value={value} className='border-none bg-gray-800  text-white rounded-md h-16 px-4 py-4 my-2 placeholder:text-gray-500' placeholder='Email.' />
            )} name='email' />
            {errors.email && <Text className='text-red-400'>invalid email or password</Text>}
            <View className='flex flex-row bg-gray-800 my-2 items-center rounded-md'>
                <Controller control={control} name='password' render={({ field }) => (<TextInput secureTextEntry={showPassword} className='border-none flex-1 text-white bg-gray-800  rounded-md h-16 px-4 py-4 my-2 placeholder:text-gray-500'
                    placeholder='Password.' onBlur={field.onBlur} onChangeText={field.onChange} value={field.value} />)} />
                <Pressable onPress={() => setShowPassword(prev => !prev)} className='mx-4'><Ionicons size={20} color={"#6A7282"} name={showPassword ? "eye-off-outline" : "eye-outline"} /></Pressable>
            </View>
            {errors.password && <Text className='text-red-400'>invalid email or password</Text>}

            <Link className='text-blue-600 my-2' href={"/(auth)/login"}>
                Forgot Password?
            </Link>
            <TouchableOpacity className="bg-blue-800 p-6 rounded-md my-4" disabled={isSubmitting}>
                {isSubmitting ? <ActivityIndicator color={"#ffffff"} size={20} /> : <Text className="text-2xl font-bold text-white text-center" onPress={handleSubmit(onSubmit)}>Login</Text>}
            </TouchableOpacity>


            <Link href={"/(auth)/register"} asChild>
                <TouchableOpacity className="bg-gray-800 p-6 rounded-md my-4">
                    <Text className="text-2xl font-bold text-white text-center">Create Account!</Text>
                </TouchableOpacity>
            </Link>

            <View className='flex items-center flex-row my-4'>
                <View className='h-[1px] bg-gray-700 flex-1' />
                <Text className='text-gray-500 font-bold mx-2'>OR</Text>
                <View className='h-[1px] bg-gray-700 flex-1' />
            </View>

            <View className='my-2 flex-row items-center justify-center gap-4'>
                <TouchableOpacity className="bg-blue-800  p-6 rounded-full my-4">
                    <Ionicons name='logo-google' color={"white"} size={30} />
                </TouchableOpacity>

                <TouchableOpacity className="bg-blue-800  p-6 rounded-full my-4">
                    <Ionicons name='logo-facebook' color={"white"} size={30} />
                </TouchableOpacity>

                <TouchableOpacity className="bg-blue-800  p-6 rounded-full my-4">
                    <Ionicons name='logo-whatsapp' color={"white"} size={30} />
                </TouchableOpacity>

            </View>

        </View>
    )
}

export default LoginForm
