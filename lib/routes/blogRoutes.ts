import {Application} from "express";
import {htmlPath} from '../pathUtils';
import * as fs from 'fs';
import * as path from 'path';
import { linkHome, addRoute, linkBlog, IDyanmicPageContents } from ".";


export class BlogRoutes { 
    public addRoutes(app:Application): void {
        this.blog(app);
    };

    private blog(app:Application){
        // currenlty only handles .mds

        const files = fs.readdirSync(htmlPath('pages/blog'));
        files.forEach((file) => {
            // trim off the file extension and the leading path
            let baseName = path.basename(file, '.md');
            
            // route is /blog/OnCriticism, or just /blog for the index
            let route = `/blog/${this.underscoreCase(baseName)}`;
            
            // only supports md files atm 
            let page = `blog/${baseName}.md`;
            // title case the display title
            let title = `${this.titleCase(baseName)}`;
            // link home from blog, or to blog from a page
            let footer = linkBlog();

            // fix index
            if (route == '/blog/index') {
                route = '/blog'
                footer = linkHome();
            }

            const contents:IDyanmicPageContents = {
                route, page, title, footer
            };

            addRoute( app, contents );
        });
    }

    private titleCase(str:string) {
        let splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            // You do not need to check if i is larger than splitStr length, as your for does that for you
            // Assign it back to the array
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
        }
        // Directly return the joined string and convet spaces to sep
        return splitStr.join(' '); 
    }

        private underscoreCase(str:string) {
        let splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            // You do not need to check if i is larger than splitStr length, as your for does that for you
            // Assign it back to the array
            splitStr[i] = splitStr[i].charAt(0).toLowerCase() + splitStr[i].substring(1);     
        }
        // Directly return the joined string and convet spaces to sep
        return splitStr.join('_'); 
    }
}

