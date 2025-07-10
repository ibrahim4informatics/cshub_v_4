import { View, Text, FlatList, TextInput, TouchableOpacity, Modal } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Course from '@/components/ui/Course';
import { Picker } from "@react-native-picker/picker"
import { Ionicons } from '@expo/vector-icons';
import modules from '@/fake/modules';

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


type FilterModalComponentProps = {
    visible: boolean,
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}
const FilterModalComponent: React.FC<FilterModalComponentProps> = ({ visible, setIsVisible }) => {
    const [filters, setFilters] = useState({ type: "", module: 0 });
    return (
        <Modal className='flex-1' animationType='slide' transparent visible={visible} onRequestClose={() => { setIsVisible(false) }}>

            <View className='flex-1 bg-[rgba(0,0,0,.6)] justify-end'>
                <View className='bg-gray-800 p-4 rounded-t-xl'>
                    <Text className='text-white text-2xl font-bold text-center my-2'>Filter</Text>

                    <Picker style={{ color: "#fff", backgroundColor: "#101828", marginVertical: 12 }} dropdownIconColor={"#fff"} onValueChange={(val) => setFilters({ ...filters, type: val })} selectedValue={filters.type} >
                        <Picker.Item label='All' value={""} />
                        <Picker.Item label='Cours' value={"COURS"} />
                        <Picker.Item label='Exam' value={"EXAM"} />
                        <Picker.Item label='Td' value={"TD"} />
                        <Picker.Item label='Tp' value={"TP"} />

                    </Picker>




                    <Picker style={{ color: "#fff", backgroundColor: "#101828", marginVertical: 12 }} dropdownIconColor={"#fff"} onValueChange={(val) => setFilters({ ...filters, module: parseInt(val) })} selectedValue={filters.type} >
                        <Picker.Item label='All' value={0} />
                        {modules.map(module => <Picker.Item key={module.id} label={module.name} value={module.id} />)}

                    </Picker>




                    <TouchableOpacity onPress={() => { console.log("fetch new docs"); setIsVisible(false) }} className=' bg-blue-700 justify-center items-center px-6 py-4 rounded-md my-2'><Text className='text-lg text-white font-semibold'>Save</Text></TouchableOpacity>
                </View>
            </View>


        </Modal>
    )
}

const Favourites = () => {

    const [filtersModalVisible, setFiltersVisible] = useState(false);
    return (
        <SafeAreaView className='flex-1 bg-gray-900'>

            <Text className='text-center text-3xl font-extrabold text-white my-4'>Favourites</Text>
            <FlatList
                ListHeaderComponent={() => (
                    <View className='w-full my-2 flex-row items-center gap-2'>

                        <View className='flex-1 rounded-md flex-row bg-gray-800 mx-2 p-2 items-center gap-2'>
                            <TextInput placeholder='Add Title.' className='bg-transparent h-full flex-1 text-white placeholder:text-gray-400' />
                            <TouchableOpacity className='p-2'><Ionicons color={"#fff"} size={20} name='search' /></TouchableOpacity>
                        </View>

                        <TouchableOpacity onPress={() => setFiltersVisible(true)} className='p-4 mr-2 rounded-md bg-blue-700 items-center justify-center'><Ionicons color={"#fff"} size={20} name='filter' /></TouchableOpacity>

                    </View>
                )}
                data={DATA}
                renderItem={({ item }) => <Course title={item.title} type={item.type} link={item.link} module={item.module} />}
                keyExtractor={(item) => item.id.toString()}
            />

            <FilterModalComponent visible={filtersModalVisible} setIsVisible={setFiltersVisible} />
        </SafeAreaView>
    )
}

export default Favourites