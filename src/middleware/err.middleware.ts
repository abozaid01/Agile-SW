import { Request, Response, NextFunction } from 'express';
import Error from '../interfaces/err.interface';

const errMiddleware = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const status = err.status || 500;
    const message = err.message || 'somting went wrong!';
    res.status(status).json({ status, message });
};

export default errMiddleware;
