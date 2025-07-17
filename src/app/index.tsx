import { Text, View, Button } from "react-native";

import { List } from "@/componentes/List";
import { HomeHeader } from "@/componentes/HomeHeader";
import { Target } from "@/componentes/Target";

export default function Index() {

    const Summary = {
        total: "R$ 2.680,00",
        input: { label: "Entradas", value: "R$ 6,184.90" },
        output: { label: "Saídas", value: "-R$ 883.65" },
        
    }
    const targets = [
        {
            id: "",
            current: "200",
            name: "O caba lá",
            percentage: "10",
            target: "10"
        }
    ]

    return (
        <View>
            <HomeHeader
                data={Summary}
            />
            
            <List
            data={targets}
            renderItem={({item}) => <Target data={item}/> }
            keyExtractor={(item) => item.id}
            title="Metas"
            emptyMessage="Nenhuma meta. Toque em nova meta para adicionar"
            containerStyle={{paddingHorizontal: 24}}
            />

        </View>
    )
}