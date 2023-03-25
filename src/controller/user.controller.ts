import { Request, Response, NextFunction } from 'express';
import UserModel from '../model/user.model';
import UserTypeLinksModel from '../model/userTypeLinks.model';
import LinksModel from '../model/links.model';
import { Router } from 'express';

const userModel = new UserModel();
const userTypeLinksModel = new UserTypeLinksModel();
const linksModel = new LinksModel();

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password, userTypeID } = req.body;
        console.log(username);

        const user = await userModel.auth(username, password);

        if (!user)
            return res
                .status(401)
                .send(
                    'sorry, username or password is not correct. please try again'
                );

        //figure out which links can this user access
        const AccessLinks = await userTypeLinksModel.Access(userTypeID); // res=> [{link_id:3},{link_id:4},{link_id:1}]
        // userTypeLinksModel.setLink_id()
        const AccessLinksArr: number[] = AccessLinks.map((e) => e.link_id); // res=> [3,4,1]
        console.log(AccessLinksArr);

        const showPages = await linksModel.show(4);
        console.log(showPages);

        const showPagesArr = showPages.map((item) => item.physicalname);

        console.log(showPagesArr[0]);

        return res.render(showPagesArr[0]); //home.ejs
    } catch (err) {
        return next(err);
    }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        //validate data

        //create the user
        const user = await userModel.create(req.body);
        res.json({
            status: 'success',
            data: { ...user },
            message: 'user created successfully',
        });
    } catch (error) {
        next(error);
    }
};
