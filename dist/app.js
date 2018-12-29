"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const testRoutes_1 = require("./routes/testRoutes");
const htmlRoutes_1 = require("./routes/htmlRoutes");
const pathUtils_1 = require("./pathUtils");
class App {
    constructor() {
        this.testRoutes = new testRoutes_1.TestRoutes();
        this.htmlRoutes = new htmlRoutes_1.HtmlRoutes();
        this.app = express();
        this.config();
        // add test routes
        this.testRoutes.addRoutes(this.app);
        // add html routes
        this.htmlRoutes.addRoutes(this.app);
        // static route images and css
        this.app.use(express.static(pathUtils_1.htmlPath('static/')));
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