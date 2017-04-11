'use strict';

var electron = require('electron');
var BrowserWindow = electron.BrowserWindow;
var validate = require("validate.js");

export module Functions {

	export function double(a : number) : number{
		return a * 2;
	}

	export function sum(a : number, b : number) : number{
		return a + b;
	}

	export function create_window(website : string) : void{
		let win = new BrowserWindow({width: 800, height: 600});
		win.loadURL(website);
	}

	// Doesn't validate subkeys
	export function validate_partial(obj, constraints){

		if(typeof obj === "undefined") return undefined;
		if(typeof constraints === "undefined") return undefined;

		var msgs = [];

		Object.keys(constraints).map(function(field){

			var msg = validate.single(obj[field], constraints[field]);

			if(obj.hasOwnProperty(field) && msg)
				msgs.push(msg);

		});

		if(msgs.length == 0) return undefined;

		return msgs;
	};

};

