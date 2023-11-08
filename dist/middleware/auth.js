"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const models_1 = require("../models");
const auth = (req, res, next) => {
    var _a;
    const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token)
        return res
            .status(401)
            .send(new models_1.ErrorMessage('Access denied. No token provided'));
    try {
        const decodedPayload = jsonwebtoken_1.default.verify(token, process.env.JWT_PRIVATE_KEY);
        req.user = decodedPayload;
        next();
    }
    catch (err) {
        res.status(400).send(new models_1.ErrorMessage(err.message));
    }
};
exports.auth = auth;
//# sourceMappingURL=auth.js.map