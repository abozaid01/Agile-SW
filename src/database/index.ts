import { Pool } from 'pg';
import config from '../config';

const pool = new Pool({
    host: 'dpg-chu58r7dvk4olivece50-a.oregon-postgres.render.com',
    database: 'agile_sw',
    user: 'agile_sw_user',
    password: 'T4PaLRpFz7X2sHT1hre2Xoyx8W0Xf0u2',
    port: 5432,
    ssl: true,
});

//Add Listener for the pool in case of any error happend
pool.on('error', (error: Error) => {
    console.log(error.message);
});

export default pool;
