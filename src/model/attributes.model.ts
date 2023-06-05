import db from '../database';

class AttributesModel {
    private id?: number;
    private nameOfAttr?: string;
    private typeofAttr?: string;

    constructor(nameOfAttr = 'null', typeofAttr = 'null') {
      this.nameOfAttr = nameOfAttr;
      this.typeofAttr = typeofAttr;
    }

    getAttributesID() {
        return this.id;
    }

    async create(nameOfAttr: string, typeofAttr: string): Promise<AttributesModel> {
        try {
            //opn connection
            const conn = await db.connect();
            const sql = `INSERT INTO assign (nameOfAttr, typeofAttr) values ($1, $2) RETURNING id, nameOfAttr, typeofAttr;`;

            //run query
            const result = await conn.query(sql, [
                nameOfAttr,
                typeofAttr
            ]);

            
            this.id = result.rows[0].id;
            this.id = result.rows[0].nameOfAttr;
            this.id = result.rows[0].typeofAttr;

            //close connection
            conn.release();

            return result.rows[0];
        } catch (error) {
            throw new Error(
                `unable to create attrbutes of name: ${nameOfAttr}
                }): ${(error as Error).message}`
            );
        }
    }

    async GetAttributeName(id: number): Promise<AttributesModel> {
      try {

        const conn = await db.connect();
        const sql = `SELECT nameOfAttr FROM attributes WHERE id=$1;`;

        const result = await conn.query(sql, [id]);

        conn.release();

        return result.rows[0];
      } catch (error) {
            throw new Error(
                `unable to get attrbutes with id: ${id}
                }): ${(error as Error).message}`
            );
        }
    }

    async GetAttributeType(id: number): Promise<AttributesModel> {
      try {

        const conn = await db.connect();
        const sql = `SELECT typeofAttr FROM attributes WHERE id=$1;`;

        const result = await conn.query(sql, [id]);

        conn.release();

        return result.rows[0];
      } catch (error) {
            throw new Error(
                `unable to get attrbutes with id: ${id}
                }): ${(error as Error).message}`
            );
        }
    }

    async getOne(attributes: AttributesModel): Promise<AttributesModel> {
        try {
            //opn connection
            const conn = await db.connect();
            const sql = `SELECT nameOfAttr, typeofAttr FROM attributes WHERE id=$1`;

            //run query
            const result = await conn.query(sql, [attributes.id]);

            //close connection
            conn.release();

            this.nameOfAttr = result.rows[0].nameOfAttr;
            this.typeofAttr = result.rows[0].typeofAttr;
            //return all users
            return this;
        } catch (error) {
            throw new Error(
                `unable to get the requested attributes ${(error as Error).message}`
            );
        }
    }

    async getAll(): Promise<AttributesModel[]> {
        try {
            //opn connection
            const conn = await db.connect();
            const sql = `SELECT * FROM attributes`;

            //run query
            const result = await conn.query(sql);

            //close connection
            conn.release();

            //return all users
            return result.rows;
        } catch (error) {
            throw new Error(
                `Unable to get attributes table ${(error as Error).message}`
            );
        }
    }

    async deleteAssign(id: number): Promise<AttributesModel> {
        try {
            //opn connection
            const conn = await db.connect();
            // const sq1 = `UPDATE users SET isDeleted = 1 WHERE id=$2`;
            const sql = `DELETE FROM attributes WHERE id= ($1) RETURNING id, nameOfAttr, typeofAttr`;

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

export default AttributesModel;
