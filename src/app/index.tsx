import { Text, View, Button } from "react-native";
import { router } from "expo-router";

export default function Index() {
    return(
        <View>
            <Text>
                Hello world
            </Text>

            <Button
                  title='Target'
                  onPress={() => router.navigate("target")}
                  />
        </View>
    )
}