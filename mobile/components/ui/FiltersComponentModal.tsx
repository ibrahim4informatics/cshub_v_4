import { View, Text, Modal, TouchableOpacity, Alert } from 'react-native'
import React, { useCallback, useContext, useEffect, useLayoutEffect, useState } from 'react'
import { Picker } from '@react-native-picker/picker';


type Module = {
    id: number,
    name: string,
    coeficient: number
}


import { FiltersContext } from '@/contexts/FiltersContext';
import { getAllModules } from '@/services/documentsService';
type FilterModalComponentProps = {
    visible: boolean,
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}
const FiltersComponentModal: React.FC<FilterModalComponentProps> = ({ visible, setIsVisible }) => {
    const { filters, setFilters } = useContext(FiltersContext);

    const [modules, setModules] = useState<Module[]>([]);

    useEffect(() => {

        getAllModules().then(
            res => setModules(res.data.modules)
        )

        .catch(err => {
            Alert.alert("Error Fetching Modules", "Check you internet Connection")
        })

        return () => {
            setModules([]);
        }

    }, []);
    return (
        <Modal className='flex-1' animationType='slide' transparent visible={visible} onRequestClose={() => { setIsVisible(false) }}>
            <View className='flex-1 bg-[rgba(0,0,0,.6)] justify-end'>
                <View className='bg-gray-800 p-4 rounded-t-xl'>
                    <Text className='text-white text-2xl font-bold text-center my-2'>Filter</Text>
                    <Picker style={{ color: "#fff", backgroundColor: "#101828", marginVertical: 12 }} dropdownIconColor={"#fff"} onValueChange={(val) => setFilters({ ...filters, type: val })} selectedValue={filters.type} >
                        <Picker.Item label='All Types' value={""} />
                        <Picker.Item label='Cours' value={"COURS"} />
                        <Picker.Item label='Exam' value={"EXAM"} />
                        <Picker.Item label='Td' value={"TD"} />
                        <Picker.Item label='Tp' value={"TP"} />

                    </Picker>
                    <Picker style={{ color: "#fff", backgroundColor: "#101828", marginVertical: 12 }} dropdownIconColor={"#fff"} onValueChange={(val) => setFilters({ ...filters, module_id: parseInt(val) })} selectedValue={filters.type} >
                        <Picker.Item label='All Modules' value={0} />
                        {modules.map(module => <Picker.Item key={module.id} label={module.name} value={module.id} />)}
                    </Picker>
                    <TouchableOpacity onPress={() => { setIsVisible(false) }} className=' bg-blue-700 justify-center items-center px-6 py-4 rounded-md my-2'><Text className='text-lg text-white font-semibold'>Save</Text></TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default FiltersComponentModal