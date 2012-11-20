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

server.listen(3000);

var messages = [];
var users = [];

io.sockets.on('connection', function (socket) {

	// The User Connects
	socket.on('connect', function (user) {
		users.push(user);
		socket.broadcast.emit('user', user);
	});
	// The User Disconnects
	socket.on('disconnect', function(user) {
		// users.remove(user);
	});
	// The User sends a message
	socket.on('message', function(message) {
		messages.push(message);
		socket.broadcast.emit('message', message);
	});

	messages.forEach(function(message) {
		socket.send(message);
	}) 

	users.forEach(function(user) {
		socket.send(user);
	});
});