import {Request, Response, Application} from "express";
import * as path from '../pathUtils';

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

        app.route('/send')
        .get((req: Request, res: Response) => {
            const literal:string = 
                `<h1>hi</h1>
                what's up with you?`;
            res.send(literal);
        });
    }
}