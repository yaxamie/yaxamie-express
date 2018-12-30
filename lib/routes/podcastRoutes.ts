import {Request, Response, Application} from "express";
import {htmlPath} from '../pathUtils';
import * as htmlTemplate from '../format/htmlTemplate';
import * as fs from 'fs';
import * as path from 'path';
import * as markdown from '../format/markdown';
import { IDyanmicPageContents, linkHome } from ".";

export class PodcastRoutes { 
    public addRoutes(app:Application): void {          
        this.podcast(app);
    };

    private podcast(app:Application) {
        let body = markdown.toHtml(htmlTemplate.podcastContents());
        
        const pageContents = htmlTemplate.standard(
            'The Game Dads Podcast', 
            body, 
            linkHome());

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
}