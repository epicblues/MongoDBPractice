// 내장 객체
/*
console
process
exports
*/


// process 객체
console.log(process.version, // Node 버전
    process.platform,   // 운영체제 종류
    process.arch);  // 프로세서 아키텍처
console.log(process.versions); // 종속된 프로그램의 버전들
console.log(process.env); // 환경 변수

// Global 변수
console.log(__dirname); // 현재 모듈의 디렉터리 경로
console.log(__filename); // 현재 모듈의 파일 경로


// 모듈로 부터 개별 객체를 불러온다.
const { add, square } = require('./modules/test_module1');
const { circle, rectangle, ...others} = require("./modules/test_module2");
console.log(add(10, 20)); // 불러온 객체 사용.
console.log(square(5));

console.log(circle(5), rectangle(10, 20));

console.log(others);