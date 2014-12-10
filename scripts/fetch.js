module.exports = function() {
	var fs = require("fs");
		XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
	return {
		"name": "fetch",
		"trigger": new RegExp("^.fetch\\b", "i"),
		"action": function (arguments) {
			var arguments = arguments.trim();
			if (!arguments) {
				return "Fetch what, onii-chan?";
			} else {
				var arguments = arguments.split(" ");
			};
			var	api = ["active_skills","awakenings","evolutions","leader_skills","monsters"];
				target = [];
			
			for (i = 0; i < arguments.length; i++) {
				if (api.indexOf(arguments[i]) >= 0) {
					target.push(api[api.indexOf(arguments[i])]);
				};
			};
			
			var xhr = [];
				url = [];
				
			if (target.length > 0) {
				for (i = 0; i < target.length; i++) {
					(function (i) {
						xhr[i] = new XMLHttpRequest();
						url[i] = "https://www.padherder.com/api/" + target[i] + "/"
						xhr[i].open("GET", url[i], true);
						xhr[i].onreadystatechange = function() {
							if (xhr[i].readyState == 4 && xhr[i].status == 200) {
								response = JSON.parse(xhr[i].responseText);
									data = [];
								for (j = 0; j < response.length; j++) {
									if (response[j].id) {
										data[response[j].id] = response[j];
									} else {
										data = response;
										break;
									};
								};
								fs.writeFile("./data/" + target[i] + ".js", JSON.stringify(data), function(err) {
									if (err) throw err;
									//console.log(target[i] + " saved to file!");
								});
							};
						};
						xhr[i].send();
					})(i);
				};
				fileResponse = target.slice(0);
				fileResponse[0] = fileResponse[0].charAt(0).toUpperCase() + fileResponse[0].slice(1);
				fileResponse[fileResponse.length - 1] = "and " + fileResponse[fileResponse.length - 1];
				return fileResponse.join(", ") + " saved to file!";
			} else {
				return "Onii-chan check your spelling!";
			};
		},
	};
};
