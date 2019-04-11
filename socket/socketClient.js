let net = require('net')
let port = 9000
let host = '127.0.0.1'


let client = new net.Socket()

client.setEncoding('utf-8')

//连接到服务端
client.connect(port, host, () => {
    client.write('client你好吗？')
})


client.on('data', (data) => {
    console.log('server服务端传来消息：' + data)
    say()
})

//服务端报错
client.on('err', (exception) => {
    console.log('server err' + err)

})

//服务端关闭事件处理
client.on('close', (data) => {
    console.log('服务端关闭了')
})

let readline = require('readline')

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function say() {
    rl.question('请输入：', (inputstr) => {
        if (inputstr != 'bye') {
            client.write(inputstr + '\n')
        } else {
            client.destroy() //关闭连接
            rl.close()
        }
    })
}