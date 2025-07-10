import { View, Text, FlatList, TextInput, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Course from '@/components/ui/Course';
import { Ionicons } from '@expo/vector-icons';
import FiltersComponentModal from '@/components/ui/FiltersComponentModal';
import { FiltersContext } from '@/contexts/FiltersContext';
import SearchBar from '@/components/ui/SearchBar';


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



const Favourites = () => {

    const [filtersModalVisible, setFiltersVisible] = useState(false);
    const { filters } = useContext(FiltersContext);
    const [documents, setDocuments] = useState<{
        id: number;
        title: string;
        module: string;
        type: string;
        link: string;
    }[]>([]);

    useEffect(() => {

        let d = DATA;

        if (filters.title) {
            d = d.filter(el => el.title.includes(filters.title!))
        }

        if (filters.type) {
            d = d.filter(el => el.type == filters.type)
        }

        if (filters.module) {
            d = d.filter(el => el.module == "POO")
        }
        setDocuments(d);
        console.log(filters)

    }, [filters.module, filters.type, filters.title])


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
                data={documents}
                renderItem={({ item }) => <Course title={item.title} type={item.type} link={item.link} module={item.module} />}
                keyExtractor={(item) => item.id.toString()}
            />

            <FiltersComponentModal visible={filtersModalVisible} setIsVisible={setFiltersVisible} />
        </SafeAreaView>
    )
}

export default Favourites