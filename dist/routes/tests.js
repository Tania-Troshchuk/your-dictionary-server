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
const auth_1 = require("../middleware/auth");
const objectIdHandler_1 = require("../middleware/objectIdHandler");
const middleware_1 = require("../middleware");
const models_1 = require("../models");
const router = express_1.default.Router();
router.get('/', auth_1.auth, (0, middleware_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tests = yield models_1.Test.find({ userId: req.user._id }).sort('-passingDate');
    res.send(tests);
})));
router.delete('/:id', [auth_1.auth, objectIdHandler_1.objectIdHandler], (0, middleware_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const test = yield models_1.Test.findByIdAndDelete(req.params.id);
    if (!test) {
        return res
            .status(404)
            .send(new models_1.ErrorMessage('The test with the given Id was not found'));
    }
    res.send(test);
})));
router.post('/', auth_1.auth, (0, middleware_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const test = yield models_1.Test.create({
        result: req.body.result,
        wrongWords: req.body.wrongWords,
        userId: req.user._id,
    });
    res.status(201).send(test);
})));
exports.default = router;
//# sourceMappingURL=tests.js.map