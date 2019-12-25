"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const context_1 = require("../data/context");
exports.LoggerLevel = {
    DEBUG: 'D',
    INFO: 'I',
    ERROR: 'E',
    WARN: 'W',
    CONSOLE: 'C'
};
const getDate = () => {
    const date = new Date();
    return date.toLocaleDateString();
};
exports.logInfo = (tag = context_1.scenario.pickle.name, message) => {
    const logStr = messageFormatter(tag, exports.LoggerLevel.INFO, message);
    console.log(logStr);
    context_1.context.attach(logStr);
};
exports.logDebug = (tag = context_1.scenario.pickle.name, message) => {
    const logStr = messageFormatter(tag, exports.LoggerLevel.DEBUG, message);
    console.debug(logStr);
};
exports.logError = (tag = context_1.scenario.pickle.name, message) => {
    const logStr = messageFormatter(tag, exports.LoggerLevel.ERROR, message);
    console.error(logStr);
    context_1.context.attach(logStr);
};
exports.logWarn = (tag = context_1.scenario.pickle.name, message) => {
    const logStr = messageFormatter(tag, exports.LoggerLevel.WARN, message);
    console.warn(logStr);
    context_1.context.attach(logStr);
};
exports.logConsole = (tag = context_1.scenario.pickle.name, message) => {
    const logStr = messageFormatter(tag, exports.LoggerLevel.CONSOLE, message);
    console.log(logStr);
};
const messageFormatter = (tag, level, message) => {
    return `[${getDate()}]${level}/${tag} ${message}`;
};
exports.logBulkInfo = (tag = context_1.scenario.pickle.name, level, message) => {
    const preStr = `[${getDate()}] ${level}/${tag}`;
    console.log(preStr);
    console.log(message);
};
//# sourceMappingURL=logger.js.map