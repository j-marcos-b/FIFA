import express from 'express';

class server {
    private app = express();
    private port: string;

    constructor() {
        this.port = process.env.PORT || '3000';
        this.app = express();
        this.listen();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server corriendo en el puerto ${this.port}`);
        });
    }
}

export default server;