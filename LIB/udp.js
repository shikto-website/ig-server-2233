"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetPlayerSocket = exports.SendToPlayer = exports.DoTask = exports.Send = exports.On = exports.CheckMessage = void 0;
const data_preset_1 = require("./data-preset");
let TASKS = new Map();
let PLAYERSOCKETS = new Map();
async function CheckMessage(webSocket, dataPacket) {
    if (!TASKS.has(dataPacket.head)) {
        return;
    }
    let playerSocket = {
        Send: (head, body) => {
            Send(webSocket, head, body);
        },
        Send4: (head, roomTag, playerTag, body) => {
            Send4(webSocket, head, roomTag, playerTag, body);
        },
        SendObject: (head, body) => {
            Send(webSocket, head, JSON.stringify(body));
        },
        SendObject4: (head, roomTag, playerTag, body) => {
            Send4(webSocket, head, roomTag, playerTag, JSON.stringify(body));
        }
    };
    DoTask(dataPacket, playerSocket);
}
exports.CheckMessage = CheckMessage;
;
async function Send(webSocket, head, body) {
    Send4(webSocket, head, "", "", body);
}
exports.Send = Send;
async function Send4(webSocket, head, roomTag, playerTag, body) {
    webSocket.send(data_preset_1.newRawDataPacket(head, roomTag, playerTag, body));
}
async function SendToPlayer(playerTag, head, body) {
    SendToPlayer4(playerTag, head, "", "", body);
}
exports.SendToPlayer = SendToPlayer;
;
async function SendToPlayer4(playerTag, head, roomTag, playerTag_, body) {
    if (!PLAYERSOCKETS.has(playerTag)) {
        return;
    }
    PLAYERSOCKETS.get(playerTag)?.Send4(head, roomTag, playerTag_, body);
}
;
function On(trigger, task) {
    TASKS.set(trigger, task);
}
exports.On = On;
;
function SetPlayerSocket(playerTag, playerSocket) {
    PLAYERSOCKETS.set(playerTag, playerSocket);
}
exports.SetPlayerSocket = SetPlayerSocket;
;
async function DoTask(dataPacket, playerSocket) {
    if (!TASKS.has(dataPacket.head)) {
        return;
    }
    (TASKS.get(dataPacket.head) || Function)(dataPacket, playerSocket);
}
exports.DoTask = DoTask;
