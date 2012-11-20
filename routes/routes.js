/*
    Application Routes
    Author  : Shane Doyle
    Date    : 18/11/2012
    This file is used to store the routes
    for the application.
*/
module.exports = function(app) {
	
	var title = 'The Node Chat App';
	
	// The default route
	app.get('/', function(req, res) {
		res.render('index.jade', {
			title: title
		});
	});
	
};