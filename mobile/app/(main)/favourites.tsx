import { View, Text, FlatList, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Course from '@/components/ui/Course';
import { Ionicons } from '@expo/vector-icons';
import FiltersComponentModal from '@/components/ui/FiltersComponentModal';
import { FiltersContext } from '@/contexts/FiltersContext';
import SearchBar from '@/components/ui/SearchBar';
import { getFavouritesDocuments } from '@/services/documentsService';
import { useFocusEffect } from 'expo-router';



type Favourite = {
    id: number;
    document: { [key: string]: any }
}

const Favourites = () => {
    const [data, setData] = useState<{
        favourites: Favourite[],
        meta_data: { [key: string]: any }
    }>({ meta_data: {}, favourites: [] });
    const [filtersModalVisible, setFiltersVisible] = useState(false);
    const { filters, setFilters } = useContext(FiltersContext);
    useFocusEffect(
        useCallback(() => {
            getFavouritesDocuments(filters).then(
                res => {  setData({ meta_data: res.meta_data, favourites: res.favourites }) }
            ).catch(err => {
                if (err === 404) {
                    setData({ ...data, favourites: [] });
                }

            })


            return () => {
                setFilters({ page: 1, module_id: 0, type: "", title: "" });
                setData({ meta_data: {}, favourites: [] });
            };
        }, [])
    );


    useEffect(() => {

        getFavouritesDocuments(filters).then(
            res => { setData({ meta_data: res.meta_data, favourites: res.favourites }) }
        ).catch(err => {
           
            if (err === 404) {
                setData({ ...data, favourites: [] });
            }

        })

    }, [filters.module_id, filters.type, filters.title])

    useEffect(() => {


        getFavouritesDocuments(filters).then(
            res => { setData({ meta_data: res.meta_data, favourites: data.favourites.concat(res.favourites) }) }
        ).catch(err => {
            if (err.status === 404) {
                setData({ ...data, favourites: data.favourites.concat([]) });
            }
           
        })

    }, [filters.page])


    const fetchMore = () => {
        if (filters.page < data.meta_data.max_page) {
            setFilters({ ...filters, page: filters.page + 1 })
        }
    }


    return (


        <SafeAreaView className='flex-1 bg-gray-900'>

            <Text className='text-center text-3xl font-extrabold text-white my-4'>Favourites</Text>
            <FlatList
                ListEmptyComponent={() => <View className='flex-1 justify-center items-center  my-4'><Text className='text-gray-400 text-lg'>No Results</Text></View>}
                ListHeaderComponent={() => (
                    <View className='w-full my-2 flex-row items-center gap-2'>


                        <SearchBar />
                        <TouchableOpacity onPress={() => setFiltersVisible(true)} className='p-4 mr-2 rounded-md bg-blue-700 items-center justify-center'><Ionicons color={"#fff"} size={20} name='filter' /></TouchableOpacity>

                    </View>
                )}
                data={data.favourites}
                onEndReached={fetchMore}
                renderItem={({ item, index }) => <Course index={index + 1} is_favourite id={item.document.id} title={item.document.title} type={item.document.type} link={item.document.download_link} module={item.document.module.name} />}
                keyExtractor={(item) => item.id.toString()}
            />

            <FiltersComponentModal visible={filtersModalVisible} setIsVisible={setFiltersVisible} />
        </SafeAreaView>
    )
}

export default Favourites