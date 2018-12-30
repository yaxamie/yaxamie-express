import {Application, Request, Response} from "express";
import * as express from "express";
import * as bodyParser from "body-parser";

import { htmlPath } from "./pathUtils";
import { TestRoutes } from "./routes/testRoutes";
import { HtmlRoutes } from "./routes/htmlRoutes";
import { BlogRoutes } from "./routes/blogRoutes";
import { PodcastRoutes } from "./routes/podcastRoutes";

class App {
    public app: Application;
    public testRoutes:TestRoutes = new TestRoutes();
    public htmlRoutes:HtmlRoutes = new HtmlRoutes();
    public blogRoutes:BlogRoutes = new BlogRoutes();
    public podcastRoutes:PodcastRoutes = new PodcastRoutes();

    constructor() {
        this.app = express();
        this.config();        
        
        // add test routes
        this.testRoutes.addRoutes(this.app);
        
        // add html routes
        this.htmlRoutes.addRoutes(this.app);
        this.blogRoutes.addRoutes(this.app);
        this.podcastRoutes.addRoutes(this.app);
        
        // static route images and css
        this.app.use(express.static(htmlPath('static/')));
    }

    private config(): void{
        // support application/json type post data
        this.app.use(bodyParser.json());
        
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

}

export default new App().app;