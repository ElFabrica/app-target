import { Text, View, Button } from "react-native";
import { router } from "expo-router";
import { HomeHeader } from "@/componentes/HomeHeader";

export default function Index() {
    return(
        <View>
            <HomeHeader/>
        </View>
    )
}