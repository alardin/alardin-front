const clock = document.querySelector('.timer p');
const stopWatch = document.querySelector('.lock-remain p');
let lockingFlag = false;
let playSeconds = -2;
let stopWatchSeconds = 60;
let failCount = 0;

//초를 분으로 바꾸어주는 함수
const secondsToMiniutes = seconds => {
  const minutes = Math.floor(seconds / 60);
  const afterSeconds = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(afterSeconds).padStart(
    2,
    '0',
  )}`;
};

//타이머 전용
const clockChange = () => {
  clock.innerHTML = secondsToMiniutes(playSeconds);
  playSeconds += 1;
  if (playSeconds > 60 * 5) {
    // 5분 시간 초과로 RN한테 시간 초과했다고 전달하기!!
    const startedTime = new Date(Date.now());
    startedTime.setMinutes(startedTime.getMinutes() - 5);
    if (window.ReactNativeWebView) {
      const result = JSON.stringify({
        type: 'TIME_OUT',
        message: {
          start_time: startedTime
            .toISOString()
            .replace(/[T]/g, ' ')
            .replace(/[Z]/g, ''),
          end_time: new Date(Date.now())
            .toISOString()
            .replace(/[T]/g, ' ')
            .replace(/[Z]/g, ''),
          data: {
            play_time: 300, //플레이시간
            trial: 1, //실패 횟수
            data: {
              // optional keys
              is_bot_used: false, //봇 개입 여부
            },
          },
          is_cleared: false,
          Game_channel_id: 0,
          Game_id: 2, //진행한 게임
        },
      });
      window.ReactNativeWebView.postMessage(result);
    } else {
      console.log('Not React Native WebView');
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
      document.querySelector('.warning-watch').classList.add('hidden');
      clearInterval(stopWatchInterval);
    }
    stopWatchSeconds -= 1;
    stopWatch.innerHTML = secondsToMiniutes(stopWatchSeconds);
  }, 1000);
};
