var io = require('socket.io-emitter')({ host: '127.0.0.1', port: 32768 });
io.redis.on('error', function(err) {
  console.error(err);
});

var nsp = io.of('/chat');

setInterval(function () {
  console.log('before sending CHAT_MESSAGE')
  nsp.emit('CHAT_MESSAGE', { message: new Date });
}, 5000);