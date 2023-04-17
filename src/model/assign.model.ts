import db from '../database';

class AssignModel {
    private id?: number;
    private assign_date: string;

    constructor(assign_date = 'null') {
        this.assign_date = assign_date;
    }
}
