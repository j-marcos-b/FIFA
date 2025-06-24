import express from 'express';

class server {
    private app = express();
    private port: string;

    constructor(port: string) {
        this.app = express();
        this.port = '3000';
        this.listen();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server corriendo en el puerto ${this.port}`);
        });
    }
}

export default server;