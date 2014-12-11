module.exports = function() {
	var fs = require("fs");
		XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
	return {
		"name": "REM",
		"trigger": new RegExp("^.rem\\b", "i"),
		"exclude": ["Godzilla", "Bastet"],
		"action": function (arguments, nick, target) {
			var rem = [];
				title = " ";
		
			if (arguments) {
				var arguments = arguments.split(" ");
				for (i = arguments.length - 1; i >= 0; i--) {
					if (isFinite(arguments[i])) {
						var n = parseInt(arguments[i]);
						arguments.splice(i,1);
						break;
					};
				};

				arguments.forEach(function(entry) {
					for (i = 0; i < pantheons.length; i++) {
						if (entry.match(pantheons[i].regex)) {
							for (j = 0; j < pantheons[i].multiplier; j++) { Array.prototype.push.apply(rem, pantheons[i].members); };
							title = title + pantheons[i].title + " ";
							//console.log(rem);
						};
					};
				});
			};
			
			if (n <= 0 || n == undefined) { var n = 1; }
			else if (n > 5 && target.charAt(0) == "#") { return "Five rolls maximum please!"; }
			else if (n > 10 && target.charAt(0) != "#") { return "Ten rolls maximum please!"; };
			
			if (target.charAt(0) == "#") { var target = nick + "\'s"; }
			else { var target = "Your"; };
			
			var data = fs.readFileSync("./data/monsters.json", {encoding: "utf8"})
				rolls = [];
			for (i = 0; i < n; i++) {
				rolls.push(target + title + "REM roll: " + JSON.parse(data)[rem[Math.floor(Math.random() * rem.length)]].name + "!");
			};
			var rolls = rolls.join("\r\n").toString();
			console.log(rolls);

			return rolls;
		}
	};
};


var pantheons = [
	{
	"title": "3*",
	"regex": null,
	"members": [],
	"multiplier": null
	},
	{
	"title": "4*",
	"regex": null,
	"members": [],
	"multiplier": null
	},
	{
	"title": "5*",
	"regex": null,
	"members": [],
	"multiplier": null
	},
	{
	"title": "6*",
	"regex": null,
	"members": [],
	"multiplier": null
	},
	{
	"title": "Greek",
	"regex": new RegExp("^(?:gree*k)$","i"),
	"members": [122,124,126,128,130],
	"multiplier": 3
	},
	{
	"title": "Japanese",
	"regex": new RegExp("^(?:ja?p(anese)?1?)$","i"),
	"members": [132,134,136,138,140],
	"multiplier": 3
	},
	{
	"title": "Indian",
	"regex": new RegExp("^(?:indian1?)$","i"),
	"members": [236,238,240,242,244],
	"multiplier": 3
	},
	{
	"title": "Norse",
	"regex": new RegExp("^(?:norse)$","i"),
	"members": [368,370,372,374,376],
	"multiplier": 3
	},
	{
	"title": "Egyptian",
	"regex": new RegExp("^(?:egypt(ian)?1?)$","i"),
	"members": [490,492,494,496,498],
	"multiplier": 3
	},
	{
	"title": "Greek 2",
	"regex": new RegExp("^(?:(neo)?gree*k2(\.0)?)$","i"),
	"members": [567,569,571,573,575],
	"multiplier": 3
	},
	{
	"title": "Archangel",
	"regex": new RegExp("^(?:(arch)?angel)$","i"),
	"members": [620,622,624,626,628],
	"multiplier": 3
	},
	{
	"title": "Archdemon",
	"regex": new RegExp("^(?:(arch)?(demon|devil))$","i"),
	"members": [630,632,634,636,638],
	"multiplier": 3
	},
	{
	"title": "Chinese",
	"regex": new RegExp("^(?:chin(a|ese))$","i"),
	"members": [745,747,749,751,753],
	"multiplier": 3
	},
	{
	"title": "Japanese 2",
	"regex": new RegExp("^(?:ja?p(anese)?2(\.0)?)$","i"),
	"members": [799,801,803,805,807],
	"multiplier": 3
	},
	{
	"title": "Hero",
	"regex": new RegExp("^(?:hero(es)?)$","i"),
	"members": [1065,1067,1069,1071,1073],
	"multiplier": 3
	},
	{
	"title": "Three Kingdoms",
	"regex": new RegExp("^(?:(rot)?3k)$","i"),
	"members": [1231,1233,1235,1237,1239],
	"multiplier": 3
	},
	{
	"title": "Indian 2",
	"regex": new RegExp("^(?:indian2(\.0)?)$","i"),
	"members": [1330,1332,1334,1336,1338],
	"multiplier": 3
	},
	{
	"title": "Godfest 5*",
	"regex": new RegExp("^(?:godfest5)$","i"),
	"members": [362,640,911,1241,1359,1372,1585,1669,1671],
	"multiplier": 1
	},
	{
	"title": "Godfest 6*",
	"regex": new RegExp("^(?:godfest6)$","i"),
	"members": [364,642,913,1088,1107,1243,1374,1587,1673],
	"multiplier": 1
	}/*,
	{
	"title": "Gala of Flame",
	"regex": new RegExp("","i"),
	"members": [79,89,99,112,289,352,1075,1120,1349,1412,1502, 				//4*
				378,1076,1121,1350,113,201,229,290,316,353,555,1355,1614,	//5*
				1356,379,556,												//6*
				630,620,122,132,236,368,490,567,745,799,1065,1231,1330],	//Gods
	"multiplier": 2
	},
	{
	"title": "Gala of Tides",
	"regex": new RegExp("","i"),
	"members": [],
	"multiplier": 2
	},
	{
	"title": "Forest Gala",
	"regex": new RegExp("","i"),
	"members": [],
	"multiplier": 2
	},
	{
	"title": "Heaven's Gala",
	"regex": new RegExp("","i"),
	"members": [],
	"multiplier": 2
	},
	{
	"title": "Midnight Gala",
	"regex": new RegExp("","i"),
	"members": [],
	"multiplier": 2
	},*/
]
