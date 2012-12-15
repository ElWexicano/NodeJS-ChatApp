/*
    Application File 
    Author  : Shane Doyle
    Date    : 18/11/2012
    This file is used to run the application.
*/
var express = require('express');
var app = module.exports = express();
var config = require('./config.js')(app, express);

require('./routes/routes')(app);

var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);

var port = process.env.PORT;

server.listen(port);

var messages = [];
var users = [];

io.sockets.on('connection', function (socket) {

	// The User sends a message.
	socket.on('message', function(message) {
		messages.push(message);
		socket.broadcast.emit('message', message);
	});
    
    // A new user connects.
    socket.on('connect', function(user) {
       users.push(user);
       socket.broadcast.emit('user', user);
    });
    
    // A user disconnects.
    socket.on('disconnect', function(user) {
        users.splice(users.indexOf(user), 1);
    });

    // Send message to any new users.
	messages.forEach(function(message) {
		socket.send(message);
	});
    
    // Send a list of the users currently connected to new users.
    users.forEach(function(user) {
        socket.send(user);
    });
    
});