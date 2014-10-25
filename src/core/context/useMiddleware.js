var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express = require('express');
var api=require('../app/api.js');
var cfg= global.config;
//var session= require('./session.js');
var session = require('express-session')
var useSocket= require('./useSocket.js');


module.exports=function(app){
	
	app.use(logger('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(cookieParser());
	//app.use((new session(cfg.session)).maker());
	app.use(session({secret: 'keyboard cat'}))
	app.use(useSocket.maker());
	
	app.use(express.static(cfg.static));
	
	/*
	var i=0;
	app.use(function(req, res, next) {
		console.log(i++);
		next();
	});
	*/
	
	for(var x in api) if(api[x]) {
		app.use(x, api[x]);
	}
	
	
	app.use(function(req, res, next) {
		var err = new Error('Not Found');
		err.status = 404;
		next(err);
	});
	
	app.use(function(err, req, res, next) {
		console.log(err);
	});
	
	

	
	
	
}