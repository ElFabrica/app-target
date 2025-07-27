import { View } from "react-native";

import { styles } from "./styles";
import { colors } from "@/theme";

import { Option } from "./option";
import { TransactionTypes } from "@/urils/TransactionTypes";

type Props ={
    selected: TransactionTypes,
    onChange: (type: TransactionTypes) => void 
}

export function TransactionType( { selected, onChange,}: Props){
    return(
        <View style={styles.container}>
            <Option
            icon="arrow-upward"
            title={"Guardar"}
            isSelecten ={ selected ===TransactionTypes.Input }
            selectecColor={colors.blue[500]}
            onPress={() => onChange(TransactionTypes.Input) }
            />
            <Option
            icon="arrow-downward"
            title={"Resgatar"}
            isSelecten ={ selected ===TransactionTypes.Output}
            selectecColor={colors.red[400]}
            onPress={() => onChange(TransactionTypes.Output) }
            />
        </View>
    )
}