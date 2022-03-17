import express, { Request, Response, ErrorRequestHandler } from 'express';
import MongoStore from 'connect-mongo';
import morgan from 'morgan';
import helmet from 'helmet';
import session from 'express-session';
import cors from 'cors';

import { configuration, IConfig } from './config';
import connect from './database';
import generalRoute from './routes/router';
import mongoose from 'mongoose';

export default function createExpressApp(config: IConfig): express.Express {
    const {
        EXPRESS_DEBUG,
        SESSION_COOKIE_NAME,
        SESSION_SECRET,
    } = process.env.NODE_ENV === 'production' ? process.env : config;
    const app = express();
    const {
        MONGO_HOST, MONGO_USER, MONGO_PASS, MONGO_DATABASE,
    } = process.env.NODE_ENV === 'production' ? process.env : config;
    const mongoIdentity = `${MONGO_USER}:${MONGO_PASS}`;
    const mongoServer = `${MONGO_HOST}`;
    const mongoUri = `mongodb+srv://${mongoIdentity}@${mongoServer}/${MONGO_DATABASE}`;

    app.use(morgan('combined'));
    app.use(helmet());
    app.use(cors({
        origin: true,
        credentials: true,
    }));

    app.use(express.json());
    const sessionConfig = {
        name: SESSION_COOKIE_NAME,
        secret: SESSION_SECRET,
        store: MongoStore.create({ mongoUrl: mongoUri }), // Recup connexion from mongoose
        saveUninitialized: false,
        resave: false,
        cookie: {},
    };

    if (process.env.NODE_ENV === 'production') {
        app.set('trust proxy', 1);
        sessionConfig.cookie = {
            secure: true,
            sameSite: 'none',
        };
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    app.use(session(sessionConfig));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    app.use(((err, _req, res, _next) => {
        // eslint-disable-next-line no-console
        console.error(err.stack);
        res.status?.(500).send(!EXPRESS_DEBUG ? 'Oups' : err);
    }) as ErrorRequestHandler);

    app.get('/', (req: Request, res: Response) => {
        res.send('This is the Eole Edit app');
    });
    app.use('/api', generalRoute);

    return app;
}

const config = configuration();
const { PORT } = process.env.NODE_ENV === 'production' ? process.env : config;
const app = createExpressApp(config);
// eslint-disable-next-line no-console
connect(config).then(() => app.listen(PORT, () => console.log(`Eole Edit listening at ${PORT}`)));
