var Datastore = require('nedb');
var validate = require("validate.js");
var path = require('path');


module.exports = class Planet{

	private ds;

	private static instance : Planet = null;

	private constructor(){		
	}


	init(db_filename : string) : Planet{
		this.ds = new Datastore({ filename: db_filename, autoload: true, timestampData: true });
		return this;
	}


	static get_instance() : Planet{
		if(this.instance == null)
			this.instance = new Planet();
		return this.instance;
	}

}

