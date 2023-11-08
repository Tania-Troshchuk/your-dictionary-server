"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const middleware_1 = require("./middleware");
const routes_1 = require("./routes");
const corsOptions_1 = require("./data/corsOptions");
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)(corsOptions_1.corsOptions));
app.use('/api/registration', routes_1.registration);
app.use('/api/login', routes_1.login);
app.use('/api/words', routes_1.words);
app.use('/api/tests', routes_1.tests);
app.use('/api/text-to-speech', routes_1.textToSpeech);
app.use('/', routes_1.root);
app.use(middleware_1.serverErrorHandler);
mongoose_1.default
    .connect(process.env.MONGODB_URL)
    .then(() => {
    console.log('Successful connected to mongoDB 🌿');
    app.listen(PORT, () => console.log(`App is listening on port: ${PORT} 🚀`));
})
    .catch((error) => console.log('Can`t connect to mongoDB ❌', error));
//# sourceMappingURL=server.js.map