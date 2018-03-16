const http = require('http');
const url = require('url');

http.createServer((req, res) => {
    // 发送 HTTP 头部
    // HTTP 状态值: 200 : OK
    // 内容类型: text/plain
    const string = url.parse(req.url).pathname;
    console.log(string);
    // 输出全局变量 __filename 的值
    console.log(__filename);
    // 输出全局变量 __dirname 的值
    console.log(__dirname);
    res.writeHead(200, {'Content-Type': 'text/plain'});

    // 发送响应数据 "Hello World"
    res.end('Hello World\n');
}).listen(8888);