"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateInput = void 0;
var express_validator_1 = require("express-validator");
// validationResult: extracts the validation errors from a request and makes them available in a Result object.
var validateInput = function (req, res, next) {
    var errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    next();
};
exports.validateInput = validateInput;
