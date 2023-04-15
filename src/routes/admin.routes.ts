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

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

export default router;
