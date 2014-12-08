var fs = require("fs");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var xhr = new XMLHttpRequest();
var url = "https://www.padherder.com/api/monsters/";

xhr.onreadystatechange = function() {
	if (xhr.readyState == 4 && xhr.status == 200) {
		var monster_data = JSON.stringify(JSON.parse(xhr.responseText));
		fs.writeFile("monster_data.txt", monster_data, function(err) {
			if (err) throw err;
			console.log("Monster data saved to file!");
		});
	}
}
xhr.open("GET", url, true);
xhr.send();
