import { View, Text, ScrollView, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import Course from '@/components/ui/Course'
import SearchBar from '@/components/ui/SearchBar'
import FiltersComponentModal from '@/components/ui/FiltersComponentModal'
import fetcher from '@/config/axios'
import useAuth from '@/hooks/useAuth'
import { FiltersContext } from '@/contexts/FiltersContext'
import { getDocuments } from '@/services/documentsService'

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

  useAuth();
  const [data, setData] = useState<{
    id: number;
    title: string;
    module: { [key: string]: any };
    type: string;
    link: string;
  }[]>([])
  const [filtersModalVisible, setFiltersVisible] = useState(false);
  const { filters, setFilters } = useContext(FiltersContext);
  useEffect(() => {
    setFilters({ module_id: 0, title: "", type: "" });
  }, [])


  useEffect(() => {

    getDocuments(filters).then(res => {
      setData(res.documents)
    }).catch(err => {
      if (err.status === 404) {
        setData([]);
      }

      else {
        Alert.alert("Error Getting Documents", "Make sure you have internet connection");
      }
    })
  }, [filters.module_id, filters.title, filters.type])

  return (
    <SafeAreaView className='flex-1 bg-gray-900 p-3 '>







      <FlatList
        stickyHeaderHiddenOnScroll
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (

          <View className='fixed'>
            <Text className='text-white text-3xl font-bold mt-8'>Welcome,Ibrahim!</Text>
            <Text className='text-gray-600 font-bold my-2'>we wish that everything is allright with you to start studying with our plateform.</Text>


            <View className='flex-row'>
              <SearchBar />

              <TouchableOpacity onPress={() => setFiltersVisible(true)} className='p-4 mr-2 rounded-md bg-blue-700 items-center justify-center'><Ionicons color={"#fff"} size={20} name='filter' /></TouchableOpacity>


            </View>
          </View>

        )}
        ListEmptyComponent={()=> <Text className='text-gray-400 font-bold my-6'>No Results.</Text>}
        data={data}
        renderItem={({ item }) => <Course id={item.id} title={item.title} link={item.link} module={item.module.name} type={item.type} />}
        keyExtractor={item => item.id.toString()}
        onEndReached={() => {
          console.log("fetch more")
        }}

      />


      <FiltersComponentModal visible={filtersModalVisible} setIsVisible={setFiltersVisible} />


    </SafeAreaView>
  )
}

export default Index