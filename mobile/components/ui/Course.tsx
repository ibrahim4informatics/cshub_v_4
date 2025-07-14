import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import * as Linking from "expo-linking";
import { addTofavourites, removeFromFavourites } from '@/services/documentsService';
import { router } from 'expo-router';



type Document = {
    id: number;
    title: string;
    module: { [key: string]: any };
    type: string;
    download_link: string;
    is_favourite: boolean
}


type Favourite = {
    id: number;
    document: { [key: string]: any }
}

type Props = {
    id: number,
    title: string
    module: string
    link: string,
    type: string,
    is_favourite: boolean,
    index: number,
    setData?: React.Dispatch<React.SetStateAction<{
        documents: Document[], meta_data: { [key: string]: any }
    }>>,
    data?: {
        documents: Document[], meta_data: { [key: string]: any }
    }

}
const Course: React.FC<Props> = ({ title, link, module, type, id, is_favourite, index, data, setData}) => {

    const addFavourite = async () => {

        try {


            const status = await addTofavourites(id)
            if (status === 201) {
                if (setData && data) {
                    setData({
                        ...data, documents: data?.documents.map(doc => {
                            if (doc.id === id) {
                                doc.is_favourite = true
                            }
                            return doc
                        })
                    })
                }
                // router.push("/(main)/favourites");
            }

        }
        catch (err) {
            console.log(err)
        }
    }

    const removeFavourite = async () => {
        try {

            const status = await removeFromFavourites(id);
            console.log(status)
            if (status === 200) {
                if (setData && data) {
                    setData({
                        ...data, documents: data?.documents.map(doc => {
                            if (doc.id === id) {
                                doc.is_favourite = false
                            }
                            return doc
                        })
                    })

                }


                return router.push("/(main)");

            }
        }
        catch (err) {
            console.log(err)
        }
    }

    const openGoogleDriveDocument = async () => {
        try {
            await Linking.openURL(link);

        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <View className='w-full my-2 bg-gray-800 px-2 py-4 rounded-md' style={{ elevation: 2, shadowColor: "#fff" }}>
            <View className='w-full flex-row items-center gap-2 my-1 flex-wrap'>
                <TouchableOpacity onPress={() => is_favourite ? removeFavourite() : addFavourite()} className='p-2 rounded-md'><Ionicons name='star' size={20} color={is_favourite ? "#FFB900" : "#99A1AF"} /></TouchableOpacity>
                <Text className='text-white text-lg font-bold'>{index + ". " + title}</Text>

                <View className='bg-red-400 rounded-full px-4 py-2 my-1 ms-auto'><Text className='text-white font-bold text-center text-xs'>{module}</Text></View>
                <View className='bg-blue-400 rounded-full px-4 py-2 my-1 mr-1'><Text className='text-white font-bold text-center text-xs'>{type}</Text></View>
            </View>
            <TouchableOpacity className='my-4 bg-blue-600 rounded-md py-4'>
                <Text className='text-xl text-center font-bold text-white' onPress={openGoogleDriveDocument}>Open</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Course