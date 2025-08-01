import { StyleSheet } from "react-native";

import { colors, fontFamily } from "@/theme";

export const styles = StyleSheet.create({
    container:{
        paddingVertical: 16,
        flexDirection: "row",
        alignItems: "center",
        gap: 7
    },
    info:{
        flex: 1,
        gap: 7
    
    },
    value:{
        fontSize: 14,
        fontFamily: fontFamily.medium,
        color: colors.black

    },
    desctiption:{
        fontSize: 12,
        fontFamily: fontFamily.regular,
        color: colors.gray[500]
    }
})