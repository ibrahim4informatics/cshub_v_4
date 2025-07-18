import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import useAuth from '@/hooks/useAuth'
import { AuthContext } from '@/contexts/AuthContext'
import * as secureStore from "expo-secure-store";
import { router, useFocusEffect } from 'expo-router'
import { getUser } from '@/services/userService'


type User = {
  id: string,
  first_name: string,
  last_name: string
}

const Profile = () => {
  useAuth();
  const [user, setUser] = useState<User | null >(null);

  useFocusEffect(useCallback(() => {

    getUser().then(res => {
      setUser(res.data.user)
    })
      .catch(err => {
        Alert.alert("Network Error", "Can not get user data for the moment")
      })
  }, []));
  const { setIsAuth } = useContext(AuthContext);
  const handleLogout = async () => {


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

      {
        user ?
          (
            <>
              <View className='w-[120px] h-[120px] bg-gray-800 mx-auto rounded-full items-center justify-center my-2'><Text className='text-white font-bold text-5xl'>{`${user.first_name[0].toUpperCase()}${user.last_name[0].toUpperCase()}`}</Text></View>
              <Text className='my-2 text-white font-bold text-center text-4xl'>{`${user.first_name} ${user.last_name}`}</Text>
              <View className=' px-4 my-2 items-center gap-2'>



                <TouchableOpacity className=' w-full my-2 py-6 px-2 rounded-md bg-transparent items-center justify-center gap-1' onPress={handleLogout}>
                  <Ionicons name='power' color={"#b91c1c"} size={45} />
                  <Text className='text-gray-400 text-xs'>SIGN-OUT</Text>
                </TouchableOpacity>
              </View>
            </>
          ) :
          <ActivityIndicator size={40} color={"#ffffff"} />
      }




    </SafeAreaView>
  )
}

export default Profile