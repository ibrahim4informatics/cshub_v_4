import { ActivityIndicator, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Ionicons } from "@expo/vector-icons";
import React, { useContext, useState } from 'react'
import { Link, router } from 'expo-router';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod';
import { loginUser, registerUser } from '@/services/authService';
import * as secureStorage from "expo-secure-store"
import { AuthContext } from '@/contexts/AuthContext';
const RegisterFrom = () => {

    const { setIsAuth } = useContext(AuthContext);

    const UserRegisterSchema = z.object({
        email: z.string().email(),
        first_name: z.string().max(35, { message: "first name is too long" }).min(3),
        last_name: z.string().max(35, { message: "last name is too long" }).min(3),
        password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=])[A-Za-z\d!@#$%^&*()_\-+=]{8,}$/, { message: "password should be strong use combinition of special character,upper and lower alphabets and digits" })
    });
    const { control, formState: { errors, isSubmitting }, handleSubmit, setError } = useForm({
        resolver: zodResolver(UserRegisterSchema)
    });

    const [showPassword, setShowPassword] = useState(false);

    const onSubmit: SubmitHandler<z.infer<typeof UserRegisterSchema>> = async (data) => {

        const registerPromise = registerUser(data);

        registerPromise.then(res => {
            loginUser({ email: data.email, password: data.password }).then(async (res: any) => {
                await secureStorage.setItemAsync("access", res.access);
                await secureStorage.setItemAsync("refresh", res.refresh);
                setIsAuth(true);
                router.replace("/(main)");
            })
        })
            .catch(err => {
                if (err.response.status === 400 && err.response.data.message === "the email is in use") {
                    setError("email", { message: "the email is taken by another user" })
                }
            })
        return registerPromise;
    }
    return (
        <View className='my-2 w-full'>
            <Controller control={control} name='email' render={({ field: { onBlur, onChange, value } }) => <TextInput
                className='border-none bg-gray-800 
             text-white rounded-md h-16 px-4 py-4 my-2 placeholder:text-gray-500'
                placeholder='Email.' value={value} onBlur={onBlur} onChangeText={onChange}
            />} />

            {errors.email?.message && <Text className='text-red-400 font-bold my-1'>{errors.email.message}</Text>}


            <Controller control={control} name='first_name' render={({ field: { onBlur, onChange, value } }) => <TextInput
                className='border-none bg-gray-800 
             text-white rounded-md h-16 px-4 py-4 my-2 placeholder:text-gray-500'
                placeholder='First Name..' onChangeText={onChange} onBlur={onBlur} value={value}
            />} />

            {errors.first_name?.message && <Text className='text-red-400 font-bold my-1'>{errors.first_name.message}</Text>}



            <Controller control={control} name='last_name' render={({ field: { onBlur, onChange, value } }) => <TextInput
                className='border-none bg-gray-800 
             text-white rounded-md h-16 px-4 py-4 my-2 placeholder:text-gray-500'
                placeholder='Last Name.' onChangeText={onChange} onBlur={onBlur} value={value}
            />} />
            {errors.last_name?.message && <Text className='text-red-400 font-bold my-1'>{errors.last_name.message}</Text>}


            <View className='flex h-16  flex-row bg-gray-800 my-2 items-center rounded-md'>
                <Controller control={control} name='password' render={({ field: { onBlur, onChange, value } }) => <TextInput
                    value={value} onBlur={onBlur} onChangeText={onChange}
                    secureTextEntry={showPassword} className='border-none flex-1 text-white bg-gray-800  rounded-md h-full px-4 py-4 my-2 placeholder:text-gray-500'
                    placeholder='Password.' />} />
                <Pressable onPress={() => setShowPassword(prev => !prev)} className='mx-4'><Ionicons size={20} color={"#6A7282"} name={showPassword ? "eye-off-outline" : "eye-outline"} /></Pressable>
            </View>
            {errors.password?.message && <Text className='text-red-400 font-bold my-1'>{errors.password.message}</Text>}

            <Link className='text-blue-600 my-2 font-bold' href={"/(auth)/login"}>
                Already have an account login here.
            </Link>
            <TouchableOpacity className="bg-blue-800 p-6 rounded-md my-4" onPress={handleSubmit(onSubmit)}>
                {isSubmitting ? <ActivityIndicator color={"#fff"} size={25} /> : <Text className="text-2xl font-bold text-white text-center">Create Now!</Text>}
            </TouchableOpacity>





        </View>
    )
}

export default RegisterFrom
