'use strict';

const fs = require('fs');
const exec = require('child_process').exec;
const Functions = require('electron').remote.require('./lib/functions');
const User = require('electron').remote.require('./dao/users')


$(document).ready(function(){

	var u = User.get_instance();

	exec("node -v", function(error, stdout, stderr){
		$("#node_version").html(stdout);
	});

	u.selectAll(function(err, users){
		if(err){
			throw err;
		}

		var str = "";
		
		for(var i in users){
			str += users[i].createdAt + " " + users[i].name + " " + users[i].surname + "<br/>";
		}

		$("#user_list").html(str);

	});


	$("#user_list")


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

			if(doc){
				console.log(doc);
			}

		});

	});



});

