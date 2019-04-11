//服务端socket

let net = require('net')
let port = 9000
let host = '127.0.0.1'

//创建服务
let chartServer = net.createServer()

//存放客户端传来内容
let clientMap = new Object()

let i = 0
chartServer.on('connection', (client) => {
    console.log('客户端有人连接进来')
    client.name = ++i

    clientMap[client.name] = client

    //客户端发送消息的监听
    client.on('data', (data) => {
        console.log('客户端传来消息：' + data)

        broadcost(data, client)
    })

    //数据错误事件处理
    client.on('err', (exception) => {
        console.log('client err' + err)
        client.end()
    })

    //客户端事件处理
    client.on('close', (data) => {
        console.log(client.name + '下线了')
        delete clientMap[client.name]
        broadcost(clicnt.name + '下线了', client)
    })

    function broadcost(message, client) {
        for (let key in clientMap) {
            clientMap[key].write(client.name + '我是server,say:' + message + '\n')
        }
    }
})

chartServer.listen(9000)