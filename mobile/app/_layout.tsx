import { Stack } from "expo-router";
import "@/global.css";
import { StatusBar } from "expo-status-bar";
import AuthProvider from "@/contexts/AuthContext";

export default function RootLayout() {
  return (

    <AuthProvider>
      <StatusBar style="light" translucent />
      <Stack>


        <Stack.Screen name="index" options={{ title: "Home", headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ title: "Auth", headerShown: false }} />
        <Stack.Screen name="(main)" options={{ title: "Main", headerShown: false }} />

      </Stack>
    </AuthProvider>
  );
}
