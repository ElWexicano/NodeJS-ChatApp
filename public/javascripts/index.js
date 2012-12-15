$(function() {
    var messageInput = $('#message');
    var socket = io.connect();
    var user;

    socket.on('connect', function () {
        if(user!=undefined) {
            socket.emit('connect', JSON.stringify(user));
        }
    });

    socket.on('disconnect', function() {
        socket.emit('disconnect', user);
    });

    socket.on('message', function(message) {
        var message = Message.create(JSON.parse(message));
        chat.addMessage(message);
    });

    socket.on('user', function(user) {
        console.log(user);
        chat.addUser(User.create(JSON.parse(user)));
    });

    messageInput.keypress( function(e) {
        if(e.which === 13) {
            var message = new Message(messageInput.val(), chat.username())
            chat.addMessage(message);
            socket.emit('message', JSON.stringify(message));
            messageInput.val('');
        }
    });
    
    function ViewModel() {
        var self = this;
        self.messages = ko.observableArray();
        self.showMessageInput = ko.observable(false);
        self.users = ko.observableArray();
        self.username = ko.observable('');
        
        // Adds a new message to the list of messages.
        self.addMessage = function(message) {
        	self.messages.push(message);
        };
        
        // Adds a new user to the list of users.
        self.addUser = function(user) {
        	self.users.push(user);
        };
        
        // Used to check if a username is correct.
        self.checkUsername = function() {
            if (self.username().length > 1) {
                user = new User(self.username());
                self.addUser(user);
                self.showMessageInput(true);
                socket.emit('connect', JSON.stringify(user));
            }
        };
        
        // Returns a String with the number of users currently online
        self.numberUsers = ko.computed(function() {
            var numUsers = self.users().length;
    
            if(numUsers==1) {
                return numUsers + " User Online";
            } else {
                return numUsers + " Users Online";
            }
        });
    }
    
    var chat = new ViewModel();
	ko.applyBindings(chat);
});