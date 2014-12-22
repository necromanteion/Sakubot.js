module.exports = function() {
	return {
		"name": "REM",
		"trigger": new RegExp("^\\.rem\\b", "i"),
		"exclude": ["Godzilla", "Bastet"],
		"actionType": "privmsg",
		"action": function (message, nickname, target) {
			target = (target.charAt(0) == "#" ? target : nickname);
		
			if (!data) { return [target,"I couldn't find the monster data!"]; }
			else {
				var rem = buildREM(pantheons[0]);
					godfest = 0;
				
				if (message.length > 0) {
					var message = message.split(" ");
					for (i = message.length - 1; i >= 0; i--) {
						if (isFinite(message[i])) {
							var n = parseInt(message[i]);
							message.splice(i,1);
							message = (message.length > 0 ? message : current.slice(0));
							break;
						};
					};
				} else { var message = current.slice(0); };
				
				var title = [];
				for (i = 0; i < message.length; i++) {
					for (j = 0; j < pantheons.length; j++) {
						if (message[i].match(pantheons[j].regex)) {
							if (pantheons[j].replacement) {
								rem = buildREM(pantheons[j]);
								title.length = 0;
								title[0] = pantheons[j].title;
								godfest = 0;
								i = message.length;
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
				else if (n > 5 && target.charAt(0) == "#") { return [target,"Five rolls maximum please!"]; }
				else if (n > 9 && target.charAt(0) != "#") { return [target,"Ten rolls maximum please!"]; };
				
				var	rolls = [];
					
				for (i = 0; i < n; i++) {
					rolls.push((target.charAt(0) == "#" ? nickname + "\'s" : "Your") + (title.length > 0 ? " " + title.join(", ") : "") + " REM roll: ^3" + data[rem[Math.floor(Math.random() * rem.length)]].name + "^20!" + ([" (+HP)", " (+ATK)", " (+RCV)"][Math.floor(Math.random() * 15)] || ""));
				};
				
				return [target,rolls.join("\r\n").toString()];
			};
		}
	};
};

var fs = require("fs");
if (fs.existsSync("./data/monsters.json")) {
	var data = JSON.parse(fs.readFileSync("./data/monsters.json", {encoding: "utf8"}));
};

var current = ["Water"];
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
	{
	"title": "Gala of Tides",
	"regex": new RegExp("","i"),
	"members": {
		"4": [81,91,101,114,292,354,1077,1122,1414,1514],
		"5": [115,202,230,293,317,355,380,557,1078,124,134,238,370,492,569,622,632,747,801,1067,1123,1233,1332,1616,1661],
		"6": [381,558,972]
	},
	"multiplier": 2,
	"godfestFlag": 0
	},
	{
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
	"title": "Christmas",
	"regex": new RegExp("^(?:(christ|x)mas)$","i"),
	"members": {
		"4": [1786,1787,1788,1789,1790],
		"5": [745,747,749,751,753,1614,1616,1618,1784,1785,1791,1794],
		"6": [1782,1792,1793],
		"7": [1783],
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
	{
	"title": "Waifu",
	"regex": new RegExp("^(?:waifu)$","i"),
	"members": {
		"1": [1519],
		"2": [718,795,1007],
		"3": [88,90,92,94,96,194,796,852,1178,1180,1182,1184,1186,1689,1697],
		"4": [89,91,93,95,97,225,343,345,347,354,356,358,366,414,417,420,423,426,451,479,530,536,667,695,699,853,946,1179,1181,1183,1185,1187,1412,1414,1416,1418,1420,1687,1690,1698,1786,1787,1788,1789,1790],
		"5": [122,126,128,138,140,201,202,203,204,205,226,238,240,355,357,359,367,370,372,415,418,421,424,427,492,494,531,537,555,557,571,575,634,640,666,668,696,700,745,747,749,751,753,799,803,809,911,947,1067,1073,1146,1202,1332,1413,1415,1417,1419,1421,1436,1585,1589,1614,1616,1618,1665,1667,1669,1671,1677,1688,1749,1751,1753,1755,1757,1784,1785,1791],
		"6": [123,127,129,139,141,189,239,241,371,373,416,419,422,425,428,493,495,515,556,558,572,576,596,598,635,641,642,648,746,748,750,752,754,800,804,810,811,813,912,913,920,921,922,972,975,977,982,1068,1074,1088,1099,1100,1101,1102,1103,1104,1105,1106,1147,1188,1200,1203,1222,1249,1270,1320,1333,1361,1362,1363,1364,1365,1437,1460,1462,1516,1586,1587,1590,1615,1617,1619,1666,1668,1670,1672,1673,1678,1750,1752,1754,1756,1758,1782,1792,1793],
		"7": [190,388,389,392,393,394,395,597,599,643,649,653,654,694,812,814,888,891,893,914,973,983,985,988,989,990,996,997,1000,1089,1114,1115,1116,1117,1189,1191,1192,1217,1218,1223,1250,1259,1260,1262,1263,1264,1265,1266,1267,1268,1269,1271,1296,1298,1345,1346,1347,1422,1461,1463,1511,1512,1513,1514,1515,1517,1518,1533,1535,1536,1557,1588,1613,1644,1645,1674,1727,1728,1729,1730,1731,1737,1781,1783],
		},
	"replacement": true,
	},
]

function buildREM(object, appendTo) {
	var appendTo = appendTo || [];
		array  = [];
		rarity = ["7","6","5","4","3","2","1"]			// corresponds to [1,3,5,7,9,11,13] /  multiplier
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
