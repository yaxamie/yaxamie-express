import {Request, Response, Application} from "express";
import {htmlPath} from '../pathUtils';
import * as express from "express";
import * as htmlTemplate from '../format/htmlTemplate';
import * as fs from 'fs';
import * as path from 'path';
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
        this.blog(app);
        this.podcast(app);
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
            page:'cv.md',
            title:'cv',
            footer:this.linkHome()
        };
        this.addRoute( app, contents );
    }

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
            let footer = this.linkBlog();

            // fix index
            if (route == '/blog/index') {
                route = '/blog'
                footer = this.linkHome();
            }

            const contents = {
                route, page, title, footer
            };

            this.addRoute( app, contents );
        });
    }

    private podcast(app:Application) {
        let body = markdown.toHtml(htmlTemplate.podcastContents());
        
        const pageContents = htmlTemplate.standard(
            'The Game Dads Podcast', 
            body, 
            this.linkHome());

        app.route('/podcast')
        .get((req: Request, res: Response) => {
            res.send(pageContents);
        });
        
        app.route('/podcast')
        .get((req: Request, res: Response) => {
            res.send(pageContents);
        });
        
        // route files to podcast/filename
        let podcastDir = htmlPath('pages/podcast');
        fs.readdirSync(podcastDir).forEach((file)=>{
            app.route(`/podcast/${file}`)
            .get((req: Request, res: Response) => {
                res.sendFile(path.join(podcastDir, file));
            });
        });

        // route poderator.xml to conent/podcast/filename for legacy support
        // need to track down listing sites and update this url so we can fix and 
        // remove this legacy stuff
        app.route(`/content/podcast/Poderator.xml`)
        .get((req: Request, res: Response) => {
            res.sendFile(htmlPath('pages/podcast/Poderator.xml'));
        });

    }

    private addRoute(app:Application, contents:IDyanmicPageContents) {
        const {title, footer, page} = contents;
        
        let body = fs.readFileSync(htmlPath(`pages/${page}`)).toString();
        
        if (page.endsWith('.md')) {
            body = markdown.toHtml(body);
        }

        const pageContents = htmlTemplate.standard(title, body, footer);
        
        app.route(contents.route)
        .get((req: Request, res: Response) => {
            res.send(pageContents);
        });
    }

    private linkHome() {
        return `<a href="/">home</a>`;
    }
    
    private linkBlog() {
        return `<a href="/blog">blog</a>`;
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