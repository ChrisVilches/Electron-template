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
		ds = _ds;
	}


	export function selectAll(callback){
		ds.find({}).sort({ createdAt: -1 }).exec(callback);
	}


	export function insert(user, callback){

		user = validate.cleanAttributes(user,constraints);	

		var msg : string;

		if(msg = validate(user,constraints)){
			if(callback)
				callback(msg);
			return;
		}

		ds.insert(user, callback);

	}


	export function update(query, partial_user, callback){

		partial_user = validate.cleanAttributes(partial_user,constraints);

		var msg;

		if(msg = Functions.validate_partial(partial_user,constraints)){
			if(callback)
				callback(msg);
			return;
		}

		ds.update(query, { $set: partial_user }, { upsert: false }, callback);


	}
}

