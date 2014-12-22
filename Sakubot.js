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
	console.log(message.message)
});

Sakubot.hookEvent("Sakubot", "registered", function(message) {
    if (config.pass) {
		client.irc.privmsg("nickserv", "identify " + config.pass);
	};
    for (i = 0; i < channels.length; i++) {
		client.irc.join(channels[i]);
	};
	
	/*client.irc.raw(["whois", "Sakubot"])
	Sakubot.hookEvent("Sakubot", "whois", function(message) {
		console.log(message.channels);*/
	});
});



Sakubot.hookEvent("Sakubot", "privmsg", function(message) {
	for (i = 0; i < actions.length; i++) {
		if (message.message.match(actions[i].trigger) && !message.nickname.match(actions[i].exclude)) {
			date = new Date();
			console.log("[" + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2) + ":" + ("0" + date.getSeconds()).slice(-2) + "] <" + message.nickname + "> " + message.message );
			handleResponse(actions[i].actionType, actions[i].action(message.message.replace(actions[i].trigger, "").trim(), message.nickname, message.target));
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
		if (script.length) {
			for (j = 0; j < script.length; j++) {
				actions.push(script[j]);
			};
		} else { actions.push(script); };
	};

	actions.push({
		"name": "(Re)Load",
		"trigger": new RegExp("^\\.(re)?load\\b", "i"),
		"restrict": ["necromanteion"],
		"actionType": "privmsg",
		"action": function(message, nickname, target) {
			target = (target.charAt(0) == "#" ? target : nickname);
		
			var path = fs.realpathSync("./scripts/") + "\\";
				scripts = fs.readdirSync("./scripts/");
			for (i = 0; i < scripts.length; i++) { delete require.cache[path + scripts[i]];	};
			return [target,load()];
		}
	});
	
	for (i = 0; i < actions.length; i++) {
		if (actions[i].exclude) { actions[i].exclude = new RegExp("\\b(?:" + actions[i].exclude.join("|") + ")\\b", "i"); }
		else { actions[i].exclude = new RegExp("\\b(?!\\b(?:" + actions[i].restrict.join("|") + ")\\b)\\w+\\b", "i"); }
	};
	return config.nick + " rebooted and ready to rock!";
})();

function handleResponse(actionType, response) {
	pickAction = ["privmsg","notice","join","part","mode","topic","me","ctcp","disconnect","reconnect"];
	d = new Date();
			//console.log("[" + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2) + ":" + ("0" + date.getSeconds()).slice(-2) + "] <" + message.nickname + "> " + message.message );
	doAction = [
		function(response) {
			client.irc.privmsg(response[0],response[1]);			//target, message
			console.log("[" + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2) + "] <" + config.nick + "> " + response[1] );
			},
		function(response) { client.irc.notice(response[0],response[1]); },				//target, message
		function(response) {
			client.irc.join(response[0],response[1]);				//channel, [password]
			console.log("[" + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2) + "] * " + config.nick + " has joined " + response[0]);
			},
		function(response) {
			client.irc.part(response[0],response[1]);				//channel, [message]
			console.log("[" + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2) + "] * " + config.nick + " has left " + response[0] + (response[1].length > 0 ? " (" + response[1] + ")" : "") );
			},
		function(response) { client.irc.mode(response[0],response[1]); },				//target, mode
		function(response) { client.irc.topic(response[0],response[1]); },				//channel, topic
		function(response) {
			client.irc.me(response[0],response[1]);					//target, message
			console.log("[" + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2) + "] * " + config.nick + response[1] );
			},
		function(response) { client.irc.ctcp(response[0],response[1],response[2]); },	//target, type, message
		function(response) { client.irc.disconect(response[0]); },						//message
		function(response) { client.irc.reconnect(); }
	];
	
	doAction[pickAction.indexOf(actionType)](response);
	return;
};
