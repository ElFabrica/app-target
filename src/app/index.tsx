import { Text, View, Button } from "react-native";
import { router } from "expo-router";

import { List } from "@/componentes/List";
import { HomeHeader } from "@/componentes/HomeHeader";
import { Target } from "@/componentes/Target";
import { Buttom } from "@/componentes/Buttom";

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
            renderItem={({item}) => <Target data={item} onPress={()=> router.navigate(`/in-progress/${item.id}`)} /> }
            keyExtractor={(item) => item.id}
            title="Metas"
            emptyMessage="Nenhuma meta. Toque em nova meta para adicionar"
            containerStyle={{paddingHorizontal: 24}}
            />

                <View style={{padding:24, paddingBottom:32}}>
            <Buttom
            title="Nova meta"
            onPress={()=> router.navigate("/target")}
            />
            </View>

        </View>
    )
}