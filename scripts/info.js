module.exports = function() {
	return {
		"name": "Info",
		"trigger": new RegExp("^\\.info\\b", "i"),
		"exclude": ["Godzilla", "Bastet"],
		"actionType": "privmsg",
		"action": function (message, nickname, target) {
			target = (target.charAt(0) == "#" ? target : nickname);

			if (message.search(/(?:id|mon(?:ster)?):(\d+|\w+|".+")/i) > -1) {
				var	match = message.match(/(?:id|mon(?:ster)?):(\d+|\w+|".+")/i)[1].replace(/"/g,"");
			} else {
				return [target, "Who are you looking for, " + (nickname == "necromanteion" ? "" : nickname + "-") + "onii-chan?"];
			};

			if (match.trim().length === 0) {
				return [target,(nickname == "necromanteion" ? "O" : nickname + "-o") + "nii-chan, what are you doing?"];
			} else if (isNaN(match)) {
				var results = [];
				for (i = 0; i < Object.keys(data).length; i++) {
					if (data[Object.keys(data)[i]].name.toLowerCase().indexOf(match.toLowerCase()) > -1) {
						results.push(data[Object.keys(data)[i]].id);
					};
				};
				if (results.length === 0) {
					return [target, "I couldn't find that monster!"];
				} else if (results.length === 1) {
					id = results[0].toString();
				} else {
					resultsArray = [];
					for (i = 0; i < results.length && i < 15; i++) {
						resultsArray[i] = data[results[i]].name + " (#" + results[i] + ")";
					};
					return [target, "I found " + resultsArray.length + " results for \"" + match + "\"! For more info look up:\n" + resultsArray.join(", ")];
				};
			} else if (!data[match]) {
				return [target, "I couldn't find that monster!"];
			} else {var id = match.trim(); };

			var name = data[id].name;
				element = ["Fire","Water","Wood","Light","Dark"][data[id].element];
				element2 = ["Fire","Water","Wood","Light","Dark"][data[id].element2];
				type = { 0: "Evo Material", 1: "Balanced", 2: "Physical", 3: "Healer", 4: "Dragon", 5: "God", 6: "Attacker", 7: "Devil", 12: "Awoken Skill Material", 13: "Protected", 14: "Enhance Material" }[data[id].type];
				type2 = { 0: "Evo Material", 1: "Balanced", 2: "Physical", 3: "Healer", 4: "Dragon", 5: "God", 6: "Attacker", 7: "Devil", 12: "Awoken Skill Material", 13: "Protected", 14: "Enhance Material" }[data[id].type2];
				jpOnly = (data[id].jp_only ? "(JP only!)" : "");
				activeSkill = data[id].active_skill || "No active skill!";
				activeSkillDesc = (data[id].active_skill ? activeSkills[activeSkill].effect : "");
				activeSkillCD = (data[id].active_skill ? "(" + activeSkills[activeSkill].max_cooldown + " > " + activeSkills[activeSkill].min_cooldown + ")" : "");
				leaderSkill = data[id].leader_skill || "No leader skill!";
				leaderSkillDesc = (data[id].leader_skill ? leaderSkills[leaderSkill].effect : "");

			if (data[id].awoken_skills.length > 0) {
				var awokenSkills = [];
				for (i = 0; i < data[id].awoken_skills.length; i++) {
					awokenSkills[i] = awakenings[data[id].awoken_skills[i]].name;
				};
				var awokenSkills = awokenSkills.join(", ") + ".";
			} else { var awokenSkills = "No awakenings!"; };

			if (evolutions[id]) {

			};

			var	teamCost = data[id].team_cost;
				rarity = data[id].rarity;
				maxLevel = data[id].max_level;
				xpCurve = data[id].xp_curve;

			var	response = "^3" + name + "^20 (#" + id + "): ";

			if (message.search(/\b(?:active)\b/i) > -1) {
				response += activeSkill + " " + activeSkillCD + "\n" + activeSkillDesc;
			} else if (message.search(/\b(?:lead(er)?)\b/i) > -1) {
				response += leaderSkill + "\n" + leaderSkillDesc;
			} else if (message.search(/\b(?:ex(pand(ed)?)?)\b/i) > -1) {
				response += element + (element2 ? "/" + element2 : "") + ", " + type + (type2 ? "/" + type2 : "") + (jpOnly ? " (JP only!)" : "");
				response += "\nCost: " + teamCost + ", Rarity: " + Array(rarity + 1).join("★ ");
				var level = (message.search(/\b(?:le?ve?l?):"?(\d+)"?\b/i) > -1 ? message.match(/\b(?:le?ve?l?):"?(\d+)"?\b/i)[1]: maxLevel);
					level = (level > maxLevel ? maxLevel : level);
				response += "\n@Lv. " + level + " HP: " + getStatValue(id, level, "HP") + ", ATK: " + getStatValue(id, level, "ATK") + ", RCV: " + getStatValue(id, level, "RCV") + ", XP: " + getXP(level, xpCurve);
			} else if (message.search(/\b(?:evo(lutions?)?)\b/i) > -1) {
				//response +=
			} else if (message.search(/\b(?:stats?)\b/i) > -1) {
				var level = (message.search(/\b(?:le?ve?l?):"?(\d+)"?\b/i) > -1 ? message.match(/\b(?:le?ve?l?):"?(\d+)"?\b/i)[1]: maxLevel);
					level = (level > maxLevel ? maxLevel : level);
				response += "@Lv. " + level + " HP: " + getStatValue(id, level, "HP") + ", ATK: " + getStatValue(id, level, "ATK") + ", RCV: " + getStatValue(id, level, "RCV") + ", XP: " + getXP(level, xpCurve);
			} else {
				response += element + (element2 ? "/" + element2 : "") + ", " + type + (type2 ? "/" + type2 : "") + (jpOnly ? " (JP only!)" : "");
			};

			return [target, response];
		}
	};
};
var fs = require("fs");
	data = (fs.existsSync("./data/monsters.json") ? JSON.parse(fs.readFileSync("./data/monsters.json", {encoding: "utf8"})) : {});
	evolutions = (fs.existsSync("./data/evolutions.json") ? JSON.parse(fs.readFileSync("./data/evolutions.json", {encoding: "utf8"})) : {});
	awakenings = (fs.existsSync("./data/awakenings.json") ? JSON.parse(fs.readFileSync("./data/awakenings.json", {encoding: "utf8"})) : {});
	activeSkills = (fs.existsSync("./data/active_skills.json") ? JSON.parse(fs.readFileSync("./data/active_skills.json", {encoding: "utf8"})) : {});
	leaderSkills = (fs.existsSync("./data/leader_skills.json") ? JSON.parse(fs.readFileSync("./data/leader_skills.json", {encoding: "utf8"})) : {});

function getStatValue(id, level, stat) {
	var	stat = ["hp", "atk", "rcv"][["hp", "atk", "rcv"].indexOf(stat.toLowerCase())];
		maxLevel = data[id].max_level;
		min = data[id][stat + "_min"];
		max = data[id][stat + "_max"];
		scale = data[id][stat + "_scale"];
	return Math.floor(min + (max - min) * Math.pow((level - 1) / (maxLevel - 1), scale));
};

function getXP(level, xpCurve) { return Math.floor(Math.pow(((level - 1) / 98), 2.5) * xpCurve); };
