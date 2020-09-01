require("dotenv").config({
    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
})

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session')



class AppController {

    constructor() {
        this.express = express();

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(express.static(__dirname));
        this.express.use(session({secret:process.env.JWT_SECRET,cookie:{maxAge:60000}}))
        this.express.use(cors());
    }


    routes() {
        this.express.use(require("./router/routes"));
        this.express.use(require("./router/categoria"));
        this.express.use(require("./router/product"));
        this.express.use(require("./router/user"));
        this.express.use(require("./router/cart"));
     }
}

module.exports = new AppController().express;