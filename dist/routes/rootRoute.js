"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Routes {
    addRoutes(app) {
        app.route('/')
            .get((req, res) => {
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            });
        });
        app.route('/test')
            .get((req, res) => {
            res.send("hi!");
        });
    }
}
exports.Routes = Routes;
//# sourceMappingURL=rootRoute.js.map