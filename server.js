const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 3000;
const MIME = { '.html':'text/html', '.css':'text/css', '.js':'application/javascript', '.json':'application/json' };

const server = http.createServer((req, res) => {
    const parsed = url.parse(req.url);
    let filePath = parsed.pathname === '/' ? '/index.html' : parsed.pathname;
    filePath = path.join(__dirname, '..', filePath);
    const ext = path.extname(filePath);

    if(filePath.includes('config/v1.0.0.json') || filePath.includes('api/config')){
        const configPath = path.join(__dirname, '../config/v1.0.0.json');
        fs.readFile(configPath, (err, data) => {
            if(err){
                res.writeHead(500, {'Content-Type':'application/json'});
                res.end(JSON.stringify({error:'Config not found'}));
                return;
            }
            res.writeHead(200, {'Content-Type':'application/json', 'Access-Control-Allow-Origin':'*'});
            res.end(data);
        });
        return;
    }

    fs.readFile(filePath, (err, data) => {
        if(err){
            res.writeHead(404, {'Content-Type':'text/plain'});
            res.end('404 Not Found');
            return;
        }
        res.writeHead(200, {'Content-Type': MIME[ext] || 'text/plain', 'Access-Control-Allow-Origin':'*'});
        res.end(data);
    });
});

server.listen(PORT, '0.0.0.0', () => {
    console.log('[VTĐZAI] Server running on http://localhost:' + PORT);
    console.log('[VTĐZAI] Config available at http://localhost:' + PORT + '/config/v1.0.0.json');
    console.log('[VTĐZAI] API at http://localhost:' + PORT + '/api/config');
});
