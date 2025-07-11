import React, { useEffect, useState } from "react";


type AuthContextType = {
    isLoaded: boolean,
    isAuth: boolean,
    setIsAuth: React.Dispatch<React.SetStateAction<boolean>>,
    setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>,
}

export const AuthContext = React.createContext<AuthContextType>({ isAuth: false, isLoaded: false, setIsAuth: () => { }, setIsLoaded: () => { } });


type AuthProvderProps = {
    children: React.ReactNode
}
const AuthProvider: React.FC<AuthProvderProps> = ({ children }) => {
    const [isLoaded, setIsLoaded] = useState(true);
    const [isAuth, setIsAuth] = useState(false)


    useEffect(() => { }, [])
    return (
        <AuthContext.Provider value={{ setIsAuth, setIsLoaded, isAuth, isLoaded }}>
            {children}
        </AuthContext.Provider>
    );
}


export default AuthProvider;