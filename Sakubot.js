var config = {
	nick: "Sakubot",
	pass: "",
	user: "Saku",
	server: "irc.rizon.net",
	realname: "Sakubot.js",
	port: 6667,
	secure: false
};
	channels = ["#sakubot"]

var factory = require("irc-factory");
	fs = require("fs");
	XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
	
var Sakubot = new factory.Api();
	client = Sakubot.createClient("Sakubot", config);

Sakubot.hookEvent("Sakubot", "notice", function(message) {
	//console.log(message.message)
});

Sakubot.hookEvent("Sakubot", "registered", function(message) {
    if (config.pass) {
		client.irc.privmsg("nickserv", "identify " + config.pass);
	};
    for (i = 0; i < channels.length; i++) {
		client.irc.join(channels[i]);
	};
});

Sakubot.hookEvent("Sakubot", "privmsg", function(message) {
	//console.log(message);
	for (i = 0; i < actions.length; i++) {
		if (message.message.match(actions[i].trigger) && !message.nickname.match(actions[i].exclude)) {
			if (message.target.charAt(0) == "#") { var target = message.target; }
			else { var target = message.nickname; };
			
			var arguments = message.message.replace(actions[i].trigger, "").trim();
				message = actions[i].action(arguments, message.nickname, message.target);
			client.irc.privmsg(target, message);
			break;
		};
	};
});

(function load() {
	var scripts = fs.readdirSync("./scripts/");
		actions = [];
		
	for (i = 0; i < scripts.length; i++) {
		if (scripts[i].indexOf(".js") < 0) { continue; };
		script = require("./scripts/" + scripts[i])();
		if (typeof script.trigger === undefined || typeof script.action === undefined) { continue; };
		actions.push(script);
	};
	
	actions.push({
		"name": "(Re)Load",
		"trigger": new RegExp("^.(re)?load\\b", "i"),
		"restrict": ["necromanteion"],
		"action": function() {
			var path = fs.realpathSync("./scripts/") + "\\";
				scripts = fs.readdirSync("./scripts/");
			for (i = 0; i < scripts.length; i++) {
				delete require.cache[path + scripts[i]];
			};
			return load();
		}
	});
	
	for (i = 0; i < actions.length; i++) {
		if (actions[i].exclude) { actions[i].exclude = new RegExp("\\b(?:" + actions[i].exclude.join("|") + ")\\b", "i"); }
		else { actions[i].exclude = new RegExp("\\b(?!\\b(?:" + actions[i].restrict.join("|") + ")\\b)\\w+\\b", "i"); }
	};
	return config.nick + " rebooted and ready to rock!";
})();
