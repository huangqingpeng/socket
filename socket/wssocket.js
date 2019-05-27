//tcp协议

let WebSocketServer = require('ws').Server

//创建服务
let wss = new WebSocketServer({
    port: 9000
})

//存放客户端传来内容
let clientMap = new Object()

let i = 0
    //监听客户端上线
wss.on('connection', (ws) => {
    console.log(ws + '上线')
    ws.name = ++i
    clientMap[ws.name] = ws
    ws.on('message', (msg) => {
            console.log(msg)
            broadcast(msg, ws)
        })
        // ws.on('close', () => {
        //     console.log('有人离开');
        // })
        // ws.send('你好')
})

//存放数据
function broadcast(msg, ws) {
    for (let key in clientMap) {
        clientMap[key].send(ws.name + '说：' + msg)
    }
}