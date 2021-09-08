const Ticker = require('./modules/ticker');

let count = 0;
process.on("tick", function () {
    count++;
    console.log(count + " second passed.");

    if (count > 10) {
        ticker.emit("stop");
        console.log('10초가 지났기 때문에 ticker객체의 stop 이벤트를 실행시킵니다.' )
    }
})

let ticker = new Ticker(process);
ticker.start();