import db from '../database';

class WorkAttributesModel {
    private id?: number;
    private work_id: number;
    private attributes_id: number;

    constructor(work_id = 0, attributes_id = 0) {
        this.work_id = work_id;
        this.attributes_id = attributes_id;
    }

    GetID() {
        return this.id;
    }

    async create(work_id: number, attributes_id: number): Promise<WorkAttributesModel> {
        try {
            //opn connection
            const conn = await db.connect();
            const sql = `INSERT INTO workAttributes (work_id, attributes_id) values ($1, $2) RETURNING id, work_id, attributes_id;`;

            //run query
            const result = await conn.query(sql, [
                work_id,
                attributes_id
            ]);


            this.id = result.rows[0].id;
            //close connection
            conn.release();

            return result.rows[0];
        } catch (error) {
            throw new Error(
                `unable to connect work with attributes
                }): ${(error as Error).message}`
            );
        }
    }    

    async Delete(id: number) : Promise<WorkAttributesModel> {
        try {
            //opn connection
            const conn = await db.connect();
            // const sq1 = `UPDATE users SET isDeleted = 1 WHERE id=$2`;
            const sql = `DELETE FROM workAttributes WHERE id= ($1) RETURNING id, work_id, attributes_id;`;

            //run query
            const result = await conn.query(sql, [id]);

            //release connection
            conn.release();

            //return the deleted user
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `unable to delete workAttrbutes row with id: ${id} ${
                    (error as Error).message
                }`
            );
        }
    }

    async getOne(workAttrbutes: WorkAttributesModel): Promise<WorkAttributesModel> {
        try {
            //opn connection
            const conn = await db.connect();
            const sql = `SELECT id, work_id, attributes_id FROM workAttributes WHERE id=$1`;

            //run query
            const result = await conn.query(sql, [workAttrbutes.id]);

            //close connection
            conn.release();

            this.id = result.rows[0].id;
            //return all users
            return this;
        } catch (error) {
            throw new Error(
                `unable to get the requested workAttribute ${(error as Error).message}`
            );
        }
    }


    async getAll(): Promise<WorkAttributesModel[]> {
        try {
            //opn connection
            const conn = await db.connect();
            const sql = `SELECT * FROM workAttributes`;

            //run query
            const result = await conn.query(sql);

            //close connection
            conn.release();

            //return all users
            return result.rows;
        } catch (error) {
            throw new Error(
                `Unable to get workAttributes table ${(error as Error).message}`
            );
        }
    }

    async GetWorkID(id: number):  Promise<WorkAttributesModel> {
      try {
        //opn connection
        const conn = await db.connect();
        const sql = `SELECT work_id FROM workAttributes WHERE id=$s1`;

        //run query
        const result = await conn.query(sql, [id]);

        //close connection
        conn.release();

        //return all users
        return result.rows[0];

      } catch (error) {
          throw new Error(
              `Unable to get workID of workAttributes id: ${id} ${(error as Error).message}`
          );
      }      
    }

    async GetAttributesID(id: number):  Promise<WorkAttributesModel> {
      try {
        //opn connection
        const conn = await db.connect();
        const sql = `SELECT attributes_id FROM workAttributes WHERE id=$s1`;

        //run query
        const result = await conn.query(sql, [id]);

        //close connection
        conn.release();

        //return all users
        return result.rows[0];

      } catch (error) {
          throw new Error(
              `Unable to get attributesID of workAttributes id: ${id} ${(error as Error).message}`
          );
      }      
    }
}

export default WorkAttributesModel;
