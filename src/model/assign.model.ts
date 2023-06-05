import db from '../database';

class AssignModel {
    private id?: number;
    private user_id?: number;

    constructor(user_id = 0) {
        this.user_id = user_id;
    }

    getAssignID() {
        return this.id;
    }


    async GetAssignIDFromUser(user_id: number): Promise<number> {
        try {
            //opn connection
            const conn = await db.connect();
            const sql = `SELECT id FROM assign WHERE user_id=$1 RETURNING id, user_id;`;

            //run query
            const result = await conn.query(sql, [
                user_id
            ]);

            
            //close connection
            conn.release();

            return result.rows[0].id;
        } catch (error) {
            throw new Error(
                `unable to create assign row with userID: ${user_id}
                }): ${(error as Error).message}`
            );
        }
    }
    async create(user_id: number): Promise<AssignModel> {
        try {
            //opn connection
            const conn = await db.connect();
            const sql = `INSERT INTO assign (user_id) values ($1) RETURNING id, user_id;`;

            //run query
            const result = await conn.query(sql, [
                user_id
            ]);

            
            this.id = result.rows[0].id;

            //close connection
            conn.release();

            return result.rows[0];
        } catch (error) {
            throw new Error(
                `unable to create assign row with userID: ${user_id}
                }): ${(error as Error).message}`
            );
        }
    }

    async getOne(assign: AssignModel): Promise<AssignModel> {
        try {
            //opn connection
            const conn = await db.connect();
            const sql = `SELECT user_id FROM assign WHERE id=$1`;

            //run query
            const result = await conn.query(sql, [assign.id]);

            //close connection
            conn.release();

            this.user_id = result.rows[0].user_id;
            //return all users
            return this;
        } catch (error) {
            throw new Error(
                `unable to get the requested user_id ${(error as Error).message}`
            );
        }
    }

    async getAll(): Promise<AssignModel[]> {
        try {
            //opn connection
            const conn = await db.connect();
            const sql = `SELECT * FROM assign`;

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

    async deleteAssign(id: number): Promise<AssignModel> {
        try {
            //opn connection
            const conn = await db.connect();
            // const sq1 = `UPDATE users SET isDeleted = 1 WHERE id=$2`;
            const sql = `DELETE FROM assign WHERE id= ($1) RETURNING id, user_id`;

            //run query
            const result = await conn.query(sql, [id]);

            //release connection
            conn.release();

            //return the deleted user
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `unable to delete assgined table with id: ${id}  ${
                    (error as Error).message
                }`
            );
        }
    }

}

export default AssignModel;
