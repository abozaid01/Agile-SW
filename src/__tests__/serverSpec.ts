import supertest from 'supertest';
import app from '../server';
import config from '../config';

const request = supertest(app);

describe('test basic endpoint', () => {
    it('Get the endpoint /', async () => {
        const response = await request.get('/');
        expect(response.status).toBe(200);
    });
});

import { Pool } from 'pg';

// Describe the test suite
describe('Postgres Pool Connection Test', () => {
    let pool: Pool;

    beforeAll(() => {
        pool = new Pool({
            user: config.user,
            host: config.host,
            database: config.databse,
            password: config.password,
            port: parseInt(config.dbPort as string, 10),
        });
    });

    afterAll(async () => {
        await pool.end();
    });

    it('should connect to the Postgres database', async () => {
        const client = await pool.connect();
        const res = await client.query('SELECT NOW()');
        expect(res.rows[0].now instanceof Date).toBe(true);
        client.release();
    });
});
