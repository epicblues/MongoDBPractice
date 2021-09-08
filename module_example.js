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
console.log(__dirname);
console.log(__filename);