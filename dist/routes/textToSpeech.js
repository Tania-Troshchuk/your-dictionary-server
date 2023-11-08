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
const text_to_speech_1 = require("@google-cloud/text-to-speech");
const google_auth_library_1 = require("google-auth-library");
const middleware_1 = require("../middleware");
const utils_1 = require("../utils");
const router = express_1.default.Router();
router.post('/', auth_1.auth, (0, middleware_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const text = req.body.text;
    const jsonStr = yield (0, utils_1.decryptFile)('googleKey.json.secure');
    const authClient = google_auth_library_1.auth.fromJSON(JSON.parse(jsonStr));
    const client = new text_to_speech_1.TextToSpeechClient({ authClient });
    function convertToSpeech() {
        return __awaiter(this, void 0, void 0, function* () {
            const request = {
                input: { text: text },
                voice: { languageCode: 'en-US', ssmlGender: 'MALE' },
                audioConfig: { audioEncoding: 'LINEAR16' },
            };
            const [response] = yield client.synthesizeSpeech(request);
            return response;
        });
    }
    const speechResponse = yield convertToSpeech();
    const audioBuffer = speechResponse.audioContent;
    res.setHeader('Content-Type', 'audio/wav');
    res.setHeader('Content-Disposition', 'attachment; filename=audio.wav');
    res.send(audioBuffer);
})));
exports.default = router;
//# sourceMappingURL=textToSpeech.js.map