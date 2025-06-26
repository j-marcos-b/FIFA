import express, { Request, Response } from 'express';
import cors from 'cors';
import routePlayer from '../routes/player-routes';
import db from '../db/connection';

class server {
    private app = express();
    private port: string;

    constructor() {
        this.port = process.env.PORT || '3000';
        this.app = express();
        this.listen();
        this.middleware();
        this.routes();
        this.debConnect();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server corriendo en el puerto ${this.port}`);
        });
    }

    routes() {
        this.app.get('/', (req: Request, res: Response) => {
            res.json({msn:'Servidor corriendo'});
        });

        this.app.use('/api/players', routePlayer);
    }

    middleware() {
        this.app.use(express.json());
        this.app.use(cors());
    }

    async debConnect() {
        try {
            await db.authenticate();
            console.log('Base de datos conectada');
        } catch (error) {
            console.error('Error al conectar a la base de datos:', error);
        }
        
    }
}

export default server;