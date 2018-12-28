import {Request, Response, Application} from "express";
import {htmlPath} from '../pathUtils';
import * as fs from 'fs';
import * as path from 'path';

export class HtmlRoutes {       
    public addRoutes(app:Application): void {          
        // route htmls too
        let htmlFiles = this.findHtmlFiles(htmlPath(''));
        htmlFiles.forEach((file)=> {
            let path = file.split('/');
            let route = path[path.length - 1];
            
            // slice off .html
            route = '/' + route.slice(0, -5);
            
            // route /index to simplly /
            if (route == '/index') { route = '/'; }

            app.route(route)
            .get((req: Request, res: Response) => {
                res.sendFile(file);
            });
        });
    }

    findHtmlFiles(startPath:string):string[] {
        let fileList:string[] = [];
    
        console.log('Starting from dir '+startPath+'/');
    
        if (!fs.existsSync(startPath)){
            console.log("not a directory ",startPath);
            return;
        }
    
        let files = fs.readdirSync(startPath);
        
        for(let i=0;i<files.length;i++){
            let filename = path.join(startPath,files[i]);
            let stat = fs.lstatSync(filename);
            
            if (stat.isDirectory()){
                //recurse subdirectores and destucture them into the list
                const subdirectoryFiles = this.findHtmlFiles(filename); 
                fileList = [...fileList, ...subdirectoryFiles];
            }
            
            else if (filename.endsWith('.html')) {
                console.log('-- found: ',filename);
                fileList.push(filename);
            };
        };
    
        return fileList;
    };
}