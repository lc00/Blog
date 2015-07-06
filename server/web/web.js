var express = require('express');
var clientDir = process.env.CLIENT_DIR;

var webRoutes = function(app){
	app.use('/lib', express.static(__dirname + '/../../bower_components'));
	app.use(express.static(__dirname + '/../../client/' + clientDir));

	// Our get request for viewing the main page
	app.get('*', function(req, res){
		var options = {
			root: __dirname + '../../client/' + clientDir,
			dotfiles: 'deny'
		};
 
    res.sendFile('index.html', options, function(err){
    	if(err) return res.sendStatus(err.status);
    	console.log('index.html is sent');
    });
  });
	
};

module.exports = webRoutes;
