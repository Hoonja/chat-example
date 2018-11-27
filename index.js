var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var nsp = io.of('/chat');

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

nsp.on('connection', function(socket) {
  console.log('a user connected');
  socket.broadcast.emit('hi');

  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
  socket.on('CHAT_MESSAGE', function(data) {
    console.log('message: ' + JSON.stringify(data));
    nsp.emit('CHAT_MESSAGE', data);
  });
});

http.listen(3000, function () {
  console.log('listening on *:3000');
});
