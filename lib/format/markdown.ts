import * as Remarkable from 'remarkable';

const options:Remarkable.Options = {
    html:true,
    xhtmlOut:true,
    typographer:true
};

const remarkable = new Remarkable(options);

export function toHtml(content:string):string {
    return remarkable.render(content);
}
