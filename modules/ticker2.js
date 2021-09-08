const EventEmitter = require("events");

class Ticker extends EventEmitter{
    constructor(target) {
        super();
        this.tick_target = target;
        this.ticker = null;
        console.log('Ticker 생성자 함수 실행 완료');
        super.on('stop', () => {
            clearInterval(this.ticker);
        })
    }
    start() {
        this.ticker = setInterval(() => {
            this.tick_target.emit('tick');
        }, 1000);
    }
}

module.exports = Ticker;