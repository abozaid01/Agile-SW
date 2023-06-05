import db from '../database';

class WorkModel {
    private id?: number;
    private name?: string;
    private created_at?: string;
    private update_at?: string;
    private isDeleted?: boolean;


    constructor(
        name = 'null',
        created_at = 'null',
        update_at = 'null',
        isDeleted = false
    ) {
        this.name = name;
        this.created_at = created_at;
        this.update_at = update_at;
        this.isDeleted = isDeleted;
    }

    //CREATE
    async create(work: WorkModel): Promise<WorkModel> {
        try {
            //opn connection
            const conn = await db.connect();
            const sql = `INSERT INTO work (name, created_at, updated_at, isDeleted) values ($1, $2, $3, false) RETURNING name, created_at, updated_at, isDeleted, id;`;

            //run query
            const result = await conn.query(sql, [
                work.name,
                work.created_at,
                work.update_at
            ]);

            //close connection
            conn.release();

            //return created work
            this.id = work.id;
            this.name = work.name;
            this.created_at = work.created_at;
            this.update_at = work.update_at;
            this.isDeleted = work.isDeleted;
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `unable to create work: ${work.name}
                }): ${(error as Error).message}`
            );
        }
    }

        //DELETE
    async deleteWork(id: number): Promise<WorkModel> {
        try {
            //opn connection
            const conn = await db.connect();
            const sql = `UPDATE work set isDeleted=false where id=$1`;

            //run query
            const result = await conn.query(sql, [id]);

            //release connection
            conn.release();

            //return the deleted work
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `unable to delete the requested work with id: ${id}  ${
                    (error as Error).message
                }`
            );
        }
    }

    //READ
    async getAll(): Promise<WorkModel[]> {
        try {
            //opn connection
            const conn = await db.connect();
            const sql = `SELECT id ,name, isDeleted from work`;

            //run query
            const result = await conn.query(sql);

            //close connection
            conn.release();

            //return all users
            return result.rows;
        } catch (error) {
            throw new Error(
                `unable to get the requested work ${(error as Error).message}`
            );
        }
    }

    //Read one
    async getOne(id: number): Promise<WorkModel> {
        try {
            //opn connection
            const conn = await db.connect();
            const sql = `SELECT id ,name, created_at, isDeleted FROM work WHERE id=($1)`;

            //run query
            const result = await conn.query(sql, [id]);

            //close connection
            conn.release();

            //return specific work
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `unable to get the requested work ${id}  ${
                    (error as Error).message
                }`
            );
        }
    }
    
    async GetWorkName(id: number): Promise<WorkModel> {
        try {
            //opn connection
            const conn = await db.connect();
            const sql = `SELECT name FROM work WHERE id=($1)`;

            //run query
            const result = await conn.query(sql, [id]);

            //close connection
            conn.release();

            //return specific work
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `unable to get the requested work name of workID: ${id}  ${
                    (error as Error).message
                }`
            );
        }
    }
}

export default WorkModel;
