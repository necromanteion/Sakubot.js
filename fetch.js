module.exports = function(self) {
	return {
		"actionName": "fetch",
		"actionTrigger": new RegExp("^.fetch\\b", "i"),
		"actionFunction": function fetch(nick, chan, arguments) {
			fs = require("fs");
			XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
			
			xhr = []
			api = ["awakenings"]  //["active_skills","awakenings","evolutions","leader_skills","monsters"];
			url = []
			
			for (i = 0; i < api.length; i++) {
				(function (i) {
					xhr[i] = new XMLHttpRequest();
					url[i] = "https://www.padherder.com/api/" + api[i] + "/"
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
							fs.writeFile(api[i] + ".js", JSON.stringify(data), function(err) {
								if (err) throw err;
								//console.log(api[i] + " saved to file!");
							});
						};
					};
					xhr[i].send();
				})(i);
			};
			return "All data saved to file!";
		},
		"responseMethods": {"pm":"pm","public":"pm"}
	};
};
