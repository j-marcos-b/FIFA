import express, { Request, Response } from 'express';
import routePlayer from '../routes/player-routes';

class server {
    private app = express();
    private port: string;

    constructor() {
        this.port = process.env.PORT || '3000';
        this.app = express();
        this.listen();
        this.middleware();
        this.routes();
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

        this.app.use('/api/player', routePlayer);
    }

    middleware() {
        this.app.use(express.json());
    }
}

export default server;