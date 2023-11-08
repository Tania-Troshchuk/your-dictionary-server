"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test = void 0;
const mongoose_1 = require("mongoose");
const testSchema = new mongoose_1.Schema({
    result: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
    },
    wrongWords: [String],
    passingDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
});
exports.Test = (0, mongoose_1.model)('Test', testSchema);
//# sourceMappingURL=test.js.map