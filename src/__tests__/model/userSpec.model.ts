import UserModel from '../../model/user.model';
import db from '../../database';

describe('UserModel', () => {
    let userModel: UserModel;
    const testUser: UserModel = new UserModel(
        'test_username',
        'test_first_name',
        'test_last_name',
        'test_password',
        30,
        1234567890,
        5,
        1
    );

    beforeEach(() => {
        userModel = new UserModel();
    });

    it('should create a new user', async () => {
        spyOn(db, 'connect').and.returnValue(
            await Promise.resolve(mockConnection)
        );
        spyOn(mockConnection, 'query').and.returnValue(
            await Promise.resolve({
                rows: [testUser],
            })
        );
        const createdUser = await userModel.create(testUser);
        expect(createdUser).toEqual(testUser);
    });

    it('should get all users', async () => {
        spyOn(db, 'connect').and.returnValue(Promise.resolve(mockConnection));
        spyOn(mockConnection, 'query').and.returnValue(
            Promise.resolve({
                rows: [testUser],
            })
        );
        const users = await userModel.getAll();
        expect(users).toEqual([testUser]);
    });

    it('should get one user by id', async () => {
        const id = 1;
        spyOn(db, 'connect').and.returnValue(Promise.resolve(mockConnection));
        spyOn(mockConnection, 'query').and.returnValue(
            Promise.resolve({
                rows: [testUser],
            })
        );
        const user = await userModel.getOne(id);
        expect(user).toEqual(testUser);
    });

    it('should update a user', async () => {
        spyOn(db, 'connect').and.returnValue(Promise.resolve(mockConnection));
        spyOn(mockConnection, 'query').and.returnValue(
            Promise.resolve({
                rows: [testUser],
            })
        );
        const updatedUser = await userModel.updateUser(testUser);
        expect(updatedUser).toEqual(testUser);
    });

    it('should delete a user by id', async () => {
        const id = 1;
        spyOn(db, 'connect').and.returnValue(Promise.resolve(mockConnection));
        spyOn(mockConnection, 'query').and.returnValue(
            Promise.resolve({
                rows: [testUser],
            })
        );
        const deletedUser = await userModel.deleteUser(id);
        expect(deletedUser).toEqual(testUser);
    });
});
