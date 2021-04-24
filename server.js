const express= require('express');
const app= express();
const http= require('http').createServer(app);

const PORT=process.env.PORT || 3100;

http.listen(PORT, () =>{
    console.log(`listening on Port ${PORT}`);
});

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) =>{
    res.sendFile(__dirname+ '/index.html');
});


//sockets setup
const io= require('socket.io')(http);

io.on('connection' ,(socket) =>{ // gets called whenever a client is connected to a browser.
    console.log('Connected...');
    socket.on('message', (msg) =>{
        socket.broadcast.emit('message', msg);
    });
});