import db from '../database';

class WorkAttributesValuesModel {
    private id?: number;
    private workAttributes_id?: number;
    private assign_id?: number;
    private value?: string;

    constructor(workAttributes_id = 0, assign_id = 0, value = "null") {
      this.workAttributes_id = workAttributes_id;
      this.assign_id = assign_id;
      this.value = value;
    }

    GetWorkAttributesValuesID() {
        return this.id;
    }

    async create(workAttributes_id: number, assign_id: number, value: string): Promise<WorkAttributesValuesModel> {
        try {
            //opn connection
            const conn = await db.connect();
            const sql = `INSERT INTO workAttributesValues (workAttributes_id, assign_id, value) values ($1, $2, $3) RETURNING id, workAttributes_id, assign_id, value;`;

            //run query
            const result = await conn.query(sql, [
                workAttributes_id,
                assign_id,
                value
            ]);

            
            this.id = result.rows[0].id;
            this.workAttributes_id = result.rows[0].workAttributes_id;
            this.assign_id = result.rows[0].assign_id;
            this.value = result.rows[0].value;

            //close connection
            conn.release();

            return result.rows[0];
        } catch (error) {
            throw new Error(
                `unable to create workAttributesValues with workAttibutesID: ${workAttributes_id} and assignID ${assign_id}
                }): ${(error as Error).message}`
            );
        }
    }

    async GetValue(id: number): Promise<WorkAttributesValuesModel> {
      try {

        const conn = await db.connect();
        const sql = `SELECT value FROM workAttributesValues WHERE id=$1;`;

        const result = await conn.query(sql, [id]);

        conn.release();

        return result.rows[0];
      } catch (error) {
            throw new Error(
                `unable to get attrbutes value with id: ${id}
                }): ${(error as Error).message}`
            );
        }
    }

    async getOne(workAttributeValue: WorkAttributesValuesModel): Promise<WorkAttributesValuesModel> {
        try {
            //opn connection
            const conn = await db.connect();
            const sql = `SELECT workAttributes_id, assign_id, value FROM workAttributesValues WHERE id=$1`;

            //run query
            const result = await conn.query(sql, [workAttributeValue.id]);

            //close connection
            conn.release();

            this.workAttributes_id = result.rows[0].workAttributes_id;
            this.assign_id = result.rows[0].assign_id;
            this.value = result.rows[0].value;
            //return all users
            return this;
        } catch (error) {
            throw new Error(
                `unable to get the requested workAttributesValue ${(error as Error).message}`
            );
        }
    }

    async getAll(): Promise<WorkAttributesValuesModel[]> {
        try {
            //opn connection
            const conn = await db.connect();
            const sql = `SELECT * FROM workAttributesValues`;

            //run query
            const result = await conn.query(sql);

            //close connection
            conn.release();

            //return all users
            return result.rows;
        } catch (error) {
            throw new Error(
                `Unable to get workAttributesValues table ${(error as Error).message}`
            );
        }
    }

    async deleteAssign(id: number): Promise<WorkAttributesValuesModel> {
        try {
            //opn connection
            const conn = await db.connect();
            // const sq1 = `UPDATE users SET isDeleted = 1 WHERE id=$2`;
            const sql = `DELETE FROM workAttributesValues WHERE id= ($1) RETURNING id, WorkAttribites_id, assign_id, value`;

            //run query
            const result = await conn.query(sql, [id]);

            //release connection
            conn.release();

            //return the deleted user
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `unable to delete attributes table with id: ${id}  ${
                    (error as Error).message
                }`
            );
        }
    }

}

export default WorkAttributesValuesModel;
