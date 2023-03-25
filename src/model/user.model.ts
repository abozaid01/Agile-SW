import db from '../database';

class UserModel {
    private id?: number;
    private username: string;
    private first_name: string;
    private last_name: string;
    private password: string;
    private age: number;
    private phone_number: number;
    private experience: number;

    constructor(
        username = 'null',
        first_name = 'null',
        last_name = 'null',
        password = 'null',
        age = 0,
        phone_number = 0,
        experience = 0
    ) {
        this.username = username;
        this.age = age;
        this.first_name = first_name;
        this.last_name = last_name;
        this.password = password;
        this.phone_number = phone_number;
        this.experience = experience;
    }

    //Create new user
    async create(user: UserModel): Promise<UserModel> {
        try {
            //opn connection
            const conn = await db.connect();
            const sql = `INSERT INTO users (first_name, last_name, username, password, age, phone_number, experience) values ($1, $2, $3, $4, $5, $6, $7) RETURNING first_name, last_name, username, password, age, phone_number, experience`;

            //run query
            const result = await conn.query(sql, [
                user.first_name,
                user.last_name,
                user.username,
                user.password,
                user.age,
                user.phone_number,
                user.experience,
                //await hash(user.password),
            ]);

            //close connection
            conn.release();

            //return created user
            return result.rows[0];
        } catch (error) {
            throw new Error(
                `unable to create user: ${user.first_name} ${
                    user.last_name
                }): ${(error as Error).message}`
            );
        }
    }

    //Read
    async getAll(): Promise<UserModel[]> {
        try {
            //opn connection
            const conn = await db.connect();
            const sql = `SELECT id ,first_name, last_name, username, age, phone_number, experience from users`;

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
            const sql = `SELECT id ,first_name, last_name, username, age, phone_number, experience from users WHERE id=($1)`;

            //run query
            const result = await conn.query(sql, [id]);

            //close connection
            conn.release();

            //return specific user
            return result.rows[0];
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
            const sql = `UPDATE users SET first_name=$1, last_name=$2, username=$3, password=$4, age=$5, phone_number=$6, experience=$7 WHERE id=$8 RETURNING id, first_name, last_name, username, password, age, phone_number, experience`;

            //run query
            const result = await conn.query(sql, [
                user.first_name,
                user.last_name,
                user.username,
                user.password,
                user.age,
                user.phone_number,
                user.experience,
                user.id,
                //await hash(user.password),
            ]);

            //release connection
            conn.release();

            //return the updated user
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
            const sql = `DELETE FROM users WHERE id= ($1) RETURNING id, first_name, last_name, username, password, age, phone_number, experience`;

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
                if (password === passwordDB) {
                    const userInfo = await conn.query(
                        'SELECT id, first_name, last_name, username, password, age, phone_number, experience FROM users WHERE username=($1)',
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
}

export default UserModel;
