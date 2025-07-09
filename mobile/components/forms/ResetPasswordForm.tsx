import { KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View, Modal } from 'react-native'
import React, { useState } from 'react'
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from 'expo-router';


type CodeVerificationProps = {
    visible: boolean,
    email: string,
    setValue: React.Dispatch<React.SetStateAction<string>>
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
    setSuccessCode: React.Dispatch<React.SetStateAction<boolean>>

}
export const CodeVerificationForm: React.FC<CodeVerificationProps> = ({ visible = false, setVisible, setValue, setSuccessCode }) => {
    const codeSchema = z.object({
        code: z.string().regex(/\d+/, { message: "Code is numeric values" }).length(6, { message: "Code must have 6 digits" })
    })

    const { control, formState: { errors, isSubmitting }, handleSubmit, setError } = useForm({ resolver: zodResolver(codeSchema) });
    const onSubmit: SubmitHandler<z.infer<typeof codeSchema>> = (data) => {
        if (data.code === "400100") {
            setValue(data.code)
            setVisible(false);
            setSuccessCode(true)
        }
        else {
            setError("code", { message: "invalid code" })

        }

        return;
    }

    return (

        <Modal transparent visible={visible} animationType={"slide"} onRequestClose={() => { setVisible(false) }}>
            <View className=' flex-1 bg-[rgba(0,0,0,.8)] relative justify-end'>
                <View className='bg-gray-800 p-4 rounded-t-lg'>
                    <Text className='text-blue-500 text-center text-2xl font-bold'>Enter Verification Code</Text>
                    <Text className='text-gray-500 text-center text-md font-bold'>We send you a code in your email please check it out</Text>

                    <Controller
                        control={control}
                        name='code'
                        render={({ field: { onBlur, onChange, value } }) => (
                            <TextInput
                                value={value} keyboardType='decimal-pad' maxLength={6}
                                className='w-full my-2 bg-gray-700 rounded-md  placeholder:text-gray-500 text-white '
                                placeholder='Code.' onChangeText={onChange} onBlur={onBlur} />
                        )} />
                    {errors.code?.message && <Text className='text-red-400 my-1'>{errors.code.message}</Text>}
                    <TouchableOpacity className='w-full bg-blue-700 py-4 rounded-md mb-6 mt-2' onPress={handleSubmit(onSubmit)}>
                        <Text className='text-white mx-auto font-semibold text-lg'>Verify</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </Modal>
    )
}



type ChangePasswordFormProps = {

    visible: boolean
    setVisible: React.Dispatch<React.SetStateAction<boolean>>,
    email: string,
    code: string

}
export const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({ visible, setVisible, code, email }) => {
    const schema = z.object({
        new_password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=])[A-Za-z\d!@#$%^&*()_\-+=]{8,}$/, { message: "password must contain at leat 1 lowercase, 1 uppercase, 1 special character,on digit and at least a lenght of 8" })
    })

    const { control, formState: { errors, isSubmitting }, handleSubmit } = useForm({ resolver: zodResolver(schema) });
    const onSubmit: SubmitHandler<z.infer<typeof schema>> = (data) => {
        console.log({
            ...data, email, code
        })

        return router.replace("/login");
    }
    return (
        <Modal transparent visible={visible} animationType={"slide"} onRequestClose={() => { setVisible(false) }}>
            <View className=' flex-1 bg-[rgba(0,0,0,.8)] relative justify-end'>
                <View className='bg-gray-800 p-4 rounded-t-lg'>

                    <Text className='text-2xl font-bold text-blue-600 my-2'>Change Password</Text>
                    <Controller
                        control={control}
                        name='new_password'
                        render={({ field: { onBlur, onChange, value } }) => <TextInput value={value} keyboardType='decimal-pad'  className='w-full my-2 bg-gray-700 rounded-md  placeholder:text-gray-500 text-white ' placeholder='New password.' onChangeText={onChange} onBlur={onBlur} secureTextEntry />
                        }
                    />


                    {errors.new_password?.message && <Text className='text-red-400 my-1'>{errors.new_password.message}</Text>}
                    <TouchableOpacity className='w-full bg-blue-700 py-4 rounded-md mb-6 mt-2' onPress={handleSubmit(onSubmit)}>
                        <Text className='text-white mx-auto font-semibold text-lg'>Save</Text>
                    </TouchableOpacity>


                </View>
            </View>
        </Modal>
    )
}

const ResetPasswordForm = () => {


    const schema = z.object({
        email: z.string().email()
    });

    const { control, formState: { errors, isSubmitting }, handleSubmit } = useForm({ resolver: zodResolver(schema) });

    const [email, setEmail] = useState<string>("");
    const [code, setCode] = useState<string>("")
    const [isVerficationCodeVisible, setIsVerficationCodeVisible] = useState<boolean>(false);
    const [isChangePasswordVisible, setIsChangePasswordVisible] = useState<boolean>(false);

    const onSubmit: SubmitHandler<z.infer<typeof schema>> = (data) => {
        //todo: request to reset password
        setIsVerficationCodeVisible(true);
    }



    return (
        <KeyboardAvoidingView>
            <Controller
                name='email'
                control={control}
                render={({ field: { onBlur, onChange, value } }) => <TextInput onChangeText={onChange} onBlur={onBlur} value={value} placeholder='Email.' className='w-full p-4 rounded-md bg-gray-800 mt-4 border-none placeholder:text-gray-400 text-white' keyboardType='email-address' />}
            />
            {errors.email?.message && <Text className='text-red-400 mt-1 mb-2'>{errors.email.message}</Text>}
            <TouchableOpacity className='w-full bg-blue-600 py-4 rounded-md mb-12 mt-2' onPress={handleSubmit(onSubmit)}>
                <Text className='text-white mx-auto font-semibold text-lg'>Reset</Text>
            </TouchableOpacity>
            <CodeVerificationForm
                email={email} setSuccessCode={setIsChangePasswordVisible} setValue={setCode} setVisible={setIsVerficationCodeVisible} visible={isVerficationCodeVisible}
            />
            <ChangePasswordForm email={email} code={code} visible={isChangePasswordVisible} setVisible={setIsChangePasswordVisible} />
        </KeyboardAvoidingView>

    )
}

export default ResetPasswordForm