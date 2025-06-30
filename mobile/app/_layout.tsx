import { Stack } from "expo-router";
import "@/global.css";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (

      <Stack>

        <Stack.Screen name="index" options={{ title: "Home", headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ title: "Auth", headerShown: false }} />
     
    </Stack>
  );
}
