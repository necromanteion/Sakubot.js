module.exports = function() {
	var fs = require("fs");
		XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
	return {
		"name": "fetch",
		"trigger": new RegExp("^.fetch\\b", "i"),
		"restrict": ["necromanteion"],
		"action": function (arguments) {
			var	api = ["active_skills","awakenings","evolutions","leader_skills","monsters"];
				target = [];
				arguments = arguments.trim();
			if (!arguments) {
				return "Fetch what, onii-chan?";
			} else if (arguments === "all") {
				Array.prototype.push.apply(target, api);
			} else {
				var arguments = arguments.split(" ");
			};
			
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
									data = [{"empty":"empty"}] ;
								for (j = 0; j < response.length; j++) {
									if (response[j].id) {
										data[response[j].id] = response[j];
									} else {
										data = response;
										break;
									};
								};
								fs.writeFile("./data/" + target[i] + ".json", JSON.stringify(data), function(err) {
									if (err) fs.mkdir("./data/", function() { });
									//console.log(target[i] + " saved to file!");
								});
							};
						};
						xhr[i].send();
					})(i);
				};
				fileResponse = target.slice(0);
				if (fileResponse.length > 1) { fileResponse[fileResponse.length - 1] = "and " + fileResponse[fileResponse.length - 1]; };
				return "Fetching " + fileResponse.join(", ") + " from padherder!";
			} else {
				return "Onii-chan check your spelling!";
			};
		},
	};
};
