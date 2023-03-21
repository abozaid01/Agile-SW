import { Pool } from 'pg';
import config from '../config';

const pool = new Pool({
    host: config.host,
    database: config.databse,
    user: config.user,
    password: config.password,
    port: parseInt(config.dbPort as string, 10),
});

//Add Listener for the pool in case of any error happend
pool.on('error', (error: Error) => {
    console.log(error.message);
});

export default pool;
