import {Request, Response, Application} from "express";
import {htmlPath} from '../pathUtils';
import * as htmlTemplate from '../format/htmlTemplate';
import * as fs from 'fs';
import * as markdown from '../format/markdown';

interface IDyanmicPageContents {
    route:string, 
    page:string,
    title:string,
    footer:string
};

export class HtmlRoutes { 
    
    public addRoutes(app:Application): void {          
        this.index(app);
        this.cv(app);
     };

    private index(app:Application) {
        const contents = {
            route:'/',
            page:'index.md',
            title:'yaxamie',
            footer:'~rusty parks'
        };
        this.addRoute( app, contents );
    }

    private cv(app:Application){
        const contents = {
            route:'/cv',
            page:'cv.html',
            title:'cv',
            footer:this.linkHome()
        };
        this.addRoute( app, contents );
    }

    private linkHome() {
        return `<a href="/">home</a>`;
    }

    private addRoute(app:Application, contents:IDyanmicPageContents) {
        const {title, footer, page} = contents;
        
        let body = fs.readFileSync(htmlPath(`static/pages/${page}`)).toString();
        
        if (page.endsWith('.md')) {
            body = markdown.toHtml(body);
        }

        const pageContents = htmlTemplate.standard(title, body, footer);
        
        app.route(contents.route)
        .get((req: Request, res: Response) => {
            res.send(pageContents);}
        );
    }
}