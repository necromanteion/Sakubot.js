module.exports = function() {
	//var fs = require("fs");
	var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
	return {
		"name": "Events",
		"trigger": new RegExp("^.events?\\b", "i"),
		"exclude": ["Godzilla", "Bastet"],
		"action": function(arguments) {
			var xhr = new XMLHttpRequest();
				url = "https://www.padherder.com/api/events/";
				events = [];
				
			if (xhr != null) {
				xhr.open("GET", url, false);
				xhr.send();
				events = JSON.parse(xhr.responseText);
			};
				
			if (arguments) {
				var arguments = arguments.split(" ");
				for (i = 0; i < arguments.length; i++) {
					if (isFinite(arguments[i])) {
						var n = parseInt(arguments[i]);
						arguments.splice(i,1);
						break;
					} else if (arguments[i] === "all") {
						var n = events.length
						arguments.splice(i,1);
						break;
					};
				};
			} else { var arguments = ["A","B","C","D","E","1","2","3"];	};
			
			var groups = arguments.toUpperCase().slice(0);
			console.log(groups);
			
			if (n <= 0 || n == undefined) { var n = 2; }
			else if (n > 5 && target.charAt(0) == "#") { var n = 4; }
			//else if (n > 10 && target.charAt(0) != "#") { var n = 10; };

			events = events.filter(function(value, index) {
				return groups.indexOf(events[index].group_name) >= 0;
			});
			console.log(events);
			return "okay";
		}
	};
};
