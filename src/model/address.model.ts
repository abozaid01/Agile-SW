import db from '../database';

export const getAddress = async (username: string) => {
    try {
        //open connection
        const conn = await db.connect();
        const sql =
            'SELECT Name AS Address FROM users, Address WHERE users.address_id = Address.id AND username=$1';

        //run query
        const result = await conn.query(sql, [username]);

        //release connection
        conn.release();

        //return the detected userTypeId
        this.userType_id = result.rows[0].usertype_id;

        return this.userType_id;
    } catch (error) {
        throw new Error(
            `Unable to get ${username}'s Address ${(error as Error).message}`
        );
    }
};
