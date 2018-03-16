const event = require('events');
const eventEmitter = new event.EventEmitter();

const connectedHandler = function connected() {
    console.log('连接成功');

    eventEmitter.emit('received');
};

eventEmitter.on('connected', connectedHandler);
eventEmitter.on('received', () => console.log('接收数据'));
eventEmitter.emit('connected');

console.log('程序执行完毕。');