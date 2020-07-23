const express = require('express');
const socket = require('socket.io');
const morgan = require('morgan')

const app = express();

const port  = process.env.PORT || 5000;

const server = app.listen(port, () => console.log(`Running on port ${port}`));

app.use(express.static('public'));
app.use(morgan('dev'));

const io = socket(server);

io.on('connection', socket => {
    console.log('Socket connection', socket.id);

    socket.on('chat', data => io.sockets.emit('chat', data));
    socket.on('typing', data => {
        socket.broadcast.emit('typing', data);
    })
});