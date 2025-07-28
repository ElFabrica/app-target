import { Suspense } from "react";

import { Stack } from "expo-router";
import {
    useFonts,
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold
} from "@expo-google-fonts/inter"

import { SQLiteProvider } from "expo-sqlite"

import { migrate } from "@/database/migrate";

import { Loading } from "@/componentes/Loading";
import { colors } from "@/theme";


export default function Layout() {

    const [fontsLoades] = useFonts({
        Inter_400Regular,
        Inter_500Medium,
        Inter_700Bold
    })

    if (!fontsLoades) {
        return <Loading />
    }

    return (
        <Suspense fallback={<Loading />}>
        <SQLiteProvider
        databaseName="target.db"
        onInit={migrate}
        useSuspense
        >
            <Stack screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: colors.white }
                }}>
            </Stack>
        </SQLiteProvider>
        </Suspense>
    )

}