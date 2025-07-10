import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { FiltersContext } from '@/contexts/FiltersContext';

const SearchBar = () => {
    const { setFilters , filters} = useContext(FiltersContext);
    const [title, setTitle] = useState(filters.title);

    return (
        <View className='flex-1 rounded-md flex-row bg-gray-800 mx-2 p-2 items-center gap-2'>
            <TextInput value={title} onChangeText={(value) => { setTitle(value) }} placeholder='Add Title.' className='bg-transparent h-full flex-1 text-white placeholder:text-gray-400' />
            <TouchableOpacity className='p-3 bg-blue-700 rounded-md' onPress={() => { setFilters((prev) => { return {...prev, title}})}}><Ionicons color={"#fff"} size={20} name='search' /></TouchableOpacity>
        </View >
    )
}

export default SearchBar