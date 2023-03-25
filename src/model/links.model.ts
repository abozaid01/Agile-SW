import db from '../database';

class LinksModel {
    private id?: number;
    private friendlyName: string;
    public physicalname: string;

    constructor(friendlyName = 'null', physicalName = 'null') {
        this.friendlyName = friendlyName;
        this.physicalname = physicalName;
    }

    getPhysicalName(): string {
        return this.friendlyName;
    }
    setPhysicalName(value: string) {
        this.friendlyName = value;
    }

    async show(id: number): Promise<LinksModel[]> {
        try {
            //open connection
            const conn = await db.connect();
            const sql = `select physicalName from links where id=$1`;

            //run query
            const result = await conn.query(sql, [id]);

            //close connection
            conn.release();

            //return link pages
            return result.rows;
        } catch (error) {
            throw new Error(
                `unable to get the requested links ${(error as Error).message}`
            );
        }
    }
}

export default LinksModel;
