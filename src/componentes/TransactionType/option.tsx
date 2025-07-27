import { ColorValue, PressableProps, Pressable, Text } from "react-native";
import {MaterialIcons} from "@expo/vector-icons"

import { styles } from "./styles";
import { colors } from "@/theme";

type Props = PressableProps & {
    isSelecten: boolean
    title: string,
    icon: keyof typeof MaterialIcons.glyphMap
    selectecColor: ColorValue
}

export function Option({
    isSelecten,
    title,
    icon,
    selectecColor, 
    ...rest
}
    : Props){
        return(
        <Pressable style={[styles.option, isSelecten && {backgroundColor: selectecColor}]}
        {...rest}>
            <MaterialIcons name={icon} size={24} color={isSelecten? colors.white : colors.gray[500]}/>

            <Text style={[styles.title, isSelecten && {color: colors.white}]}>
                {title}
            </Text>
        </Pressable>
        )
}