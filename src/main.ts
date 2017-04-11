'use strict';

var electron = require('electron');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var mainWindow = null;
var Functions = require('./lib/functions');
var Planet = require('./dao/planets');
var User = require('./dao/users');


var db = {
	users: User.get_instance().init(__dirname + "/../db/users.db"),
	planets: Planet.get_instance().init(__dirname + "/../db/planets.db")
};



app.on('window-all-closed', function() {
	if (process.platform != 'darwin')
		app.quit();
});

app.on('ready', function() {

	mainWindow = new BrowserWindow({width: 800, height: 600});
	mainWindow.loadURL('file://' + __dirname + '/../renderer/index.html');

	mainWindow.on('closed', function() {
		mainWindow = null;
	});

});


