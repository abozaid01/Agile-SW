import { Request, Response, NextFunction } from 'express';
import UserModel from '../model/user.model';
import UserTypeLinksModel from '../model/userTypeLinks.model';
import LinksModel from '../model/links.model';
import UserTypeModel from '../model/userType.model';
import WorkModel from '../model/work.model';

const userModel = new UserModel();
const userTypeLinksModel = new UserTypeLinksModel();
const linksModel = new LinksModel();
const userTypeModel = new UserTypeModel();
const workModel = new WorkModel();

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body;
        console.log(req.body);

        const user = await userModel.auth(username, password);

        if (!user) return res.status(401).redirect('/login'); //TODO: Alret unsucessful login

        //detect userTypeID && userTypeName based on the username
        const userType_id = await userModel.detect(username);
        const userType_name = await userTypeModel.detectName(username);

        //figure out which links can this user access
        const AccessLinks = await userTypeLinksModel.Access(
            userType_id as number
        ); // res=> [{link_id:3},{link_id:4},{link_id:1}]

        const AccessLinksArr: number[] = AccessLinks.map((e) => e.link_id); // res=> [3,4,1]

        const showPages = await linksModel.show(4); //res=> [{physcialname: 'home.ejs'}, {physcialname: 'dashboard.ejs'}]
        const showPagesArr = showPages.map((item) => item.physicalname); //res=> ['home.ejs', 'dashboard.ejs']

        return res.redirect(`/${userType_name}`);
        // return res.render('dashboard.ejs', {
        //     userType_name,
        // }); //home.ejs
    } catch (err) {
        return next(err);
    }
};

export const createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        //TODO:validate data

        //create the user
        await userModel.create(req.body);
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
        const users = await userModel.getAll();
        const works = await workModel.getAll();

        res.render('Admin/getAll', { users, works });
    } catch (err) {
        next(err);
    }
};

export const getUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        //get specific user
        const user = await userModel.getOne(req.params.id as unknown as number);
        res.render('Admin/getUser', { user });
    } catch (err) {
        next(err);
    }
};

export const updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        //TODO: validate data first

        //update user
        await userModel.updateUser(req.body);
        res.redirect('/admin');
    } catch (err) {
        next(err);
    }
};

export const deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        await userModel.deleteUser(req.params.id as unknown as number);
        res.redirect('/admin');
    } catch (err) {
        next(err);
    }
};
