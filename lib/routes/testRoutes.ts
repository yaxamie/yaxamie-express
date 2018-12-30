import {Request, Response, Application} from "express";
import * as path from '../pathUtils';
import { json } from "body-parser";

export class TestRoutes {       
    public addRoutes(app:Application): void {          
        
        app.route('/test')
        .get((req: Request, res: Response) => {
            res.sendFile(path.htmlPath('test.html'));
        });

        app.route('/render')
        .get((req: Request, res: Response) => {
            res.render('hello world', {
                dynamic:'extra stuff'
            })
        });

        app.route('/params/:number') 
        .get((req: Request, res: Response) => {
            res.send( 
                JSON.stringify(req.params)
                + JSON.stringify(req.path)
                + JSON.stringify(req.method)
                + JSON.stringify(req.originalUrl)
            );
        });
    }
}