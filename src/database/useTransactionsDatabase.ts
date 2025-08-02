import { useSQLiteContext } from "expo-sqlite";

export type TransactionsCreate ={
    target_id: number,
    amount: number,
    observation?: string
}


export function useTransactionsDatabase(){
    const database = useSQLiteContext()

    async function create(data: TransactionsCreate) {
        const stateman = await database.prepareAsync(`
            INSERT INTO transactions
            (target_id, amount, observation) 
            VALUES
            ($target_id, $amount, $observation)
            `)
            stateman.executeAsync({
                $target_id: data.target_id,
                $amount: data.amount,
                $observation: data.observation

            })
    }
    return{
        create
    }
}