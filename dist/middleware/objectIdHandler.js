"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectIdHandler = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("../models");
const objectIdHandler = (req, res, next) => {
    if (!mongoose_1.default.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send(new models_1.ErrorMessage('Invalid Id'));
    }
    next();
};
exports.objectIdHandler = objectIdHandler;
//# sourceMappingURL=objectIdHandler.js.map