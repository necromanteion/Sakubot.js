module.exports = function() {
	var fs = require("fs");
		XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
	return {
		"name": "Fetch",
		"trigger": new RegExp("^\\.fetch\\b", "i"),
		"restrict": ["necromanteion"],
		"actionType": "privmsg",
		"action": function (message, nickname, target) {
			var	api = ["active_skills","awakenings","evolutions","leader_skills","monsters"];
				apiGET = [];
				message = message.trim();
			if (!message) {
				return [target,"Fetch what, onii-chan?"];
			} else if (message === "all") {
				Array.prototype.push.apply(apiGET, api);
			} else {
				var message = message.split(" ");
			};
			
			for (i = 0; i < message.length; i++) {
				if (api.indexOf(message[i]) >= 0) {
					apiGET.push(api[api.indexOf(message[i])]);
				};
			};
			
			var xhr = [];
				url = [];
				
			if (apiGET.length > 0) {
				for (i = 0; i < apiGET.length; i++) {
					(function (i) {
						xhr[i] = new XMLHttpRequest();
						url[i] = "https://www.padherder.com/api/" + apiGET[i] + "/"
						xhr[i].open("GET", url[i], true);
						xhr[i].onreadystatechange = function() {
							if (xhr[i].readyState == 4 && xhr[i].status == 200) {
								response = JSON.parse(xhr[i].responseText);
									data = {};
								
								length = (Object.keys(response).length ? Object.keys(response).length : response.length);

								for (j = 0; j < length; j++) {
									if (apiGET[i] == "evolutions") {
										data[j] = [];
										for (k = 0; k < response[Object.keys(response)[j]].length; k++) {
											data[j][k] = response[Object.keys(response)[j]][k];
										};
									} else if (response[j].id) {
										data[response[j].id] = response[j];
									} else if (response[j].name) {
										data[response[j].name] = response[j];
									} else { return [target,"Onii-chan I ran into an error fetching " + apiGET[i] + "!"]; };
								};

								fs.writeFile("./data/" + apiGET[i] + ".json", JSON.stringify(data), function(err) {
									if (err) fs.mkdir("./data/", function() { });
								});
							};
						};
						xhr[i].send();
					})(i);
				};
				fileResponse = apiGET.slice(0);
				if (fileResponse.length > 1) { fileResponse[fileResponse.length - 1] = "and " + fileResponse[fileResponse.length - 1]; };
				return [target,"Fetching " + fileResponse.join(", ") + " from padherder!"];
			} else {
				return [target,"Onii-chan check your spelling!"];
			};
		},
	};
};
