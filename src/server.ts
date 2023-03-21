import express, { Application, Request, Response } from 'express';
import errorMiddleware from './middleware/err.middleware';
const app: Application = express();

app.get('/', (req: Request, res: Response) => {
    throw new Error('');
    res.send('hello');
});

//Internal errors in the server
app.use(errorMiddleware);

//NOT FOUND ROUTES
app.use((_req: Request, res: Response) => {
    res.status(404).json({
        message: 'THAT IS WRONG ROUTE!!',
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log('listening on port 3000');
});

export default app;
