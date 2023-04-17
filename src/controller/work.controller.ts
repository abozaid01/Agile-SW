import { Request, Response, NextFunction } from 'express';
import WorkModel from '../model/work.model';

const workModel = new WorkModel();

export const createWork = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        //TODO:validate data

        //create the work
        const work = await workModel.create(req.body);
        res.json({
            status: 'success',
            data: { ...work },
            message: 'work created successfully',
        });
    } catch (error) {
        next(error);
    }
};

export const getAll = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const works = await workModel.getAll();
        res.render('Voulnteer/getAll', { works });
    } catch (err) {
        next(err);
    }
};

export const getWork = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        //get specific work
        const work = await workModel.getOne(req.params.id as unknown as number);
        res.render('Voulnteer/getAll', { work });
    } catch (err) {
        next(err);
    }
};

export const updateWork = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        //TODO: validate data first

        //update work
        await workModel.updateWork(req.body);
        res.redirect('/admin');
    } catch (err) {
        next(err);
    }
};

export const deleteWork = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        await workModel.deleteWork(req.params.id as unknown as number);
        res.redirect('/admin');
    } catch (err) {
        next(err);
    }
};
