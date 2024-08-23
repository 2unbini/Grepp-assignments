let http = require('http');

function onRequest(req, res) {
	res.writeHead(200, {
		'Content-Type': 'text/html'
	});
	res.write('This is Eunbin\'s Node.js');
	res.end();
}

function start() {
	http.createServer(onRequest).listen(8080);
}

start();

exports.start = start;