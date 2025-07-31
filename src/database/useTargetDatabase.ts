import { useSQLiteContext } from "expo-sqlite"

export type TargetCreate = {
    name: string,
    amount: number
}
export type TaragetResponse ={
    id: number,
    name: string,
    amount: number,
    current: number,
    percentage: number,
    created_at: Date,
    updated_at: Date
}

export function useTargetDatabase(){
    const database = useSQLiteContext()
    async function create(data: TargetCreate){
        const statement = await database.prepareAsync("INSERT INTO targets (name, amount) VALUES ($name, $amount)")
        statement.executeAsync({
            $name:  data.name,
            $amount: data.amount
        })
    }
    function listBySavedValue(){
        return database.getAllAsync<TaragetResponse>(`
            SELECT
                targets.id,
                target.name,
                targets.amount,
                COALESCE (SUM (transactions.amount), 0) AS current,
                COALESCE ((SUM (transactions.amount)/targets.amount)*100, 0) AS percentage

            FROM targets
            LEFT JOIN transactions ON targets.id = transactions_target.id
            GROUP BY targets.id, target.name, targets.amount
            ORDER BY current DESC 
            
            `)
    }
    return{
        create,
        listBySavedValue
    }
}