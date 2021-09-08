const util = require('util');
const { EventEmitter } = require('events');
// 사용자 정의 객체가 on, emit 등의 이벤트 기능을 수행하려면 
// EventEmitter를 상속 받아야 한다.

let tick_target = null; // Ticker가 이벤트를 발생시킬 목적지.

const Ticker = function (target) {
    tick_target = target;
    console.log('생성자 함수 실행 완료!');

    // emit으로 stop 이벤트를 발생시키면
    // 처리할 리스너 등록
    this.on("stop", () => {
        clearInterval(ticker);
    })
}

// Prototype을 이용한 객체 공용 메서드 작성
Ticker.prototype.start = () => {
    ticker = setInterval(() => {
        tick_target.emit("tick"); // tick_target 객체로 tick 이벤트 전송.
    }, 1000); // 1초에 한번씩 이벤트 전송
}

// node의 util 패키지로 EventEmitter의 Prototype을 상속받는다.
// util.inherits(constructor, superConstructor)
// Ticker의 부모를 EventEmitter로 물려준다.
util.inherits(Ticker, EventEmitter);

// Ticker 모듈 내보내기
module.exports = Ticker;