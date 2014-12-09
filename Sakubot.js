var config = {
	server: "irc.rizon.net",
	nick: "Sakubot",
	pass: "SEA#$hark",
	options: {
		userName: "Sakubot.2",
		realName: "Sakubot.js",
		//port: 6667,
		//debug: false,
		//showErrors: false,
		//autoRejoin: true,
		//autoConnect: true,
		channels: ["#sakubot"],
		//secure: false,
		//selfSigned: false,
		//certExpired: false,
		//floodProtection: false,
		//floodProtectionDelay: 1000,
		//sasl: false,
		//stripColors: false,
		//channelPrefixes: "&#",
		messageSplit: 512
	}
};

var fs = require("fs");
	irc = require("irc");
	XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var Sakubot = new bot();
	//Sakubot.client = new irc.Client(config.server, config.nick, config.options);
	
function bot() {
	var self = this;
	self.actions = [];
	
	//load scripts from Sakubot/scripts
	var scripts = fs.readdirSync("./scripts");
		actions = [];
	for (i = 0; i < scripts.length; i++) {
		if (scripts[i].indexOf(".js") < 0) { continue; };
		script = require("./scripts/" + scripts[i])(self);
		if (typeof script.actionTrigger === undefined || typeof script.actionFunction === undefined) { continue; };
		
		script.responseMethods = script.responseMethods || {"pm":"pm", "public":"public"};
		
		self.actions.push(script);
	};
	
	self.trigger = function(nick, chan, message) {		
		for (i = 0; i < self.actions.length; i++) {
			if (self.actions[i].actionTrigger.exec(message)) { 
				arguments = message.replace(self.actions[i].actionTrigger, "").trim();
				action = self.actions[i].actionFunction(nick, chan, arguments);
			};
		};
	};
};
