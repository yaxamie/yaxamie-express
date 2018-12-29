"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Remarkable = require("remarkable");
const options = {
    html: true,
    xhtmlOut: true,
    typographer: true
};
const remarkable = new Remarkable(options);
function toHtml(content) {
    return remarkable.render(content);
}
exports.toHtml = toHtml;
//# sourceMappingURL=markdown.js.map