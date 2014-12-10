module.exports = function() {
	var fs = require("fs");
		XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
	return {
		"name": "REM",
		"trigger": new RegExp("^.rem\\b", "i"),
		"exclude": ["Godzilla", "Bastet"],
		"action": function (arguments, nick, target) {
			if (arguments) {
				var arguments = arguments.split(" ");
				for (i = arguments.length - 1; i >= 0; i--) {
					if (isFinite(arguments[i])) {
						var n = parseInt(arguments[i]);
						arguments.splice(1,1);
						break;
					};
				};
			};
			
			if (n <= 0 || n == undefined) { var n = 1; }
			else if (n > 5 && target.charAt(0) == "#") { return "Five rolls maximum please!"; }
			else if (n > 10 && target.charAt(0) != "#") { return "Ten rolls maximum please!"; };
			
			if (target.charAt(0) == "#") { var target = nick + "\'s "; }
			else { var target = "Your "; };
			
			fs.readFile("./data/monsters.json", {encoding: "utf8"}, function (err, data) {
				if (err) return "I couldn't find the monster data!";
				var response = []
				for (i = 0; i < n; i++) {
					response.push(target + "REM roll: " + JSON.parse(data)[rem[Math.floor(Math.random() * rem.length)]].name + "!");
				};
				var response = response.join("\n)").toString();
			});
			return response;
		}
	};
};

var rem = [751,752,1218];
