import { Text, View, StatusBar } from "react-native";
import { router } from "expo-router";

import { List } from "@/componentes/List";
import { HomeHeader } from "@/componentes/HomeHeader";
import { Target } from "@/componentes/Target";
import { Button } from "@/componentes/Button";



    const Summary = {
        total: "R$ 2.680,00",
        input: { label: "Entradas", value: "R$ 6,184.90" },
        output: { label: "Saídas", value: "-R$ 883.65" },
        
    }
    const targets = [
        {
            id: "1",
            current: "200",
            name: "O caba lá",
            percentage: "10",
            target: "10"
        },
        {
            id: "2",
            current: "400",
            name: "O caba lá 2.0",
            percentage: "10",
            target: "10"
        }
    ]


export default function Index() {

    return (
        < View style={{ flex: 1, backgroundColor: "#fff" }}>
            <StatusBar 
            barStyle="light-content"
            />
            <HomeHeader
                data={Summary}
            />
            
            <List
            data={targets}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => <Target data={item} onPress={()=> router.navigate(`/in-progress/${item.id}`)} /> }
            title="Metas"
            emptyMessage="Nenhuma meta. Toque em nova meta para adicionar"
            containerStyle={{paddingHorizontal: 24}}
            />

                <View style={{padding:24, paddingBottom:32}}>
            <Button
            title="Nova meta"
            onPress={()=> router.navigate("/target")}
            isProcessing={false}
            
            />
            </View>

        </View>
    )
}