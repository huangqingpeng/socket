//连接服务器
let ws = new WebSocket('ws://127.0.0.1:9000')

//客户端
ws.onopen = () => {
    console.log(0);

    //ws.send('hollow word')
}

ws.onmessage = e => {
    console.log(e.data);
    let chatroom = document.querySelector('#room')
    chatroom.innerHTML += e.data + '<br />'
}

ws.onclose = () => {
    console.log('‘服务关闭’')
}

ws.onerror = err => {
    console.log(err)
}