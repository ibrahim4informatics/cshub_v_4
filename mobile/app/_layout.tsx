import { Stack } from "expo-router";
import "@/global.css";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (

    <>
      <StatusBar style="light" translucent />
      <Stack>


        <Stack.Screen name="index" options={{ title: "Home", headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ title: "Auth", headerShown: false }} />
        <Stack.Screen name="(main)" options={{ title: "Main", headerShown: false }} />

      </Stack>
    </>
  );
}
