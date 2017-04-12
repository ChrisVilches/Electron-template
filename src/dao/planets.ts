var Datastore = require('nedb');
var validate = require("validate.js");
var path = require('path');


export module Planet{

	var ds;

	export function init(_ds){
		ds = _ds;		
	}

}

