import mysql from "serverless-mysql"

export type mysqlConfig = {
    host: string | undefined
    port: number | undefined
    database: string | undefined
    user: string | undefined
    password: string | undefined
}

export interface Table {
    [key: string]: string | null
}

export const db = mysql({
    config: {
        host: process.env.NEXT_PUBLIC_DB_HOST,
        port: process.env.NEXT_PUBLIC_DB_PORT,
        database: process.env.NEXT_PUBLIC_DB_DATABASE,
        user: process.env.NEXT_PUBLIC_DB_USER,
        password: process.env.NEXT_PUBLIC_DB_PWD,
    } as mysqlConfig,
})

export const ps_db = mysql({
	config: {
		host: process.env.NEXT_PUBLIC_DB_HOST,
		port: process.env.NEXT_PUBLIC_DB_PORT,
		database: process.env.NEXT_PUBLIC_PSDB_DATABASE,
		user: process.env.NEXT_PUBLIC_PSDB_USER,
		password: process.env.NEXT_PUBLIC_PSDB_PWD,
	} as mysqlConfig,	
})

export async function executeQuery({
    query,
    values,
}: {
    query: string
    values: Table[] | any
}) {
    try {
        console.log(query, values)
        const results = await db.query(query, values)
        await db.end()
        return results
    } catch (error) {
        return { error }
    }
}

export async function executePSQuery({
    query,
    values,
}: {
    query: string
    values: Table[] | any
}) {
    try {
        const results = await ps_db.query(query, values)
        await ps_db.end()
        return results
    } catch (error) {
        return { error }
    }
}
