import db from '../database';

class WorkModel {
    private id?: number;
    private location: string;
    private estimated_time: string;
    private work_info: string;

    constructor(
        location = 'null',
        estimated_time = 'null',
        work_info = 'null'
    ) {
        this.location = location;
        this.estimated_time = estimated_time;
        this.work_info = work_info;
    }

    //CREATE
    async create(work: WorkModel): Promise<WorkModel> {
        try {
            //opn connection
            const conn = await db.connect();
            const sql = `INSERT INTO work (location, estimated_time, work_info) values ($1, $2, $3) RETURNING location, estimated_time, work_info, id`;

            //run query
            const result = await conn.query(sql, [
                work.location,
                work.estimated_time,
                work.work_info,
            ]);

            //close connection
            conn.release();

            //return created work
            this.id = work.id;
            this.location = work.location;
            this.estimated_time = work.estimated_time;
            this.work_info = work.work_info;
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `unable to create work: ${work.work_info}
                }): ${(error as Error).message}`
            );
        }
    }

    //READ
    async getAll(): Promise<WorkModel[]> {
        try {
            //opn connection
            const conn = await db.connect();
            const sql = `SELECT id ,name from work`;

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
            const sql = `SELECT id ,location, estimated_time, work_info FROM work WHERE id=($1)`;

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

    //UPDATE
    async updateWork(work: WorkModel): Promise<WorkModel> {
        try {
            const conn = await db.connect();
            const sql = `UPDATE work SET location=$1, estimated_time=$2, work_info=$3 WHERE id=$4 RETURNING id, location, estimated_time, work_info`;

            //run query
            const result = await conn.query(sql, [
                work.location,
                work.estimated_time,
                work.work_info,
                work.id,
            ]);

            //release connection
            conn.release();

            //return the updated user
            this.location = work.location;
            this.estimated_time = work.estimated_time;
            this.work_info = work.work_info;
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `unable to update the requested work : ${
                    (error as Error).message
                }`
            );
        }
    }

    //DELETE
    async deleteWork(id: number): Promise<WorkModel> {
        try {
            //opn connection
            const conn = await db.connect();
            const sql = `DELETE FROM work WHERE id= ($1) RETURNING id, location, estimated_time, work_info`;

            //run query
            const result = await conn.query(sql, [id]);

            //release connection
            conn.release();

            //return the deleted work
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `unable to delete the requested work ${id}  ${
                    (error as Error).message
                }`
            );
        }
    }
}

export default WorkModel;
