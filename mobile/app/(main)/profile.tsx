import { View, Text, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import useAuth from '@/hooks/useAuth'
import { AuthContext } from '@/contexts/AuthContext'
import * as secureStore from "expo-secure-store";
import { router } from 'expo-router'

const Profile = () => {
  useAuth();
  const { setIsAuth } = useContext(AuthContext);
  const handleLogout = async () => {

    console.log("gg")
    try {
      await secureStore.deleteItemAsync("access");
      await secureStore.deleteItemAsync("refresh");
      setIsAuth(false)
      return router.replace("/(auth)/login");
    }

    catch (err) {
      console.log(err)
    }

  }
  return (
    <SafeAreaView className='flex-1 bg-gray-900 px-2 justify-end'>

      <View className='w-[120px] h-[120px] bg-gray-800 mx-auto rounded-full items-center justify-center my-2'><Text className='text-white font-bold text-5xl'>IB</Text></View>
      <Text className='my-2 text-white font-bold text-center text-4xl'>Ibrahim Benyahia</Text>
      <View className=' px-4 my-2 items-center gap-2'>



        <TouchableOpacity className=' w-full my-2 py-6 px-2 rounded-md bg-transparent items-center justify-center gap-1' onPress={handleLogout}>
          <Ionicons name='power' color={"#b91c1c"} size={45} />
          <Text className='text-gray-400 text-xs'>SIGN-OUT</Text>
        </TouchableOpacity>
      </View>




    </SafeAreaView>
  )
}

export default Profile