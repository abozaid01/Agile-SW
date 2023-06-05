import { Request, Response, NextFunction } from 'express';

import AssignModel from '../model/assign.model';
import AssignWorkDetailsModel from '../model/assign_work_details.model';
import WorkModel from '../model/work.model';


const assignModel = new AssignModel();
const assignWorkDetailsModel = new AssignWorkDetailsModel();
const workModel = new WorkModel();

export const assignWorkToUser =async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const { user_id } = req.body;

  const assignID = assignModel.GetAssignIDFromUser(user_id);
  const workID = workModel.GetWorkIDFromUser(user_id);

  assignWorkDetailsModel.create(await assignID, await workID);

}