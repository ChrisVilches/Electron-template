'use strict';

var electron = require('electron');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var mainWindow = null;
const Functions = require('./lib/functions');
const Planet = require('./dao/planets');
const User = require('./dao/users');



var db = {
	users: User.get_instance().init(__dirname + "/../db/users.db"),
	planets: Planet.get_instance().init(__dirname + "/../db/planets.db")
};




db.users.insert({name: "agregado", surname: "sinprint", hola:"adios"});

db.users.update({_id: 'dOLAkDpKGaCoNudo' }, { surname: 'xDxDxDxD', mojon:"caca" });



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

