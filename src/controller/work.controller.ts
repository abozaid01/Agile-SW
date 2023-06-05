import { Request, Response, NextFunction } from 'express';

import WorkModel from '../model/work.model';
import WorkAttributesModel from '../model/workAttributes.model';
import WorkAttributesValuesModel from '../model/workAttributesValues.model';
import AssignWorkDetailsModel from '../model/assign_work_details.model';
import AssignModel from '../model/assign.model';
import AttributesModel from '../model/attributes.model';

const workModel = new WorkModel();
const workAttributesModel = new WorkAttributesModel();
const workAttributesValuesModel = new WorkAttributesValuesModel();
const assignWorkDetailsModel = new AssignWorkDetailsModel();
const assignModel = new AssignModel();
const attributesModel = new AttributesModel();


export const createWork = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        
        const {name, nameOfAttr, typeofAttr, value} = req.body

        //create the work
        const work = await workModel.create(name);
        const attribute = await attributesModel.create(nameOfAttr, typeofAttr);
        const workAttributes = await workAttributesModel.create(work.GetWorkID() as unknown as number, attribute.getAttributesID() as unknown as number);
        const workAttValue = await workAttributesValuesModel.create(workAttributes.GetID() as unknown as number, 0, value);
        // res.json({
        //     status: 'success',
        //     data: { ...work },
        //     message: 'work created successfully',
        // });
        res.redirect('/admin');

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
        const workAttrValus = await workAttributesValuesModel.getAll();
        res.render('Voulnteer/getAll', { works, workAttrValus });
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
