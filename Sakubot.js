var config = {
	nick: "Sakubotdotjs",
	pass: "",
	user: "Saku",
	server: "irc.rizon.net",
	realname: "Sakubot.js",
	port: 6667,
	secure: false
};
	channels = ["#sakubot","#padg","#padgsexyparty"]

var factory = require("irc-factory");
	fs = require("fs");
	XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
	Sakubot = new factory.Api();
	client = Sakubot.createClient("Sakubot", config);

Sakubot.hookEvent("Sakubot", "notice", function(message) {
	if (message.message.indexOf("vhost") > -1) {
		for (i = 0; i < channels.length; i++) {
			client.irc.join(channels[i]);
		};
	};
	console.log(message.message);
});

Sakubot.hookEvent("Sakubot", "registered", function(message) {
	client.irc.privmsg("nickserv", "ghost " + config.nick + " " + config.pass);
	client.irc.raw(["nick", config.nick]);
	client.irc.privmsg("nickserv", "identify " + config.pass);
	Sakubot.unhookEvent("Sakubot", "registered");
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
	timestamp = "[" + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2) + "]";
	doAction = [
		//privmsg (target, message)
		function(response) {
			client.irc.privmsg(response[0],response[1]);
			console.log(timestamp + " <" + config.nick + "> " + response[1] );
		},
		//notice (target, message)
		function(response) { client.irc.notice(response[0],response[1]); },
		//join (channel, [password], target)
		function(response) {
			client.irc.raw(["whois", config.nick]);
			Sakubot.hookEvent("Sakubot", "whois", function(message) {
				var channels = message.channels || [];
				for (i = 0; i < channels.length; i++) { channels[i] = channels[i].replace(/.*(?=#)/g,""); };
				if (channels.length == 0 || response[0].indexOf(channels) < 0) {
					client.irc.join(response[0],response[1]);
					console.log(timestamp + " * " + config.nick + " has joined " + response[0]);
				} else { client.irc.privmsg(response[2], "I'm already on that channel, onii-chan!") };
				Sakubot.unhookEvent("Sakubot", "whois");
			});
			return;
		},
		//part (channel, [message], target)
		function (response) {
			client.irc.raw(["whois", config.nick]);
			Sakubot.hookEvent("Sakubot", "whois", function(message) {
				var channels = message.channels || [];
				for (i = 0; i < channels.length; i++) { channels[i] = channels[i].replace(/.*(?=#)/g,""); };
				if (response[0].indexOf(channels) >= 0) {
					client.irc.part(response[0],response[1]);
					console.log(timestamp + " * " + config.nick + " has left " + response[0] + (response[1].length > 0 ? " (" + response[1] + ")" : "") );
				} else { client.irc.privmsg(response[2], "I'm not on that channel, onii-chan!") };
				Sakubot.unhookEvent("Sakubot", "whois");
			});
			return;
		},
		//mode (target, mode)
		function(response) { client.irc.mode(response[0],response[1]); },
		//topic (channel, topic)
		function(response) { client.irc.topic(response[0],response[1]); },
		//me (target, message)
		function(response) {
			client.irc.me(response[0],response[1]);
			console.log(timestamp + " * " + config.nick + " " + response[1] );
		},
		//ctcp (target, type, message)
		function(response) { client.irc.ctcp(response[0],response[1],response[2]); },
		//disconnect (message)
		function(response) { client.irc.disconect(response[0]); },
		//reconnect ()
		function(response) { client.irc.reconnect(); }
	];

	doAction[pickAction.indexOf(actionType)](response);
	return;
};
