var express = require('express');

var webRoutes = function(app){
	app.use('/', express.static(__dirname + '/../../client'));
	app.use('/lib', express.static(__dirname + '/../../bower_components'));

	
	// Our get request for viewing the main page
	app.get('*', function(req, res){
    res.sendFile('index.html', {'root': './client'});
  });
	
};

module.exports = webRoutes;
