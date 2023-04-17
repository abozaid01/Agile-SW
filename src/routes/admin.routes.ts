import express from 'express';

const router = express.Router();

import {
    createUser,
    getAll,
    getUser,
    updateUser,
    deleteUser,
} from './../controller/user.controller';

router.route('/').get(getAll).post(createUser);

//form to create user
router.route('/create').get((req, res) => {
    res.render('Admin/createUser');
});

//form to edit user
router.route('/edit').get((req, res) => {
    res.render('Admin/updateOneUser');
});

router.route('/user/:id').get(getUser).patch(updateUser).delete(deleteUser);

export default router;
