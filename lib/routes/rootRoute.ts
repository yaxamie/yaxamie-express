import {Request, Response, Application} from "express";
import * as path from '../path';

export class Routes {       
    public addRoutes(app:Application): void {          
        app.route('/')
        .get((req: Request, res: Response) => {            
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            });
        })               

        app.route('/test')
        .get((req: Request, res: Response) => {
            res.sendFile(path.htmlPath('test.html'));
        });
    }
}