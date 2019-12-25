"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandom = () => {
    const str = Math.round(Math.random() * (99999 - 10000)).toString() + new Date().getTime().toString();
    return parseInt(str, 10);
};
exports.trim = (para) => {
    return para.replace(/\s+/g, '');
};
exports.getFileName = (filePath) => {
    const args = filePath.split('/');
    return args[args.length - 1];
};
exports.getTimestamp = () => {
    return Date.now() / 1000;
};
exports.getDateFormat = () => {
    const day = new Date();
    return day.toISOString().replace(/.\d{3}Z/, 'Z');
};
//# sourceMappingURL=util.js.map