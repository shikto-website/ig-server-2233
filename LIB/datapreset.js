"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newRawDataPacket = exports.newDataPacket = void 0;
function newDataPacket(head, body) {
    let dp = { head, body };
    return dp;
}
exports.newDataPacket = newDataPacket;
function newRawDataPacket(head, body) {
    return JSON.stringify(newDataPacket(head, body));
}
exports.newRawDataPacket = newRawDataPacket;
