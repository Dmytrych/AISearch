import log4js from "log4js";

export function initLogger() {
    log4js.configure({
        appenders: {
            console: { type: 'console' },
            file: { type: 'file', filename: 'logs/app.log' }
        },
        categories: {
            default: { appenders: ['console', 'file'], level: 'info' }
        }
    });

    return log4js.getLogger('app')
}