"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameData = exports.GameRoom = void 0;
var GAMEROOMS = new Map();
var DefaultEntityData = {
    "position": {
        "x": 0,
        "y": 0,
        "z": 0
    },
    "rotation": {
        "x": 0,
        "y": 0,
        "z": 0
    }
};
class GameRoom {
    constructor(tag) {
        this.roomTag = "";
        this.gameData = new GameData();
        this.playerSocketMap = new Map();
        this.syncTransformMap = new Map();
        this.playerDataMap = new Map();
        this.entityDataMap = new Map();
        this.roomTag = tag;
        GAMEROOMS.set(this.roomTag, this);
    }
    static RoomExists(_roomTag) {
        return GAMEROOMS.has(_roomTag);
    }
    static GetRoom(_roomTag) {
        return GAMEROOMS.get(_roomTag) || new GameRoom(_roomTag);
    }
    static AddRoom(_roomTag) {
        new GameRoom(_roomTag);
    }
    PlayerCount() {
        return this.playerSocketMap.size;
    }
    AddPlayerSocket(playerTag, playerSocket) {
        console.log("added player: " + playerTag);
        this.playerSocketMap.set(playerTag, playerSocket);
    }
    ForEachPlayer(action) {
        this.playerSocketMap.forEach((key, value) => {
            action(key, value);
        });
    }
    SetTransformData(id, data) {
        this.syncTransformMap.set(id, data);
    }
    SendTransformData(socket) {
        this.syncTransformMap.forEach((value, key) => {
            console.log("TS: " + key + "___" + value);
            socket.Send4("C_SYNC_TRANSFORM", "", key, value);
        });
    }
    HasEntity(entityTag) {
        return this.entityDataMap.has(entityTag);
    }
    SetEntityData(entityTag, entityData) {
        this.entityDataMap.set(entityTag, entityData);
    }
    GetEntityData(entityTag) {
        return this.entityDataMap.get(entityTag) || "";
    }
    GetAllEntityData(ignoreTag) {
        var allEntityData = "";
        this.entityDataMap.forEach((entityData, entityTag) => {
            if (entityTag != ignoreTag)
                allEntityData += entityTag + "," + entityData + ";";
        });
        return allEntityData;
    }
}
exports.GameRoom = GameRoom;
class GameData {
    constructor() {
        this.seed = 1;
    }
}
exports.GameData = GameData;
GameRoom.AddRoom("global");
