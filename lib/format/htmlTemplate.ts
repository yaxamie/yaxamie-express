import * as parse from 'xml-parser';
import * as markdown from './markdown';
import * as fs from 'fs';
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
    
    let channel = xml.root.children.find((node:parse.Node) => 
        node.name == 'channel'
    );

    let items = channel.children.filter((node:parse.Node) => 
        node.name == 'item');

    items.forEach((item)=> {
        contents += "\n ---- ";
        
        let title = item.children.filter((node:parse.Node) => 
            node.name == 'title'
        );
        let description = item.children.filter((node:parse.Node) => 
            node.name == 'description'
        );
        let link = item.children.filter((node:parse.Node) => 
            node.name == 'link'
        );

        contents += `\n ### ${title[0].content}`;
        contents += `\n\n ${description[0].content}`;
        contents += `\n\n [listen](${link[0].content}) \n`;
    });

    console.log(contents);
    return contents;
}