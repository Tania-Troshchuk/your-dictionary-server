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
const utils_1 = require("../utils");
const router = express_1.default.Router();
router.get('/', auth_1.auth, (0, middleware_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const words = yield models_1.Word.find({ userId: req.user._id })
        .sort('-updatedAt')
        .select('_id word translation examples');
    return res.send(words);
})));
router.post('/', auth_1.auth, (0, middleware_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const error = (0, utils_1.wordValidator)(req);
    if (error) {
        return res.status(400).send(new models_1.ErrorMessage(error));
    }
    const word = yield models_1.Word.create({
        word: req.body.word,
        translation: req.body.translation,
        examples: req.body.examples,
        userId: req.user._id,
    });
    return res.status(201).send({
        word: word.word,
        translation: word.translation,
        examples: word.examples,
    });
})));
router.delete('/:id', [auth_1.auth, objectIdHandler_1.objectIdHandler], (0, middleware_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const word = yield models_1.Word.findByIdAndDelete(req.params.id);
    if (!word) {
        return res
            .status(404)
            .send(new models_1.ErrorMessage('The word with the given Id was not found'));
    }
    res.send(word);
})));
router.put('/:id', [auth_1.auth, objectIdHandler_1.objectIdHandler], (0, middleware_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const examples = req.body.examples
        ? { examples: req.body.examples }
        : { $unset: { examples: '' } };
    const word = yield models_1.Word.findByIdAndUpdate(req.params.id, Object.assign({ word: req.body.word, translation: req.body.translation }, examples), { new: true });
    if (!word) {
        return res
            .status(404)
            .send(new models_1.ErrorMessage('The word with the given Id was not found'));
    }
    res.send(word);
})));
exports.default = router;
//# sourceMappingURL=words.js.map