import { AuthContext } from "@/contexts/AuthContext";
import useAuth from "@/hooks/useAuth";
import { Link } from "expo-router";
import { useContext } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  useAuth();
  const { isAuth } = useContext(AuthContext);
  return (
    <View className="flex-1 bg-gray-900">

      <SafeAreaView className="flex-1 p-4 justify-end">


        <Image className="w-full h-[250px] object-cover mt-auto mb-12" source={require("@/assets/images/welcome.png")} />
        <Text className="text-white font-extrabold text-4xl my-2 ">CSHUB</Text>
        <Text className="text-gray-500 font-bold my-2" style={{ lineHeight: 22 }}>
          Welcome to CSHub 📚
          Your ultimate companion for Computer Science resources.
          From beginner programming guides to advanced CS theory — access a growing library of curated PDFs, notes, and study materials tailored for university students.
        </Text><Text className="text-gray-500 font-bold" style={{ lineHeight: 22 }}>
          💾 Download • 📖 Read • 💡 Learn

          Start exploring your CS journey the smart way.
        </Text>



        <Link href={"/login"} asChild>
          <TouchableOpacity className="bg-blue-800 p-6 rounded-md my-4">
            <Text className="text-2xl font-bold text-white text-center">{isAuth ? "Get Started" : "Login"}</Text>
          </TouchableOpacity>
        </Link>


      </SafeAreaView>

    </View>
  );
}
