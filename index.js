const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const data = require('./data.json');

const app = express();

const server = http.createServer(app);

const io = socketIo(server);

let interval;

io.on('connection', (socket) => {
  console.log('New client connected');
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 5000); //by this function data will stream in 5 second continuesly...
  socket.on('disconnect', () => {
    console.log('Client disconnected');
    clearInterval(interval);
  });
});

let index = 0;
const getApiAndEmit = (socket) => {

  if(index === 15){
    index= 0;
  }

    socket.emit('streamData', data[index]);
  
    index= index+1;
};

const PORT = 7000 || process.env.PORT;

server.listen(PORT, () => {
  console.log('server start running....');
});