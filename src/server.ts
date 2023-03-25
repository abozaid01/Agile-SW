import path from 'path';
import express, { Application, Request, Response } from 'express';
import errorMiddleware from './middleware/err.middleware';
import config from './config';
import db from './database';
import LinksModel from './model/links.model';
import UserTypeLinksModel from './model/userTypeLinks.model';
import { auth } from './controller/user.controller';

const userTypeLinks = new UserTypeLinksModel();
const y = userTypeLinks.Access(2).then((response) => {
    console.log(response);
});

const linksModel = new LinksModel();
const x = linksModel.show(2).then((res) => {
    console.log(res);
});

const app: Application = express();

//middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/view'));

//test database connection
db.connect()
    .then((client) => {
        return client
            .query('SELECT NOW()')
            .then((res) => {
                client.release();
                console.log(res.rows);
            })
            .catch((err) => {
                client.release();
                console.log(err.stack);
            });
    })
    .catch((err) => {
        console.log(err);
    });
app.post('/auth', auth);
app.get('/', (req: Request, res: Response) => {
    //throw new Error('');
    res.render('home');
});

//Internal errors in the server
app.use(errorMiddleware);

//NOT FOUND ROUTES
app.use((_req: Request, res: Response) => {
    res.status(404).json({
        message: 'THAT IS WRONG ROUTE!!',
    });
});

const PORT = config.port || 3000;
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});

export default app;
