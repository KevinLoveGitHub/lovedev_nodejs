'use strict';

module.exports = {
    port: 8764,
    url: 'mongodb://39.106.115.214:27017/lovedev',
    session: {
        name: 'SID',
        secret: 'SID',
        cookie: {
            httpOnly: true,
            secure: false,
            maxAge: 365 * 24 * 60 * 60 * 1000,
        }
    }
};
