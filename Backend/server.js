const http = require('http');
const express = require('express');
const socketio = require('socket.io');

let noOfPplConnected = 0 ;
const app = express();
let IPs = [];
const clientPath = `${__dirname}/../Frontend/dist`

app.use(express.static(clientPath));
const server = http.createServer(app);

const io = socketio(server);

io.on('connection', (sock)=>{
    var address = sock.handshake.address;

    console.log(`Connection detected, ${address.slice(7)} has joined.`)

    if(IPs.includes(address)==false){
        IPs.push(address);
        noOfPplConnected+=1;
        io.emit('noOfPpl',noOfPplConnected);
    }

    sock.emit('message', 'You are connected!');

    sock.on('message', (text)=>{(
        io.emit('message', text));
    })

    server.on('error', (err)=>{
        console.error("server error: ", err);
    })

    server.listen(8080, ()=>{
        console.log('Game online:8080')
    })
})


