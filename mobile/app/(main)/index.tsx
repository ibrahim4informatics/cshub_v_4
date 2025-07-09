import { View, Text, ScrollView, TextInput, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import Course from '@/components/ui/Course'

const DATA = [
  { id: 1, title: "Encapsulation", module: "POO", type: "COURS", link: "http:link.com" },
  { id: 2, title: "OSI System", module: "RC", type: "COURS", link: "http:link.com" },
  { id: 3, title: "Complexcity", module: "ASD3", type: "COURS", link: "http:link.com" },
  { id: 4, title: "C/C++ Introduction", module: "ASD1", type: "COURS", link: "http:link.com" },
  { id: 5, title: "Calculus", module: "ANALYSE", type: "TD", link: "http:link.com" },
  { id: 6, title: "Graphs", module: "ASD3", type: "COURS", link: "http:link.com" },
  { id: 7, title: "Stack", module: "ASD2", type: "COURS", link: "http:link.com" },
  { id: 8, title: "Matlab", module: "OM", type: "COURS", link: "http:link.com" },
  { id: 9, title: "Encapsulation", module: "POO", type: "COURS", link: "http:link.com" },
  { id: 10, title: "Encapsulation", module: "POO", type: "COURS", link: "http:link.com" },
  { id: 11, title: "Encapsulation", module: "POO", type: "COURS", link: "http:link.com" },
  { id: 12, title: "Encapsulation", module: "POO", type: "COURS", link: "http:link.com" },
  { id: 13, title: "Encapsulation", module: "POO", type: "COURS", link: "http:link.com" },
  { id: 14, title: "Encapsulation", module: "POO", type: "COURS", link: "http:link.com" },
  { id: 15, title: "Encapsulation", module: "POO", type: "COURS", link: "http:link.com" },
]

const Index = () => {
  return (
    <SafeAreaView className='flex-1 bg-gray-900 p-3 '>







      <FlatList
      stickyHeaderHiddenOnScroll
      showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (

          <View className='fixed'>
            <Text className='text-white text-3xl font-bold mt-8'>Welcome,Ibrahim!</Text>
            <Text className='text-gray-600 font-bold my-2'>we wish that everything is allright with you to start studying with our plateform.</Text>


            <View className='flex-row w-full my-4 items-center gap-2 '>
              <TextInput placeholder='search.' className='flex-1 bg-gray-800 rounded-md text-white  placeholder:text-gray-400 px-4 py-6' />
              <TouchableOpacity className=' bg-transparent rounded-md px-6 py-6 items-center justify-center'>
                <Ionicons name='search' size={18} color={"#ffffff"} />
              </TouchableOpacity>
            </View>
          </View>

        )}
        data={DATA}
        renderItem={({ item }) => <Course title={item.title} link={item.link} module={item.module} type={item.type} />}
        keyExtractor={item => item.id.toString()}
        onEndReached={() => {
          console.log("fetch more")
        }}

      />





    </SafeAreaView>
  )
}

export default Index