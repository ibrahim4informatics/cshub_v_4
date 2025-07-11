import { AuthContext } from "@/contexts/AuthContext";
import { checkAuth } from "@/services/authService";
import { router } from "expo-router";
import { useContext, useEffect } from "react"


export default () => {
    const { setIsAuth, setIsLoaded } = useContext(AuthContext);
    useEffect(() => {
        setIsLoaded(false);
        checkAuth().then(() => { setIsAuth(true); setIsLoaded(true) }).catch(() => { setIsAuth(false); setIsLoaded(true); router.replace("/(auth)/login") })
    }, []);

    return null;

}