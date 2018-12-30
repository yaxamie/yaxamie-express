import * as parse from 'xml-parser';
import * as fs from 'fs';
import * as path from 'path';
import * as pathUtils from '../pathUtils';

export function standard(title:string, body:string, footer:string) {
return `<!DOCTYPE html><html>
    <head>
    <title>${title}</title>
    <meta name="viewport" content="initial-scale=1, maximum-scale=1"/>
    <link rel="stylesheet" type="text/css" href="/css/plain.css"/>
    <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32" />
    <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16" />
    </head>

    <body>

    <div class="page">
        ${body}
        <div class="footer">
        ${footer}
        </div>
    </div>

    </body>
    </html>`;
}

export function podcastContents() {
    let contents = `
# the game dads

Email - emailthedads@gmail.com

Twitter - [@game_dads](https://twitter.com/game_dads)    

`;
    let poderator =  fs.readFileSync(pathUtils.htmlPath('pages/podcast/Poderator.xml')).toString();
    let xml = parse( poderator );

    let findChildByName = (parentNode:parse.Node, name:string) =>  
        parentNode.children.find((node) => node.name == name);

    let findChildrenByName = (parentNode:parse.Node, name:string) => 
        parentNode.children.filter((node) => node.name == name);
    
    let channel = findChildByName(xml.root, 'channel');
    let items = findChildrenByName(channel, 'item');

    items.forEach((item)=> {
        contents += "\n ---- ";
        
        let title = findChildByName(item, 'title').content;
        let description = findChildByName(item, 'description').content;
        let link = findChildByName(item, 'link').content;

        link = `podcast/${path.basename(link)}`;

        contents += `\n ### ${title}`;
        contents += `\n\n ${description}`;
        contents += `\n\n [listen](${link}) \n`;
    });

    return contents;
}