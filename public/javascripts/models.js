function User(name) {
    var self = this;
    self.name = name;
	self.onlineSince = getCurrentTime();
}

User.prototype.toJSON = function() {
    var data = {};
    data.name = this.name;
    data.onlineSince = this.onlineSince;
    return data;
};

User.create = function(data) {
	var user = new User(data.name);
	user.onlineSince = data.onlineSince;
	return user;
};


function Message(content, user) {
	var self = this;
	self.content = content;
	self.user = user;
	self.time = getCurrentTime();
}

Message.prototype.toJSON = function() {
	var data = new Message(this.content, this.user);
	data.time = this.time;
	return data;
};

Message.create = function(data) {
	var message = new Message(data.content, data.user);
	message.time = data.time;
	return message;
};

function getCurrentTime() {
    var date = new Date();
	var hours = date.getHours();
	var minutes = date.getMinutes();
	if (minutes < 10){
		minutes = "0" + minutes;
	}
	return hours + ":" + minutes;
}