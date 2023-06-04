import express from 'express';

const router = express.Router();

import {
    createUser,
    getAll,
    getUser,
    updateUser,
    deleteUser,
} from './../controller/user.controller';

import {
    createWork,
    getWork,
    updateWork,
    deleteWork,
} from './../controller/work.controller';

import UserModel from '../model/user.model';

router.route('/').get(getAll).post(createUser);

//form to create user
router.route('/create-user').get((req, res) => {
    res.render('Admin/createUser');
});

//form to edit user
router.route('/edit-user/:id').get(async (req: express.Request, res) => {
    const { id } = req.params;
    const userModel = new UserModel();
    const user = await userModel.getOne(id as unknown as number);
    res.render('Admin/updateUser', { user });
});

//form to create work
router.route('/create-work').get((req, res) => {
    res.render('Admin/createWork');
});

//form to edit work
router.route('/edit-work').get((req, res) => {
    res.render('Admin/updateWork');
});

router.route('/user/:id').get(getUser).patch(updateUser).delete(deleteUser);
router.route('/work/:id').patch(updateWork).delete(deleteWork);

export default router;
