'use strict';

var electron = require('electron');
var BrowserWindow = electron.BrowserWindow;

module.exports = class Functions {

	static double(a : number) : number{
		return a * 2;
	}

	static sum(a : number, b : number) : number{
		return a + b;
	}

	static create_window(website : string) : void{
		let win = new BrowserWindow({width: 800, height: 600});
		win.loadURL(website);
	}

};

