"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const middleware_1 = require("../middleware");
const models_1 = require("../models");
const utils_1 = require("../utils");
const router = express_1.default.Router();
router.post('/', (0, middleware_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const error = (0, utils_1.userValidator)(req, true);
    if (error) {
        return res.status(400).send(new models_1.ErrorMessage(error));
    }
    const existUser = yield models_1.User.findOne({ email: req.body.email });
    if (existUser) {
        return res
            .status(400)
            .send(new models_1.ErrorMessage('User with this email already exist'));
    }
    const salt = yield bcrypt_1.default.genSalt();
    const hashPassword = yield bcrypt_1.default.hash(req.body.password, salt);
    const user = yield models_1.User.create({
        username: req.body.username,
        email: req.body.email,
        password: hashPassword,
    });
    const token = user.generateAuthToken();
    return res.status(201).send({ token: token });
})));
exports.default = router;
//# sourceMappingURL=registration.js.map