'use strict'

module.exports = {
    ops: {
        interval: 1000
    },
    reporters: {
        myConsoleReporter: [
            {
                module: '@hapi/good-squeeze',
                name: 'Squeeze',
                args: [{ log: '*', response: '*', error: '*'}]
            },
            {
                module: '@hapi/good-console'
            },
            'stdout'
        ]
    }
};