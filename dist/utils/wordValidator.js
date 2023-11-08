"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wordValidator = void 0;
const wordValidator = (req) => {
    var _a;
    if (!(req.body.word || req.body.translation)) {
        return 'Please send all required fields: word and translation';
    }
    if (((_a = req.body.examples) === null || _a === void 0 ? void 0 : _a.length) > 300) {
        return 'The examples should be less than 300 characters';
    }
};
exports.wordValidator = wordValidator;
//# sourceMappingURL=wordValidator.js.map