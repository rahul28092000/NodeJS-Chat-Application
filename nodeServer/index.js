//This is the node server fro my RD-ChatApp application
const io = require('socket.io')(5300)
const users = {};
io.on('connection', socket =>
{
    //If a new user joins the chat, then the other online users of the chat can be notified
    socket.on('new-user-joined', name =>
    {
       //console.log('new-user-joined', name)
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });
    //if someone sends any mssg, then the others will be notified
    socket.on('send', message =>
    {
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });
    //now if someone leaves the chat room then the others will be notified
    socket.on('disconnect', message =>
    {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
}) 