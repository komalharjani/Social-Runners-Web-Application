let url = require('url');

module.exports = {
    handleRequests: function(req, res) {
        res.writeHead(200, {'Content-Type': 'text/html'});

        let path = url.parse(req.url).pathname;
        switch(path) {
            case '/':
        }
    }
}