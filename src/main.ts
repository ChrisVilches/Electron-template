'use strict';

var electron = require('electron');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var mainWindow = null;
var path = require('path');
var Datastore = require('nedb');

import { User } from './dao/users';
import { Planet } from './dao/planets';


function open_db(file_name, module){
	file_name = path.join('db', file_name);	
	var ds = new Datastore({ filename: file_name, autoload: true, timestampData: true });
	module.init(ds);
}

open_db('planets.db', Planet);
open_db('users.db', User);




app.on('window-all-closed', function() {
	if (process.platform != 'darwin')
		app.quit();
});

app.on('ready', function() {

	mainWindow = new BrowserWindow({width: 800, height: 600});
	mainWindow.loadURL(path.join('file://', __dirname, '/../renderer/index.html'));

	mainWindow.on('closed', function() {
		mainWindow = null;
	});

});

