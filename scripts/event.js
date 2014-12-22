module.exports = function() {
	var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
	return {
		"name": "Events",
		"trigger": new RegExp("^\\.events?\\b", "i"),
		"exclude": ["Godzilla", "Bastet"],
		"actionType": "privmsg",
		"action": function(message, nickname, target) {
			target = (target.charAt(0) == "#" ? target : nickname);
		
			var xhr = new XMLHttpRequest();
				url = "https://www.padherder.com/api/events/";
				events = [];
				
			if (xhr != null) {
				xhr.open("GET", url, false);
				xhr.send();
				events = JSON.parse(xhr.responseText);
			};
				
			if (message) {
				var message = message.toUpperCase().split(" ");
				for (i = 0; i < message.length; i++) {
					if (isFinite(message[i])) {
						var n = parseInt(message[i]);
						message.splice(i,1);
						break;
					} else if (message[i] === "ALL") {
						var n = events.length
						message.splice(i,1);
						break;
					};
				};
				
				if (message.length > 0) {
					var groups = message.join().replace(/(fire|red)/gi,1).replace(/(water|blue)/gi,2).replace(/(wood|green)/gi,3).split(",");
				}
				else { var groups = ["A","B","C","D","E","1","2","3"]; };
			} else { var groups = ["A","B","C","D","E","1","2","3"]; };
			
			if (n == undefined || n <= 0) { var n = 2; }
			else if (n > 4 && target.charAt(0) == "#") { var n = 4; }
			//else if (n > 10 && target.charAt(0) != "#") { var n = 10; };

			events = events.filter(function(value, index) {
				return groups.indexOf(events[index].group_name) >= 0 && events[index].country == 2;
			});
			
			var response = [];
				title = "";
				group = "";
				time = "";
				avail = "";
			for (i = 0; i < n && i < events.length; i++) {
				title = "^3" + events[i].title + "^20 ";
				group = (isNaN(events[i].group_name) ? "^3Group " + events[i].group_name + "^20" : "^3" + ["Fire","Water","Wood"][events[i].group_name] + " starters^20");
				time = new Date(events[i].starts_at) - new Date();
				if (time < -3600000) {
					n++;
					continue;
				} else if (time < 0) {
					time = convertToTime(time + 3600000);
					avail = "is currently available for " + group + " for another ";
				} else {
					time = convertToTime(time);
					avail = "will be available for " + group + " in ";
				};
				
				response[i] = title + avail + time + ".";
			};
			return [target,(response.length > 0 ? response.join("\n") : "I couldn't find any events" + (message.length > 0 ? " for that group" : "") + "!")];
		}
	};
};

function convertToTime(milliseconds) {
	var hours = Math.floor(milliseconds / 3600000) ;
		minutes = Math.floor((milliseconds % 3600000) / 60000);
		seconds = Math.floor(((milliseconds % 3600000) % 60000) / 1000);
	return (hours ? hours + "h" : "") + (minutes ? minutes + "m" : "") + (hours == 0 ? seconds + "s" : "");
};
