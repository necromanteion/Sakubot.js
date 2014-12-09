module.exports = function(self) {
	var fs = require("fs");
		XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
	return {
		"actionName": "fetch",
		"actionTrigger": new RegExp("^.fetch\\b", "i"),
		"actionFunction": function fetch(nick, chan, arguments) {
			var arguments = arguments.trim().split(" ");
				api = ["active_skills","awakenings","evolutions","leader_skills","monsters"]
				target = []
					
				for (i = 0; i < arguments.length; i++) {
					if (api.indexOf(arguments[i]) > 0) {
						target.push(api[api.indexOf(arguments[i])]);
					};
				};
				
				var xhr = []
					url = []
					
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
									fs.writeFile(target[i] + ".js", JSON.stringify(data), function(err) {
										if (err) throw err;
										//console.log(target[i] + " saved to file!");
									});
								};
							};
							xhr[i].send();
						})(i);
					};
					return "All data saved to file!";
				} else {
					return "Onii-chan check your spelling!";
				};
		},
		"responseMethods": {"pm":"pm","public":"pm"}
	};
};
