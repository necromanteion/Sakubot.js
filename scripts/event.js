module.exports = function() {
	var fs = require("fs");
		XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
	return {
		"name": "Events",
		"trigger": new RegExp("^.events?\\b", "i"),
		"exclude": ["Godzilla", "Bastet"],
		"action": function(arguments) {
			var xhr = new XMLHttpRequest();
				url = "https://www.padherder.com/api/events/";
				
			xhr.onreadystatechange = function() {
				console.log("readyState: " + xhr.readyState);
				console.log("status: " + xhr.status);
				if (xhr.readyState == 4 && xhr.status == 200) {
					console.log(xhr.responseText);
					var response = JSON.parse(xhr.responseText);
				};
			};
			xhr.open("GET", url, true);
			xhr.send();
			console.log(response);
			return "okay";
		}
	};
};
