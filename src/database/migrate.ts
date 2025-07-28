import { type SQLiteDatabase } from "expo-sqlite"

export async function migrate(database: SQLiteDatabase) {
    await database.execAsync(`
        PRAGMA foreign_keys = ON;

        CREATE TABLE IF NOT EXISTS targets(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            amount FLOAT NOT NULL,
            created_at timestamp NOT NULL DEFAULT current_timestemp,
            updated_at timestamp NOT NULL DEFAULT current_timestemp
            );
        
        CREATE TABLE IF NOT EXISTS transactions(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            target_id INTEGER NOT NULL,
            amount FLOAT NOT NULL,
            observation TEXT NULL,
            created_at timestamp NOT NULL DEFAULT current_timestemp,
            updated_at timestamp NOT NULL DEFAULT current_timestemp,

            CONSTRAINT fk_targets_transactions
            FOREIGN KEY (target_id) REFERENCE targets(id)
            ON DELETE CASCADE


        )
        `)
}