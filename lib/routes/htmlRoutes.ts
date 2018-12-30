import {Application} from "express";
import {linkHome, addRoute } from ".";


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
        
        addRoute( app, contents );
    }

    private cv(app:Application){
        const contents = {
            route:'/cv',
            page:'cv.md',
            title:'cv',
            footer:linkHome()
        };
        
        addRoute( app, contents );
    }
}