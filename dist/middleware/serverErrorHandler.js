"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverErrorHandler = void 0;
const models_1 = require("../models");
const serverErrorHandler = (err, req, res) => {
    console.log(err);
    res.status(500).send(new models_1.ErrorMessage(err.message));
};
exports.serverErrorHandler = serverErrorHandler;
//# sourceMappingURL=serverErrorHandler.js.map