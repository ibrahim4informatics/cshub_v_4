import { View, Text, ScrollView, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import Course from '@/components/ui/Course'
import SearchBar from '@/components/ui/SearchBar'
import FiltersComponentModal from '@/components/ui/FiltersComponentModal'
import useAuth from '@/hooks/useAuth'
import { FiltersContext } from '@/contexts/FiltersContext'
import { getDocuments } from '@/services/documentsService'
import { useFocusEffect } from 'expo-router'


type Document = {
  id: number;
  title: string;
  module: { [key: string]: any };
  type: string;
  download_link: string;
  is_favourite: boolean
}


const Index = () => {

  useAuth();
  const [data, setData] = useState<{ documents: Document[], meta_data: { [key: string]: any } }>({ meta_data: {}, documents: [] });
  const [filtersModalVisible, setFiltersVisible] = useState(false);
  const { filters, setFilters } = useContext(FiltersContext);

  useEffect(() => {
    setFilters({ module_id: 0, title: "", type: "", page: 1 });
  }, [])


  useFocusEffect(useCallback(() => {

    getDocuments(filters).then(res => {
      setData(res)
    }).catch(err => {
      if (err.status === 404) {
        setData({ ...data, documents: [] });
      }

      else {
        Alert.alert("Error Getting Documents", "Make sure you have internet connection");
      }
    })

    return () => {
      setFilters({ module_id: 0, type: "", title: "", page: 1 });
      setData({ meta_data: {}, documents: [] });
    }

  }, []))

  useEffect(() => {

    getDocuments(filters).then(res => {
      setData({ meta_data: res.meta_data, documents: res.documents })
    }).catch(err => {
      if (err.status === 404) {
        setData({ ...data, documents: [] });
      }

      else {
        Alert.alert("Error Getting Documents", "Make sure you have internet connection");
      }
    })
  }, [filters.module_id, filters.title, filters.type]);


  useEffect(() => {


    getDocuments(filters).then(res => {
      setData({ meta_data: res.meta_data, documents: data.documents.concat(res.documents) })
    }).catch(err => {
      if (err.status === 404) {
        setData({ ...data, documents: data.documents.concat([]) });
      }

      else {
        Alert.alert("Error Getting Documents", "Make sure you have internet connection");
      }
    })

  }, [filters.page]);


  const fetchMore = () => {

    if (filters.page < data.meta_data.max_page) {
      setFilters({ ...filters, page: filters.page + 1 })
    }
  }

  return (
    <SafeAreaView className='flex-1 bg-gray-900 p-3 '>









      <FlatList
        stickyHeaderHiddenOnScroll
        showsVerticalScrollIndicator={false}

        ListHeaderComponent={() => (

          <View className='fixed'>
            <Text className='text-white text-3xl font-bold mt-8'>Welcome,Ibrahim!</Text>
            <Text className='text-gray-600 font-bold my-2'>we wish that everything is allright with you to start studying with our plateform.</Text>


            <View className='flex-row my-2'>
              <SearchBar />

              <TouchableOpacity onPress={() => setFiltersVisible(true)} className='p-4 mr-2 rounded-md bg-blue-700 items-center justify-center'><Ionicons color={"#fff"} size={20} name='filter' /></TouchableOpacity>


            </View>
          </View>

        )}
        ListEmptyComponent={() => <Text className='text-gray-400 font-bold my-6'>No Results.</Text>}
        data={data.documents}
        renderItem={({ item,index }) => <Course setData={setData} data ={data} index={index+1} is_favourite={item.is_favourite} id={item.id} title={item.title} link={item.download_link} module={item.module.name} type={item.type} />}
        keyExtractor={item => item.id.toString()}
        onEndReached={fetchMore}

      />


      <FiltersComponentModal visible={filtersModalVisible} setIsVisible={setFiltersVisible} />


    </SafeAreaView>
  )
}

export default Index