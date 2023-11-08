"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = void 0;
exports.corsOptions = {
    origin: [
        'http://localhost:3000',
        'http://127.0.0.1:5173',
        'http://localhost:5173',
        'https://tania-troshchuk.github.io',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type, Authorization'],
    credentials: true,
};
//# sourceMappingURL=corsOptions.js.map