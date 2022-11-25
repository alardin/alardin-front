const clock = document.querySelector(".timer p");
const stopWatch = document.querySelector(".lock-remain p");
let lockingFlag = false;
let playSeconds = -2;
let stopWatchSeconds = 60;
let failCount = 0;

//초를 분으로 바꾸어주는 함수
const secondsToMiniutes = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const afterSeconds = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(afterSeconds).padStart(
    2,
    "0"
  )}`;
};

//타이머 전용
const clockChange = () => {
  clock.innerHTML = secondsToMiniutes(playSeconds);
  playSeconds += 1;
  if (playSeconds > 60 * 10) {
    // 10분 시간 초과로 RN한테 시간 초과했다고 전달하기!!
    makeOutputData(false);
    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(toJSON("TIME_OUT",outputData));
    } else {
      console.log("Not React Native WebView");
    }
  }
  //console.log(playSeconds, clock.innerHTML);
};

clockChange();
const clockInterval = setInterval(clockChange, 1000); //반복실행

const startStopWatch = () => {
  //스톱워치 구현 코드
  stopWatch.innerHTML = secondsToMiniutes(stopWatchSeconds);
  const stopWatchInterval = setInterval(function () {
    if (stopWatchSeconds == 1) {
      lockingFlag = false;
      document.querySelector(".warning-watch").classList.add("hidden");
      clearInterval(stopWatchInterval);
    }
    stopWatchSeconds -= 1;
    stopWatch.innerHTML = secondsToMiniutes(stopWatchSeconds);
  }, 1000);
};
