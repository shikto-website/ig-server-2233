"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newRawDataPacket = exports.newDataPacket = void 0;
function newDataPacket(head, roomTag, playerTag, body) {
    let dp = { head, roomTag, playerTag, body };
    return dp;
}
exports.newDataPacket = newDataPacket;
function newRawDataPacket(head, roomTag, playerTag, body) {
    return JSON.stringify(newDataPacket(head, roomTag, playerTag, body));
}
exports.newRawDataPacket = newRawDataPacket;
