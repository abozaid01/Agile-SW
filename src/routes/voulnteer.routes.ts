import express from 'express';

const router = express.Router();

import {
    createWork,
    getAll,
    getWork,
    deleteWork
} from './../controller/work.controller';

router.route('/').get(getAll).post(createWork);

router.route('/:id').get(getWork).delete(deleteWork);

export default router;
