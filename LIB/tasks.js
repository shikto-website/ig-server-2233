"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitializeUDP = exports.InitializeWS = exports.Initialize = void 0;
const gameroom_1 = require("./gameroom");
var WS;
var UDP;
function Initialize(ws, udp) {
    WS = ws;
    UDP = udp;
    InitializeWS();
    InitializeUDP();
}
exports.Initialize = Initialize;
function InitializeWS() {
    WS.On("connection", (dataPacket, playerSocket) => {
    });
    WS.On("S_JOIN_GAMEROOM", (dataPacket, playerSocket) => {
        console.log("try join room: " + dataPacket.roomTag);
        gameroom_1.GameRoom.GetRoom(dataPacket.roomTag).AddPlayerSocket(dataPacket.playerTag, playerSocket);
        playerSocket.Send4("C_JOIN_GAMEROOM", dataPacket.roomTag, "", "");
    });
    WS.On("S_CREATE_SYNC_OBJECT", (dataPacket, playerSocket) => {
        console.log("O__ " + JSON.stringify(dataPacket));
        console.log("total: " + gameroom_1.GameRoom.GetRoom(dataPacket.roomTag).PlayerCount());
        gameroom_1.GameRoom.GetRoom(dataPacket.roomTag).ForEachPlayer((socket, tag) => {
            console.log("S__ " + JSON.stringify(tag + " __ " + dataPacket.playerTag + " __ " + dataPacket.body));
            socket.Send4("C_CREATE_SYNC_OBJECT", "", dataPacket.playerTag, dataPacket.body);
        });
    });
}
exports.InitializeWS = InitializeWS;
function InitializeUDP() {
    UDP.On("S_SYNC_TRANSFORM", (dataPacket, playerSocket) => {
        console.log("TO__ " + JSON.stringify(dataPacket));
        gameroom_1.GameRoom.GetRoom(dataPacket.roomTag).SetTransformData(dataPacket.playerTag, dataPacket.body);
        gameroom_1.GameRoom.GetRoom(dataPacket.roomTag).SendTransformData(playerSocket);
    });
}
exports.InitializeUDP = InitializeUDP;
