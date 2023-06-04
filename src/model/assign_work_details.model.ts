import db from '../database';

class AssignWorkDetailsModel {
    private id?: number;
    private assign_id: number;
    private work_id: number;

    constructor(assign_id = 0, work_id = 0) {
        this.assign_id = assign_id;
        this.work_id = work_id;
    }

    async getWorkVolunteer(): Promise<AssignWorkDetailsModel[]> {
        try {
            //opn connection
            const conn = await db.connect();
            const sql = ``;

            //run query
            const result = await conn.query(sql);

            //close connection
            conn.release();

            return result.rows;
        } catch (error) {
            throw new Error(
                `unable to get the requested user ${(error as Error).message}`
            );
        }
    }
}

export default AssignWorkDetailsModel;
