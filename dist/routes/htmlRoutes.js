"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pathUtils_1 = require("../pathUtils");
const htmlTemplate = require("../format/htmlTemplate");
const fs = require("fs");
const markdown = require("../format/markdown");
;
class HtmlRoutes {
    addRoutes(app) {
        this.index(app);
        this.cv(app);
    }
    ;
    index(app) {
        const contents = {
            route: '/',
            page: 'index.md',
            title: 'yaxamie',
            footer: '~rusty parks'
        };
        this.addRoute(app, contents);
    }
    cv(app) {
        const contents = {
            route: '/cv',
            page: 'cv.html',
            title: 'cv',
            footer: this.linkHome()
        };
        this.addRoute(app, contents);
    }
    linkHome() {
        return `<a href="/">home</a>`;
    }
    addRoute(app, contents) {
        const { title, footer, page } = contents;
        let body = fs.readFileSync(pathUtils_1.htmlPath(`static/pages/${page}`)).toString();
        if (page.endsWith('.md')) {
            body = markdown.toHtml(body);
        }
        const pageContents = htmlTemplate.standard(title, body, footer);
        app.route(contents.route)
            .get((req, res) => {
            res.send(pageContents);
        });
    }
}
exports.HtmlRoutes = HtmlRoutes;
//# sourceMappingURL=htmlRoutes.js.map