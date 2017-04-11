var validate = require("validate.js");
var path = require('path');
import { Functions } from '../lib/functions'

export module User {

	var ds;

	var constraints = {
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

	export function init(_ds){
		this.ds = _ds;
	}


	export function selectAll(callback){
		this.ds.find({}).sort({ createdAt: -1 }).exec(callback);
	}


	export function insert(user, callback){

		user = validate.cleanAttributes(user,this.constraints);	

		var msg : string;

		if(msg = validate(user,this.constraints)){
			if(callback)
				callback(msg);
			return;
		}

		this.ds.insert(user, callback);

	}


	export function update(query, partial_user, callback){

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

