import db from '../database';

class UserTypeModel {
    private name: string;

    constructor(name = 'null') {
        this.name = name;
    }

    async detectName(username: string): Promise<string> {
        try {
            //open connection
            const conn = await db.connect();
            const sql =
                'SELECT name FROM users, "userType" WHERE  users."userType_id" = "userType".id AND username=$1';

            //run query
            const result = await conn.query(sql, [username]);

            //release connection
            conn.release();

            //return the detected userType Name
            this.name = result.rows[0].name;

            return this.name;
        } catch (error) {
            throw new Error(
                `Unable to detect userType Name: ${(error as Error).message}`
            );
        }
    }
}

export default UserTypeModel;
