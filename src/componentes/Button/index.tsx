import { TouchableOpacity, TouchableOpacityProps, Text, ActivityIndicator } from "react-native";

import { styles } from "./styles";
import { colors } from "@/theme";

type props  = TouchableOpacityProps & {
        title: string,
        isProcessing?: boolean
}

export function Button ({title, isProcessing = false, ...rest}:props) {
    return(
        <TouchableOpacity 
        style={styles.container}
         {...rest}
         activeOpacity={0.8}
         disabled={isProcessing}
         >
            <Text style={styles.title}><blockquote></blockquote>
                {isProcessing ? (<ActivityIndicator size ="small" color={colors.white}/>) : (title)}

            </Text>
        </TouchableOpacity>
    )
}