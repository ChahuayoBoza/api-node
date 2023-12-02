const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth     : '/api/auth',
            category : '/api/category',
            product : '/api/product',
            user     : '/api/usuarios'
        }

        //Conectar base de datos

        this.dbConnect();

        //Middlewares

        this.middleware();
        //Rutas de mi aplicación

        this.routes();
    }

    async dbConnect(){
        await dbConnection();
    }

    middleware() {

        //Cors
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json());

        //Directorio Público
        this.app.use(express.static('public'));
    }

    routes() {

        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.category, require('../routes/category'));
        this.app.use(this.paths.product, require('../routes/product'));
        this.app.use(this.paths.user, require('../routes/user'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log("Server running at", this.port);
        } )
    }
}

module.exports = Server;

