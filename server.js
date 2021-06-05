var tasks = require("./LIB/tasks.js")
var qs = require("./LIB/qs.js")
var udp_ = require("./LIB/udp.js")
const dgram = require("dgram")
const udp = dgram.createSocket("udp4");
const WebSocket = require("ws");
const { send } = require("process");
const wss = new WebSocket.Server({port:3000}, ()=>{
    console.log("server started")
})

tasks.Initialize(qs, udp_)

udp.on("listening", ()=>{
    const address = udp.address().address;
    console.log("udp listening on: " + address);
})
udp.on("message", (message, senderInfo)=>{
    var dataPacket = JSON.parse(message)
    console.log("UDP_RECEIVE: " + message);
    if(dataPacket != null){
        udp_.CheckMessage({
            send(_message){
                console.log("UDP_SEND__: " + _message)
                udp.send(_message, senderInfo.port, senderInfo.address, ()=>{});
            }
        }, dataPacket)
    }
})

udp.bind(5500)

wss.on("connection", (ws)=>{
    console.log("new connection")
    qs.CheckMessage(ws, {
        "head":"connection",
        "body":""
    })

    ws.on("message", (data)=>{
        console.log(data);
        var dataPacket = JSON.parse(data)
        if(dataPacket != null){
            qs.CheckMessage(ws, dataPacket)
        }
    })

    ws.on("close", (data)=>{
        qs.CheckMessage(ws, {
            "head":"disconnect",
            "body":""
        })
    })
})

wss.on("listening", ()=>{
    console.log("listening at port 3000")
})