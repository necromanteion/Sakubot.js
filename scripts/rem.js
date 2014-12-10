module.exports = function() {
	var fs = require("fs");
		XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
	return {
		"name": "REM",
		"trigger": new RegExp("^.rem\\b", "i"),
		"action": function (arguments, nick, target) {
			if (nick === target) {
				var nick = "Your ";
			} else {
				var nick = nick + "\'s";
			};
			fs.readFile("./data/monsters.json", {encoding: "utf8"}, function (err, data) {
				if (err) throw err;
				console.log(typeof JSON.parse(data));
				console.log(JSON.parse(data)[752]);
			});
			return ".rem!";
		}
	};
};

var rem = [751,752,1218];
