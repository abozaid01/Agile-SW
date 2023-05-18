import db from '../database';

class UserTypeLinksModel {
    private id?: number;
    private userType_id: number;
    public link_id: number;

    constructor(userType_id = 0, link_id = 0) {
        this.userType_id = userType_id;
        this.link_id = link_id;
    }

    getLink_id(): number {
        return this.link_id;
    }

    setLink_id(value: number) {
        this.link_id = value;
    }

    async Access(userTypeID: number): Promise<UserTypeLinksModel[]> {
        try {
            //opn connection
            const conn = await db.connect();
            const sql = `SELECT link_id FROM userTypeLinks WHERE userType_id=$1`;

            //run query
            const result = await conn.query(sql, [userTypeID]);

            //close connection
            conn.release();

            //return Access links for user type
            return result.rows; // res=> [{link_id:3},{link_id:4},{link_id:1}]
        } catch (error) {
            throw new Error(
                `unable to get the requested uerTypeLinks ${
                    (error as Error).message
                }`
            );
        }
    }
}

export default UserTypeLinksModel;
