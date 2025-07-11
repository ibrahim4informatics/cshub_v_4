import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'


type Props = {
    id:number,
    title: string
    module: string
    link: string,
    type: string

}
const Course: React.FC<Props> = ({ title, link, module, type,id }) => {

    const addToFavourites = ()=>{
        console.log("add doc id= " + id + " to favourite")
    }
    return (
        <View className='w-full my-2 bg-gray-800 px-2 py-4 rounded-md' style={{ elevation: 2, shadowColor: "#fff" }}>
            <View className='w-full flex-row items-center gap-2 my-1'>
                <Text className='text-white text-lg font-bold'>{title}</Text>

                <View className='bg-red-400 rounded-full px-4 py-2 my-1 ms-auto'><Text className='text-white font-bold text-center text-xs'>{module}</Text></View>
                <View className='bg-blue-400 rounded-full px-4 py-2 my-1 mr-1'><Text className='text-white font-bold text-center text-xs'>{type}</Text></View>
                <TouchableOpacity onPress={addToFavourites} className='p-2 rounded-md'><Ionicons name='star' size={20} color={"#99A1AF"} /></TouchableOpacity>
            </View>
            <TouchableOpacity className='my-2 bg-blue-600 rounded-md py-4'>
                <Text className='text-xl text-center font-bold text-white' onPress={() => {
                    console.log("download from " + link)
                }}>Download</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Course