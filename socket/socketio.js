//兼容低版本浏览器

let app = require('express')()

let http = require('http').Server(app)

let io = require('socket.io')(http)

let fs = require('fs')

//http

app.get('/', (req, res) => {
    //res.send('ok')
    function callback(data) {
        res.send(data.toString())
    }

    fs.readFile('./socketio.html', (err, data) => {
        if (err) {
            console.log(err)
            callback('文件不存在')
            return
        }
        callback(data)

    })
})


//socket.io 设置

//在线用户的存储
let onlineuser = {}

let onlinecount = 0

let i = 0

io.on('connection', so => {
    console.log('欢迎新用户的加入')
    so.name = ++i
    onlineuser[so.name] = so

    so.on('disconnect', () => {
        console.log('有人退出')
        delete onlineuser[so.name]
    })

    so.on('message', (msg) => {
        boradcast(msg, so)
    })

    function boradcast(msg, so) {
        for (let key in onlineuser) {
            onlineuser[key].send(so.name + "说：" + msg)
        }
    }
})


http.listen(9000, () => {
    console.log('listen 9000')
})