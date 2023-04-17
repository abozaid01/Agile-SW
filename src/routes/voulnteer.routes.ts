import express from 'express';

const router = express.Router();

import {
    createWork,
    getAll,
    getWork,
    updateWork,
    deleteWork,
} from './../controller/work.controller';

router.route('/').get(getAll).post(createWork);

router.route('/:id').get(getWork).patch(updateWork).delete(deleteWork);

export default router;
