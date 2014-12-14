module.exports = function() {
	return {
		"name": "REM",
		"trigger": new RegExp("^.rem\\b", "i"),
		"exclude": ["Godzilla", "Bastet"],
		"action": function (arguments, nick, target) {
			if (!data) { return "I couldn't find the monster data!"; }
			else {
				var rem = buildREM(pantheons[0]);
					godfest = 0;
				
				if (arguments.length > 0) {
					var arguments = arguments.split(" ");
					for (i = arguments.length - 1; i >= 0; i--) {
						if (isFinite(arguments[i])) {
							var n = parseInt(arguments[i]);
							arguments.splice(i,1);
							arguments = (arguments.length > 0 ? arguments : current.slice(0));
							break;
						};
					};
				} else { var arguments = current.slice(0); };
				
				var title = [];
				for (i = 0; i < arguments.length; i++) {
					for (j = 0; j < pantheons.length; j++) {
						if (arguments[i].match(pantheons[j].regex)) {
							if (pantheons[j].replacement) {
								rem = buildREM(pantheons[j]);
								title.length = 0;
								title[0] = pantheons[j].title;
								godfest = 0;
								i = arguments.length;
								break;
							} else {
								buildREM(pantheons[j], rem);
								title[title.length] = pantheons[j].title;
								godfest += pantheons[j].godfestFlag;
							};
						} else { continue; };
					};
				};
				
				if (Boolean(godfest)) {
					for (i = 0; i < pantheons.length; i++) {
						if (pantheons[i].title == "Godfest") { buildREM(pantheons[i], rem); break; }
						else { continue; };
					};
				};
				
				if (n <= 0 || n == undefined) { var n = 1; }
				else if (n > 5 && target.charAt(0) == "#") { return "Five rolls maximum please!"; }
				else if (n > 10 && target.charAt(0) != "#") { return "Ten rolls maximum please!"; };
				
				if (target.charAt(0) == "#") { var target = nick + "\'s"; }
				else { var target = "Your"; };
				
				var	rolls = [];
					
				for (i = 0; i < n; i++) {
					rolls.push(target + (title.length > 0 ? " " + title.join(", ") : "") + " REM roll: ^3" + data[rem[Math.floor(Math.random() * rem.length)]].name + "^20!" + ([" (+HP)", " (+ATK)", " (+RCV)"][Math.floor(Math.random() * 15)] || ""));
				};
				
				rolls = rolls.join("\r\n").toString();
				return rolls;
			};
		}
	};
};

var fs = require("fs");
if (fs.existsSync("./data/monsters.json")) {
	var data = JSON.parse(fs.readFileSync("./data/monsters.json", {encoding: "utf8"}))
}
var current = ["Greek","Egypt2","Indian","Forest"];
var pantheons = [
	{												
	"title": "REM",
	"regex": null,
	"members": {
		"3": [88,90,92,94,96,106,110,288,291,294,297,300],
		"4": [79,81,83,85,87,89,91,93,95,97,99,101,103,105,109,111,112,114,116,118,120,225,289,292,295,298,301,352,354,356,358,360,1075,1077,1079,1081,1083,1120,1122,1349,1351,1353,1412,1414,1416,1418,1420,1502,1504,1506],
		"5": [113,115,117,119,121,122,124,126,128,130,132,134,136,138,140,201,202,203,204,205,226,229,230,231,232,233,236,238,240,242,244,290,293,296,299,302,316,317,318,319,320,353,355,357,359,361,368,370,372,374,376,378,380,382,384,386,490,492,494,496,498,555,557,559,561,563,567,569,571,573,575,620,622,624,626,628,630,632,634,636,638,745,747,749,751,753,799,801,803,805,807,1065,1067,1069,1071,1073,1076,1078,1080,1082,1084,1121,1123,1129,1231,1233,1235,1237,1239,1330,1332,1334,1336,1338,1350,1352,1354,1355,1357,1614,1616,1618,1620,1622,1624,1626],
		"6": [379,381,383,385,387,515,556,558,560,562,564,972,982,1356,1358,1516]
	},
	"multiplier": 0,
	},
	{
	"title": "Greek",
	"regex": new RegExp("^(?:gree*k)$","i"),
	"members": {
		"5": [122,124,126,128,130]
	},
	"multiplier": 3,
	"godfestFlag": 1
	},
	{
	"title": "Japanese",
	"regex": new RegExp("^(?:ja?p(anese)?1?)$","i"),
	"members": {
		"5": [132,134,136,138,140]
	},
	"multiplier": 3,
	"godfestFlag": 1
	},
	{
	"title": "Indian",
	"regex": new RegExp("^(?:indian1?)$","i"),
	"members": {
		"5": [236,238,240,242,244]
	},
	"multiplier": 3,
	"godfestFlag": 1
	},
	{
	"title": "Norse",
	"regex": new RegExp("^(?:norse)$","i"),
	"members": {
		"5": [368,370,372,374,376]
	},
	"multiplier": 3,
	"godfestFlag": 1
	},
	{
	"title": "Egyptian",
	"regex": new RegExp("^(?:egypt(ian)?1?)$","i"),
	"members": {
		"5": [490,492,494,496,498]
	},
	"multiplier": 3,
	"godfestFlag": 1
	},
	{
	"title": "Greek 2",
	"regex": new RegExp("^(?:(neo)?gree*k2(\.0)?)$","i"),
	"members": {
		"5": [567,569,571,573,575]
	},
	"multiplier": 3,
	"godfestFlag": 1
	},
	{
	"title": "Archangel",
	"regex": new RegExp("^(?:(arch)?angel)$","i"),
	"members": {
		"5": [620,622,624,626,628]
	},
	"multiplier": 3,
	"godfestFlag": 1
	},
	{
	"title": "Archdemon",
	"regex": new RegExp("^(?:(arch)?(demon|devil))$","i"),
	"members": {
		"5": [630,632,634,636,638]
	},
	"multiplier": 3,
	"godfestFlag": 1
	},
	{
	"title": "Chinese",
	"regex": new RegExp("^(?:chin(a|ese))$","i"),
	"members": {
		"5": [745,747,749,751,753]
	},
	"multiplier": 3,
	"godfestFlag": 1
	},
	{
	"title": "Japanese 2",
	"regex": new RegExp("^(?:ja?p(anese)?2(\.0)?)$","i"),
	"members": {
		"5": [799,801,803,805,807]
	},
	"multiplier": 3,
	"godfestFlag": 1
	},
	{
	"title": "Hero",
	"regex": new RegExp("^(?:hero(es)?)$","i"),
	"members": {
		"5": [1065,1067,1069,1071,1073]
	},
	"multiplier": 3,
	"godfestFlag": 1
	},
	{
	"title": "Three Kingdoms",
	"regex": new RegExp("^(?:(rot)?3k)$","i"),
	"members": {
		"5": [1231,1233,1235,1237,1239]
	},
	"multiplier": 3,
	"godfestFlag": 1
	},
	{
	"title": "Indian 2",
	"regex": new RegExp("^(?:indian2(\.0)?)$","i"),
	"members": {
		"5": [1330,1332,1334,1336,1338]
	},
	"multiplier": 3,
	"godfestFlag": 1
	},
	{
	"title": "Egyptian 2",
	"regex": new RegExp("^(?:egypt(ian)?2(\.0)?)$","i"),
	"members": {
		"5": [1659,1661,1663,1665,1667]
	},
	"multiplier": 3,
	"godfestFlag": 1
	},
	{
	"title": "Godfest",
	"regex": new RegExp("^(?:godfest)$","i"),
	"members": {
		"5": [362,640,911,1241,1359,1372,1585,1669,1671],
		"6": [364,642,913,1088,1107,1243,1374,1587,1673]
	},
	"multiplier": 3,
	"godfestFlag": 0
	},
	{
	"title": "Gala of Flame",
	"regex": new RegExp("^(?:flame|fire)$","i"),
	"members": {
		"4": [79,89,99,112,289,352,1075,1120,1349,1412,1502],
		"5": [378,1076,1121,1350,113,201,229,290,316,353,555,1355,1614,630,620,122,132,236,368,490,567,745,799,1065,1231,1330],
		"6": [1356,379,556]
	},
	"multiplier": 2,
	"godfestFlag": 0
	},
/*	{
	"title": "Gala of Tides",
	"regex": new RegExp("","i"),
	"members": {
		"4": [],
		"5": [],
		"6": []
	},
	"multiplier": 2,
	"godfestFlag": 0
	},
*/	{
	"title": "Forest Gala",
	"regex": new RegExp("^(?:forest|wood)$","i"),
	"members": {
		"4": [83,93,103,116,295,356,1079,1124,1351,1416],
		"5": [117,203,231,296,318,357,382,559,1080,1125,1130,1352,1618,126,136,240,372,494,571,624,634,749,803,1069,1235,1334],
		"6": [383,560,1131,1516]
	},
	"multiplier": 2,
	"godfestFlag": 0
	},
/*	{
	"title": "Heaven's Gala",
	"regex": new RegExp("","i"),
	"members": {
		"4": [],
		"5": [],
		"6": []
	},
	"multiplier": 2,
	"godfestFlag": 0
	},
	{
	"title": "Midnight Gala",
	"regex": new RegExp("","i"),
	"members": {
		"4": [],
		"5": [],
		"6": []
	},
	"multiplier": 2,
	"godfestFlag": 0
	},*/
	{
	"title": "Batman Arkham",
	"regex": new RegExp("^(?:bat(man)?|arkham)$","i"),
	"members": {
		"4": [926,928,932],
		"5": [930,934],
		},
	"replacement": true,
	},
	{
	"title": "DC Universe",
	"regex": new RegExp("^(?:DC|superman)$","i"),
	"members": {
		"4": [1679,1681,1683,1685,1687],
		"5": [1675,1677],
		},
	"replacement": true,
	},
	{
	"title": "Evangelion",
	"regex": new RegExp("^(?:eva(ngelion)?)$","i"),
	"members": {
		"4": [695,697,699,701,703],
		"5": [705,1202],
		},
	"replacement": true,
	},
	{
	"title": "Gentlemen's Event",
	"regex": new RegExp("^(?:GM|gentle(m(a|e)n'?s?)?)$","i"),
	"members": {
		"4": [352,360,1120,1502,1506],
		"5": [1704,1706,124,569,620,622,624,626,628,638,807,353,361,378,382,559,561,563,1121,1503,1507,1620,1622,1624,1626],
		},
	"replacement": true,
	},
	{
	"title": "Hello Kitty",
	"regex": new RegExp("^(?:HK|sanrio|hello|kitty)$","i"),
	"members": {
		"4": [1150,1152,1154,1156,1158,1160],
		"5": [1162,1164],
		},
	"replacement": true,
	},
]

function buildREM(object, appendTo) {
	var appendTo = appendTo || [];
		array  = [];
		rarity = ["7","6","5","4","3"]							// corresponds to [1,3,5,7,9] /  multiplier
		multiplier = (Boolean(object.multiplier) ? object.multiplier : 2);		//multiplier of 2 means it will add 1 instance to the rem, doubling it if it's already in the rem
	
	for (x = 0; x < Object.keys(object.members).length; x++) {
		for (xx = 1; xx < multiplier; xx++) {
			for (xxx = 0; xxx < 2 * rarity.indexOf(Object.keys(object.members)[x]) + 1; xxx++) {
				Array.prototype.push.apply(array, object.members[Object.keys(object.members)[x]]);
			};
		};
	};
	Array.prototype.push.apply(appendTo, array)
	return appendTo;
};
