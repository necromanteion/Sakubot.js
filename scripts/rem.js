module.exports = function() {
	var fs = require("fs");
	return {
		"name": "REM",
		"trigger": new RegExp("^.rem\\b", "i"),
		"exclude": ["Godzilla", "Bastet"],
		"action": function (arguments, nick, target) {
			var rem = [];
				title = " ";
				godfest = 0;
				
			for (i = 0; i < 4; i++) { append(rem, pantheons[i]); };
		
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
							append(rem, pantheons[i]);
							title += pantheons[i].title + " ";
							godfest += pantheons[i].godfestFlag;
						};
					};
				});
				
				if (Boolean(godfest)) { append(rem, pantheons[17]); append(rem, pantheons[18]) };
				
			};
			
			if (n <= 0 || n == undefined) { var n = 1; }
			else if (n > 5 && target.charAt(0) == "#") { return "Five rolls maximum please!"; }
			else if (n > 10 && target.charAt(0) != "#") { return "Ten rolls maximum please!"; };
			
			if (target.charAt(0) == "#") { var target = nick + "\'s"; }
			else { var target = "Your"; };
			
			if (fs.existsSync("./data/monsters.json")) {
				var data = fs.readFileSync("./data/monsters.json", {encoding: "utf8"})
					rolls = [];
					plus = [" (+HP)", " (+ATK)", " (+RCV)"]
				for (i = 0; i < n; i++) {
					rolls.push(target + title + "REM roll: ^3" + JSON.parse(data)[rem[Math.floor(Math.random() * rem.length)]].name + "^20!" + (plus[Math.floor(Math.random() * 20)] || ""));
				};
				var rolls = rolls.join("\r\n").toString();

				return rolls;
			} else { return "I couldn't find the monster data!"; };
		}
	};
};

var pantheons = [
	{												
	"title": "3*",
	"regex": null,
	"members": [88,90,92,94,96,106,110,288,291,294,297,300],
	"multiplier": 5,
	"godfestFlag": 0
	},
	{
	"title": "4*",
	"regex": null,
	"members": [79,81,83,85,87,89,91,93,95,97,99,101,103,105,109,111,112,114,116,118,120,225,289,292,295,298,301,352,354,356,358,360,1075,1077,1079,1081,1083,1120,1122,1349,1351,1353,1412,1414,1416,1418,1420,1502,1504,1506],
	"multiplier": 3,
	"godfestFlag": 0
	},
	{
	"title": "5*",
	"regex": null,
	"members": [113,115,117,119,121,122,124,126,128,130,132,134,136,138,140,201,202,203,204,205,226,229,230,231,232,233,236,238,240,242,244,290,293,296,299,302,316,317,318,319,320,353,355,357,359,361,368,370,372,374,376,378,380,382,384,386,490,492,494,496,498,555,557,559,561,563,567,569,571,573,575,620,622,624,626,628,630,632,634,636,638,745,747,749,751,753,799,801,803,805,807,1065,1067,1069,1071,1073,1076,1078,1080,1082,1084,1121,1123,1129,1231,1233,1235,1237,1239,1330,1332,1334,1336,1338,1350,1352,1354,1355,1357,1614,1616,1618,1620,1622,1624,1626],
	"multiplier": 1,
	"godfestFlag": 0
	},
	{
	"title": "6*",
	"regex": null,
	"members": [379,381,383,385,387,515,556,558,560,562,564,972,982,1356,1358,1516],
	"multiplier": 1,
	"godfestFlag": 0
	},
	{
	"title": "Greek",
	"regex": new RegExp("^(?:gree*k)$","i"),
	"members": [122,124,126,128,130],
	"multiplier": 3,
	"godfestFlag": 1
	},
	{
	"title": "Japanese",
	"regex": new RegExp("^(?:ja?p(anese)?1?)$","i"),
	"members": [132,134,136,138,140],
	"multiplier": 3,
	"godfestFlag": 1
	},
	{
	"title": "Indian",
	"regex": new RegExp("^(?:indian1?)$","i"),
	"members": [236,238,240,242,244],
	"multiplier": 3,
	"godfestFlag": 1
	},
	{
	"title": "Norse",
	"regex": new RegExp("^(?:norse)$","i"),
	"members": [368,370,372,374,376],
	"multiplier": 3,
	"godfestFlag": 1
	},
	{
	"title": "Egyptian",
	"regex": new RegExp("^(?:egypt(ian)?1?)$","i"),
	"members": [490,492,494,496,498],
	"multiplier": 3,
	"godfestFlag": 1
	},
	{
	"title": "Greek 2",
	"regex": new RegExp("^(?:(neo)?gree*k2(\.0)?)$","i"),
	"members": [567,569,571,573,575],
	"multiplier": 3,
	"godfestFlag": 1
	},
	{
	"title": "Archangel",
	"regex": new RegExp("^(?:(arch)?angel)$","i"),
	"members": [620,622,624,626,628],
	"multiplier": 3,
	"godfestFlag": 1
	},
	{
	"title": "Archdemon",
	"regex": new RegExp("^(?:(arch)?(demon|devil))$","i"),
	"members": [630,632,634,636,638],
	"multiplier": 3,
	"godfestFlag": 1
	},
	{
	"title": "Chinese",
	"regex": new RegExp("^(?:chin(a|ese))$","i"),
	"members": [745,747,749,751,753],
	"multiplier": 3,
	"godfestFlag": 1
	},
	{
	"title": "Japanese 2",
	"regex": new RegExp("^(?:ja?p(anese)?2(\.0)?)$","i"),
	"members": [799,801,803,805,807],
	"multiplier": 3,
	"godfestFlag": 1
	},
	{
	"title": "Hero",
	"regex": new RegExp("^(?:hero(es)?)$","i"),
	"members": [1065,1067,1069,1071,1073],
	"multiplier": 3,
	"godfestFlag": 1
	},
	{
	"title": "Three Kingdoms",
	"regex": new RegExp("^(?:(rot)?3k)$","i"),
	"members": [1231,1233,1235,1237,1239],
	"multiplier": 3,
	"godfestFlag": 1
	},
	{
	"title": "Indian 2",
	"regex": new RegExp("^(?:indian2(\.0)?)$","i"),
	"members": [1330,1332,1334,1336,1338],
	"multiplier": 3,
	"godfestFlag": 1
	},
	{
	"title": "Godfest 5*",
	"regex": new RegExp("^(?:godfest5)$","i"),
	"members": [362,640,911,1241,1359,1372,1585,1669,1671],
	"multiplier": 2,
	"godfestFlag": 0
	},
	{
	"title": "Godfest 6*",
	"regex": new RegExp("^(?:godfest6)$","i"),
	"members": [364,642,913,1088,1107,1243,1374,1587,1673],
	"multiplier": 1,
	"godfestFlag": 0
	}/*,
	{
	"title": "Gala of Flame",
	"regex": new RegExp("","i"),
	"members": [79,89,99,112,289,352,1075,1120,1349,1412,1502, 				//4*
				378,1076,1121,1350,113,201,229,290,316,353,555,1355,1614,	//5*
				1356,379,556,												//6*
				630,620,122,132,236,368,490,567,745,799,1065,1231,1330],	//Gods
	"multiplier": 2,
	"godfestFlag": 0
	},
	{
	"title": "Gala of Tides",
	"regex": new RegExp("","i"),
	"members": [],
	"multiplier": 2,
	"godfestFlag": 0
	},
	{
	"title": "Forest Gala",
	"regex": new RegExp("","i"),
	"members": [],
	"multiplier": 2,
	"godfestFlag": 0
	},
	{
	"title": "Heaven's Gala",
	"regex": new RegExp("","i"),
	"members": [],
	"multiplier": 2,
	"godfestFlag": 0
	},
	{
	"title": "Midnight Gala",
	"regex": new RegExp("","i"),
	"members": [],
	"multiplier": 2,
	"godfestFlag": 0
	},*/
]

function append(array, arrayToAppend) {
	for (ii = 0; ii < arrayToAppend.multiplier; ii++) {
		Array.prototype.push.apply(array, arrayToAppend.members);
	};
	return array;
};
