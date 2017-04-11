var Datastore = require('nedb');
var validate = require("validate.js");
var path = require('path');

module.exports = class User{

	// Doesn't validate subkeys
	private validate_partial(obj, constraints){

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


	private ds;

	private static instance : User = null;

	private constraints = {
			name: {
				presence: true,
				format: {
					pattern: "^[a-z]{1,20}$",
					flags: "i",
					message: "Can only contain 1-20 letters."
				},
				exclusion: {
					within: ["devil", "diarrhea", "vomit"],
					message: "'%{value}' is not allowed."
				}
			},
			surname: {
				presence: true,
				format: {
					pattern: "^[a-z]{1,20}$",
					flags: "i",
					message: "Can only contain 1-20 letters."
				},
				exclusion: {
					within: ["devil", "diarrhea", "vomit"],
					message: "'%{value}' is not allowed."
				}
			},
			lugar: {
				presence: false
			}
		};

	private constructor(){		
	}


	init(db_filename : string) : User{
		this.ds = new Datastore({ filename: db_filename, autoload: true, timestampData: true });
		return this;
	}


	static get_instance() : User{
		if(this.instance == null)
			this.instance = new User();
		return this.instance;
	}


	selectAll(callback){
		this.ds.find({}).sort({ createdAt: -1 }).exec(callback);
	}



	insert(user, callback){

		user = validate.cleanAttributes(user,this.constraints);	

		var msg : string;

		if(msg = validate(user,this.constraints)){
			if(callback)
				callback(msg);
			return;
		}

		this.ds.insert(user, callback);

	}


	update(query, partial_user, callback){

		partial_user = validate.cleanAttributes(partial_user,this.constraints);

		var msg;

		if(msg = this.validate_partial(partial_user,this.constraints)){
			if(callback)
				callback(msg);
			return;
		}

		this.ds.update(query, { $set: partial_user }, { upsert: false }, callback);


	}
}

