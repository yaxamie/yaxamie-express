"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function standard(title, body, footer) {
    return `<!DOCTYPE html><html>
    <head>
    <title>${title}</title>
    <meta name="viewport" content="initial-scale=1, maximum-scale=1"/>
    <link rel="stylesheet" type="text/css" href="css/plain.css"/>
    <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32" />
    <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16" />
    </head>

    <body>

    <div class="page">
        <h1>${title}</h1>
        ${body}
        <div class="footer">
        ${footer}
        </div>
    </div>

    </body>
    </html>`;
}
exports.standard = standard;
//# sourceMappingURL=htmlTemplate.js.map