import db from '../database';
import bcrypt from 'bcrypt';

class UserModel {
    private id?: number;
    private username: string;
    private first_name: string;
    private last_name: string;
    private password: string;
    private age: number;
    private phone_number: number;
    private address: string;
    private userType_id: number;
    private userType_name?: string;

    constructor(
        username = 'null',
        first_name = 'null',
        last_name = 'null',
        password = 'null',
        age = 0,
        phone_number = 0,
        address = 'null',
        userType_id = 0
    ) {
        this.username = username;
        this.age = age;
        this.first_name = first_name;
        this.last_name = last_name;
        this.password = password;
        this.phone_number = phone_number;
        this.userType_id = userType_id;
        this.address = address;
    }

    getUserTypeId(): number {
        return this.userType_id;
    }

    setAddress(address: string) {
        this.address = address;
    }

    //Create new user
    async create(user: UserModel): Promise<UserModel> {
        try {
            //opn connection
            const conn = await db.connect();
            const sql = `INSERT INTO users (first_name, last_name, username, password, age, phone_number, "userType_id") values ($1, $2, $3, $4, $5, $6, $7) RETURNING id, first_name, last_name, username, password, age, phone_number, "userType_id"`;

            //run query
            const result = await conn.query(sql, [
                user.first_name,
                user.last_name,
                user.username,
                await bcrypt.hash(user.password, 10),
                user.age,
                user.phone_number,
                user.userType_id,
            ]);

            //close connection
            conn.release();

            //return created user
            this.id = user.id;
            this.username = user.username;
            this.age = user.age;
            this.first_name = user.first_name;
            this.last_name = user.last_name;
            this.password = user.password;
            this.phone_number = user.phone_number;
            this.userType_id = user.userType_id;
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `unable to create user: ${user.first_name} ${
                    user.last_name
                }): ${(error as Error).message}`
            );
        }
    }

    async getAddress(id: number): Promise<string | undefined> {
        if (id === 0) {
            return '';
        } else {
            const conn = await db.connect();
            const sql = `SELECT * from "Address" where id = ${id}`;
            const result = await conn.query(sql);

            if (result.rows)
                return (result.rows[0].name +
                    ', ' +
                    (await this.getAddress(result.rows[0].parentId))) as string;
        }
    }
    //Read
    async getAll(): Promise<UserModel[]> {
        try {
            //opn connection
            const conn = await db.connect();
            const sql = `SELECT users.id ,first_name, last_name, username,password, age, phone_number, name AS type 
            FROM users 
            JOIN "userType" 
            ON users."userType_id" = "userType".id
            WHERE "isDeleted"=false;`;

            //run query
            const result = await conn.query(sql);

            //close connection
            conn.release();

            //return all users
            return result.rows;
        } catch (error) {
            throw new Error(
                `unable to get the requested user ${(error as Error).message}`
            );
        }
    }

    //Read one
    async getOne(id: number): Promise<UserModel> {
        try {
            //opn connection
            const conn = await db.connect();
            const sql = `SELECT u.id ,first_name, last_name, username, age, phone_number , "userType".name AS type , "address_id"
            FROM users as u, "userType" 
            WHERE u."userType_id" = "userType".id AND u.id=($1)`;

            //run query
            const result = await conn.query(sql, [id]);

            //close connection
            conn.release();

            //return specific user
            this.id = result.rows[0].id;
            this.first_name = result.rows[0].first_name;
            this.last_name = result.rows[0].last_name;
            this.username = result.rows[0].username;
            this.age = result.rows[0].age;
            this.phone_number = result.rows[0].phone_number;
            this.userType_name = result.rows[0].type;

            const address = await this.getAddress(result.rows[0].address_id);
            this.setAddress(address as string);
            return this;
        } catch (error) {
            throw new Error(
                `unable to get the requested user ${id}  ${
                    (error as Error).message
                }`
            );
        }
    }

    //update
    async updateUser(user: UserModel): Promise<UserModel> {
        try {
            const conn = await db.connect();
            const sql = `UPDATE users 
            SET first_name=$1, last_name=$2, username=$3, password=$4, age=$5, phone_number=$6, userType_id=$8 
            WHERE id=$9 
            RETURNING id, first_name, last_name, username, password, age, phone_number, experience, userType_id`;
            //run query
            const result = await conn.query(sql, [
                user.first_name,
                user.last_name,
                user.username,
                user.password,
                user.age,
                user.phone_number,
                user.userType_id,
                user.id,
                //await hash(user.password),
            ]);

            //release connection
            conn.release();

            //return the updated user
            this.username = user.username;
            this.age = user.age;
            this.first_name = user.first_name;
            this.last_name = user.last_name;
            this.password = user.password;
            this.phone_number = user.phone_number;
            this.userType_id = user.userType_id;
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `unable to update the requested user : ${
                    (error as Error).message
                }`
            );
        }
    }

    //Delete
    async deleteUser(id: number): Promise<UserModel> {
        try {
            //opn connection
            const conn = await db.connect();

            const sql = `UPDATE users SET "isDeleted"=true WHERE id=$1`;

            //run query
            const result = await conn.query(sql, [id]);

            //release connection
            conn.release();

            //return the deleted user
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `unable to delete the requested user ${id}  ${
                    (error as Error).message
                }`
            );
        }
    }

    //authenticate user
    async auth(username: string, password: string): Promise<UserModel | null> {
        try {
            //open connection
            const conn = await db.connect();
            const sql = 'SELECT password FROM users WHERE username=$1';

            //run query
            const result = await conn.query(sql, [username]);

            //if user was found in the database
            if (result.rows.length) {
                const { password: passwordDB } = result.rows[0];

                //check if the password is correct in the database
                if (await bcrypt.compare(password, passwordDB)) {
                    const userInfo = await conn.query(
                        'SELECT id, first_name, last_name, username, password, age, phone_number FROM users WHERE username=($1)',
                        [username]
                    );
                    return userInfo.rows[0];
                }
            }

            //release connection
            conn.release();

            //return null if user not found in the database
            return null;
        } catch (error) {
            throw new Error(`Unable to login: ${(error as Error).message}`);
        }
    }

    //userTypeId detection
    async detect(username: string): Promise<UserModel | number> {
        try {
            //open connection
            const conn = await db.connect();
            const sql = 'SELECT "userType_id" FROM users WHERE username=$1';

            //run query
            const result = await conn.query(sql, [username]);

            //release connection
            conn.release();

            //return the detected userTypeId
            this.userType_id = result.rows[0].usertype_id;

            return this.userType_id;
        } catch (error) {
            throw new Error(
                `Unable to detect userTypeId: ${(error as Error).message}`
            );
        }
    }
}

export default UserModel;
