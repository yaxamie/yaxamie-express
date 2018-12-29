"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("../pathUtils");
class TestRoutes {
    addRoutes(app) {
        app.route('/test')
            .get((req, res) => {
            res.sendFile(path.htmlPath('test.html'));
        });
        app.route('/render')
            .get((req, res) => {
            res.render('hello world', {
                dynamic: 'extra stuff'
            });
        });
        app.route('/send')
            .get((req, res) => {
            const literal = `<h1>hi</h1>
                what's up with you?`;
            res.send(literal);
        });
    }
}
exports.TestRoutes = TestRoutes;
//# sourceMappingURL=testRoutes.js.map