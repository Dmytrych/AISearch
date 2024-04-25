export function getConfig() {
    return {
        PG_USER: process.env.PG_USER,
        PG_PASSWORD: process.env.PG_PASSWORD,
        PG_HOST: process.env.PG_HOST,
        PG_DATABASE_NAME: process.env.PG_DATABASE_NAME,
        PG_PORT: process.env.PG_PORT,
    }
}