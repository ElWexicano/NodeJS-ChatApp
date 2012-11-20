/*
    Configuration File 
    Author  : Shane Doyle
    Date    : 18/11/2012
    This file is used to store the configuration
    settings for the application.
*/
module.exports = function(app, express){
  var config = this;

  app.configure(function(){
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
  });
  
  // Development Configuration
  app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  });
  
  // Production Configuration
  app.configure('production', function(){
    app.use(express.errorHandler());
  });
  
  return config;
};
