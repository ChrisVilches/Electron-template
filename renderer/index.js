'use strict';

const fs = require('fs');
const exec = require('child_process').exec;
const Functions = require('electron').remote.require('./lib/functions');
const User = require('electron').remote.require('./dao/users')
var user_list_template = null;
var users = null;

$(document).ready(function(){

	user_list_template = Handlebars.compile($("#user_list_template").html());



	var u = User.get_instance();

	exec("node -v", function(error, stdout, stderr){
		$("#node_version").html(stdout);
	});

	u.selectAll(function(err, res){
		if(err){
			throw err;
		}

		users = res;		

		$("#user_list").html(user_list_template({ users }));

	});





	$("#get_sum_btn").click(function(){

		var a = Number($("#sum_a").val());
		var b = Number($("#sum_b").val());
		var c = Functions.sum(a, b);
		$("#sum_response").html(c);

	});


	$("#create_new_window").click(function(){
		Functions.create_window($("#new_window_url").val());
	});


	$("#add_user").click(function(){	
		

		var name = $("#name").val();
		var surname = $("#surname").val();

		name = name.trim();
		surname = surname.trim();


		u.insert({
			name: name,
			surname: surname
		}, function(err, doc){

			if(err){
				console.log(err);
			}

			users.push(doc);

			$("#user_list").html(user_list_template({ users }));

		});

	});



});

