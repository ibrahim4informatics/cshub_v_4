import React from "react"
import { Pressable, TouchableOpacity } from "react-native"

type Props = {
    children: React.ReactNode,
    containerStyles: string
}


const Button: React.FC<Props> = ({ children, containerStyles }) => {
    return (
        <TouchableOpacity className={`${containerStyles}`}>{children}</TouchableOpacity>
    )
}