"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidator = void 0;
const userValidator = (req, withUsernama) => {
    const regExp = /^[^@]*@[^@.]+\.[a-z]+$/i;
    if (withUsernama &&
        !(req.body.email || req.body.password || req.body.username)) {
        return 'Please send all required fields: username, email and password';
    }
    if (!(req.body.email || req.body.password)) {
        return 'Please send all required fields: email and password';
    }
    if (!regExp.test(req.body.email)) {
        return 'Please check the email';
    }
    if (req.body.password.length < 8) {
        return 'The password should be at least 8 characters';
    }
};
exports.userValidator = userValidator;
//# sourceMappingURL=userValidator.js.map