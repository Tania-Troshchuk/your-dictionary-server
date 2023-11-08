"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Word = void 0;
const mongoose_1 = require("mongoose");
const wordSchema = new mongoose_1.Schema({
    word: {
        type: String,
        required: true,
        trim: true,
    },
    translation: {
        type: String,
        required: true,
        trim: true,
    },
    examples: {
        type: String,
        maxlength: 300,
        trim: true,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
}, {
    timestamps: true,
});
exports.Word = (0, mongoose_1.model)('Word', wordSchema);
//# sourceMappingURL=word.js.map