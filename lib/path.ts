import * as path from 'path';

export function htmlPath(file:string) {
    return path.resolve(__dirname, "../html", file);
}