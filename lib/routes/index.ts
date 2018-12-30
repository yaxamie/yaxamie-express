import * as fs from 'fs';

import {Request, Response, Application} from "express";
import {htmlPath} from '../pathUtils';
import * as htmlTemplate from '../format/htmlTemplate';
import * as markdown from '../format/markdown';

export interface IDyanmicPageContents {
    route: string;
    page: string;
    title: string;
    footer: string;
}

export function addRoute(app:Application, contents:IDyanmicPageContents) {
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


export function linkHome() {
    return `<a href="/">home</a>`;
}

export function linkBlog() {
    return `<a href="/blog">blog</a>`;
}