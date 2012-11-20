$(function() {
    
    var chat = new ViewModel();
    var messageInput = $('#message');
    var socket = io.connect();

    var user = new User("Shane");
    chat.addUser(user);

    socket.on('connect', function () {
        socket.emit('connect', JSON.stringify(user));
        console.log('connected!');
    });

    socket.on('disconnect', function() {
        socket.emit('disconnect', user);
        console.log('disconnected!');
    });

    socket.on('message', function(message) {
        var message = Message.create(JSON.parse(message));
        chat.addMessage(message);
    });

    socket.on('user', function(user) {
        var user = User.create(JSON.parse(user));
        chat.addUser(user);
    });

    messageInput.keypress( function(e) {
        if(e.which === 13) {
            var message = new Message(messageInput.val(), user.name)
            chat.addMessage(message);
            socket.emit('message', JSON.stringify(message));
            messageInput.val('');
        }
    });

    // Initialize View Model
	ko.applyBindings(chat);
});