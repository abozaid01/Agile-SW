import db from '../database';

class AssignWorkDetailsModel {
    private id?: number;
    private assign_id: number;
    private work: number;

    constructor(assign_id = 0, work = 0) {
        this.assign_id = assign_id;
        this.work = work;
    }

    async create(assign_id: number, work: number): Promise<AssignWorkDetailsModel> {
        try {
            //opn connection
            const conn = await db.connect();
            const sql = `INSERT INTO assing_work_details (assign_id, work) values ($1, $2) RETURNING id, assign_id, work;`;

            //run query
            const result = await conn.query(sql, [
                assign_id,
                work
            ]);


            this.id = result.rows[0].id;
            //close connection
            conn.release();

            return result.rows[0];
        } catch (error) {
            throw new Error(
                `unable to Assign work with workID: ${work}
                }): ${(error as Error).message}`
            );
        }
    }    

    async Delete(id: number) : Promise<AssignWorkDetailsModel> {
        try {
            //opn connection
            const conn = await db.connect();
            // const sq1 = `UPDATE users SET isDeleted = 1 WHERE id=$2`;
            const sql = `DELETE FROM assing_work_details WHERE id= ($1) RETURNING id, user_id;`

            //run query
            const result = await conn.query(sql, [id]);

            //release connection
            conn.release();

            //return the deleted user
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `unable to delete AssignWorkDetails table ${
                    (error as Error).message
                }`
            );
        }
    }

    async getOne(assignWork: AssignWorkDetailsModel): Promise<AssignWorkDetailsModel> {
        try {
            //opn connection
            const conn = await db.connect();
            const sql = `SELECT * FROM assing_work_details WHERE id=$1`;

            //run query
            const result = await conn.query(sql, [assignWork.id]);

            //close connection
            conn.release();

            this.id = result.rows[0].id;
            //return all users
            return this;
        } catch (error) {
            throw new Error(
                `unable to get the requested user_id ${(error as Error).message}`
            );
        }
    }


    async getAll(): Promise<AssignWorkDetailsModel[]> {
        try {
            //opn connection
            const conn = await db.connect();
            const sql = `SELECT * FROM assing_work_details`;

            //run query
            const result = await conn.query(sql);

            //close connection
            conn.release();

            //return all users
            return result.rows;
        } catch (error) {
            throw new Error(
                `Unable to get assigned table ${(error as Error).message}`
            );
        }
    }
}

export default AssignWorkDetailsModel;
