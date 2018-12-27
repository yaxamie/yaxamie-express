"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const rootRoute_1 = require("./routes/rootRoute");
class App {
    constructor() {
        this.rootRoute = new rootRoute_1.Routes();
        this.app = express();
        this.config();
        this.rootRoute.addRoutes(this.app);
    }
    config() {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map