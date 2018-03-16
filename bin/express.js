const express = require('express');
const app = express();

app.get('/', (req, res) => {
    console.log('主页');
    res.send('GET');
});

const server = app.listen(8111, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log('应用实例，访问地址为 http://%s:%s', host, port);
});