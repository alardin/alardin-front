const outputData = {
  start_time: new Date().toISOString(),
  end_time: '2022-07-22:09:03:00',
  data: {
    play_time: 180, //플레이시간
    trial: 3, //실패 횟수
    data: {
      // optional keys
      is_bot_used: false, //봇 개입 여부
      is_cleared: false,
    },
  },
  Game_channel_id: 0,
  Game_id: 2, //진행한 게임
};

//외의 outputData
const objNums = []; //게임에 사용된 숫자 4개
const allCases = new Map(); //숫자 4개로 만들 수 있는 모든 경우의 수
let objCases = 20; //맞춰야 하는 개수 초기값
let correctCount = 0; //유저가 현재 맞춘 횟수
let correctArray = []; //숫자 정보가 들어가있음
const tutorialCode = []; //튜토리얼 전용 숫자 3개

//아래는 사용할 기타 변수들
let userInput = '';
let LOCK_SECONDS = 5; //틀렸을 때 잠금거는 시간

//다음 정보는 document에서 가져올 그리드 정보
const userAnswerGrid = document.querySelector('.user-correct-answer');
const calculatorGrid = document.querySelector('.calculator');
const userInputData = document.querySelector('.user-input');
const correctCountData = document.querySelector('.check');

const orderingException = ordering => {
  //괄호가 두 개 나오는 경우 exception 처리
  const orderOps = ['*', '/'];
  for (let i1 = 0; i1 < 2; i1++) {
    const [operOne, evalOne] = [
      `(${ordering[0]}${orderOps[i1]}${ordering[1]})`,
      eval(`(${ordering[0]}${orderOps[i1]}${ordering[1]})`),
    ];
    if (evalOne > 0 && Number.isInteger(evalOne)) {
      for (let i2 = 0; i2 < 2; i2++) {
        const [operTwo, evalTwo] = [
          `(${ordering[2]}${orderOps[i2]}${ordering[3]})`,
          eval(`(${ordering[2]}${orderOps[i2]}${ordering[3]})`),
        ];
        if (evalTwo > 0 && Number.isInteger(evalTwo)) {
          //실제 연산 진행부
          const [resultOne, resultEvalOne] = [
            `${operOne}+${operTwo}`,
            eval(`${operOne}+${operTwo}`),
          ];
          if (
            !allCases.has(resultEvalOne) ||
            (allCases.get(resultEvalOne).length > resultOne.length &&
              String(resultEvalOne).length === 2)
          )
            allCases.set(resultEvalOne, resultOne); //덧셈
          const [resultTwo, resultEvalTwo] = [
            `${operOne}-${operTwo}`,
            eval(`${operOne}-${operTwo}`),
          ];
          if (resultEvalTwo > 0) {
            //뺄셈
            if (
              !allCases.has(resultEvalTwo) ||
              (allCases.get(resultEvalTwo).length > resultTwo.length &&
                String(resultEvalTwo).length === 2)
            )
              allCases.set(resultEvalTwo, resultTwo);
          }
        }
      }
    }
  }
};
//예외 일단 발견

const makeAllCasesFromOrdering = ordering => {
  //stack을 이용한 모든 경우의 사칙연산. 일종의 dfs
  orderingException(ordering);
  const [a, b] = [ordering[0], ordering[1]]; //비구조화 선언
  //어려운 js의 세계. easy to learn, hard to master. sibal
  const stack = [];
  stack.push([`${a}+${b}`, '+', 2]);
  stack.push([`${a}-${b}`, '-', 2]);
  stack.push([`${a}*${b}`, '*', 2]);
  if (a % b == 0) stack.push([`${a}/${b}`, '/', 2]);
  while (stack.length != 0) {
    const [fullOps, op, length] = stack.pop(); //비구조화^^
    if (eval(fullOps) > 0 && String(eval(fullOps)).length == 2) {
      if (tutorialCode.length != 6) tutorialCode.push(eval(fullOps)); //튜토리얼 3개만 빼오자
      if (
        !allCases.has(eval(fullOps)) ||
        (allCases.has(eval(fullOps)) &&
          allCases.get(eval(fullOps)).length > fullOps.length)
      )
        allCases.set(eval(fullOps), fullOps); //음수가 아니고 두 자리 경우에만 저장(+수식 최적화)
    }
    if (length == ordering.length) continue; //최대 길이라면 아래의 연산을 실행하지 않음
    stack.push([`${fullOps}+${ordering[length]}`, '+', length + 1]); //덧셈 연산
    stack.push([`${fullOps}-${ordering[length]}`, '-', length + 1]); //뺄셈 연산
    if (op == '+' || op == '-')
      stack.push([`(${fullOps})*${ordering[length]}`, '*', length + 1]);
    //곱셈 연산
    else stack.push([`${fullOps}*${ordering[length]}`, '*', length + 1]);
    if (eval(fullOps) % ordering[length] == 0) {
      //나눗셈 연산
      if (op == '+' || op == '-')
        stack.push([`(${fullOps})/${ordering[length]}`, '/', length + 1]);
      else stack.push([`${fullOps}/${ordering[length]}`, '/', length + 1]);
    }
  }
};

let visited = [false, false, false, false];
const currentNums = [];
const makeAllNumCases = (length, visited) => {
  //백트래킹을 이용한 모든 경우의 수 구하기
  if (length == objNums.length) {
    //길이 달성
    //console.log(currentNums);
    makeAllCasesFromOrdering(currentNums);
    return;
  }
  for (let i = 0; i < objNums.length; i++) {
    if (!visited[i]) {
      visited[i] = true;
      currentNums.push(objNums[i]);
      makeAllNumCases(length + 1, visited);
      currentNums.pop();
      visited[i] = false;
    }
  }
};

const makeRandomNumber = () => {
  objNums.push(2 + (Math.floor(Math.random() * 10) % 5)); //2~6사이의 수
  objNums.push(2 + (Math.floor(Math.random() * 10) % 5)); //2~6사이의 수
  objNums.push(5 + (Math.floor(Math.random() * 10) % 3)); //5~8사이의 수
  objNums.push(10 + (Math.floor(Math.random() * 10) % 3)); //10~13사이의 수

  //objNums.push(5);
  //objNums.push(3);
  //objNums.push(6);
  //objNums.push(10);

  document.querySelector('.num-one p').innerHTML = objNums[0];
  document.querySelector('.num-two p').innerHTML = objNums[1];
  document.querySelector('.num-three p').innerHTML = objNums[2];
  document.querySelector('.num-four p').innerHTML = objNums[3];
};

const makeGrid = (container, rows, cols, vh) => {
  for (let i = 1; i <= rows * cols; i++) {
    let cell = document.createElement('div');
    cell.innerText = i;
    cell.style.padding = `${vh}vh 0 ${vh}vh 0`;
    container.appendChild(cell).className = `grid-item${i}`;
  }
};

const tempClickLock = milli => {
  //임시로 클릭 막는 함수
  calculatorGrid.classList.add('click-locked');
  setTimeout(() => {
    calculatorGrid.classList.remove('click-locked');
  }, milli);
};

const textModify = () => {
  calculatorGrid.querySelector('.grid-item10').innerHTML = '←'; //계산기 출력 조정
  calculatorGrid.querySelector('.grid-item11').innerHTML = '0';
  calculatorGrid.querySelector('.grid-item12').innerHTML = '입력';
  const objCases = Math.min(20, Math.ceil(allCases.size / 2)); //맞추어야 하는 개수 보정
  document
    .querySelector('.question-info')
    .querySelector(
      'p:nth-child(2)',
    ).innerHTML = `두 자리 수를 ${objCases}개 만드세요`; //맞추어야 하는 개수 조정
  for (let i = 1; i <= 20; i++)
    userAnswerGrid.querySelector(`.grid-item${i}`).innerHTML = ``; //맞춘 정답 칸 비워놓기
  userInputData.placeholder = tutorialCode.pop(); //튜토리얼은 세 번뿐이다.
};

const layoutModify = () => {
  for (let i = 2; i <= 11; i += 3)
    calculatorGrid
      .querySelector(`.grid-item${i}`)
      .classList.add('keypad-column');
  for (let i = 4; i <= 12; i++)
    calculatorGrid.querySelector(`.grid-item${i}`).classList.add('keypad-row');
  document.querySelector('.user-correct-explain').classList.add('keypad-row');
};

const startGame = () => {
  //사진들을 pictures에 넣어보자
  tempClickLock(2000); //애니메이션을 위해 잠깐 잠금
  //랜덤 생성 로직
  makeRandomNumber();
  makeAllNumCases(0, visited);

  //html 상에서 그리드 짜는게 어려워 js로 구현
  makeGrid(userAnswerGrid, 4, 5, 0.4);
  makeGrid(calculatorGrid, 3, 4, 2);

  textModify(); //자잘한 텍스트 수정
  layoutModify(); //자잘한 레이아웃 예쁘게 수정
};

const makeOutputData = () => {
  outputData.end_time = new Date().toISOString();
  outputData.data.play_time = playSeconds - 1;
  outputData.data.trial = failCount;
  outputData.Game_id = 2;
  outputData.data.data.is_cleared = true;
};

// 아래에 있는 함수들은 적절한 위치에 실행 시킬 것!
const requestGameHasEnd = () => {
  // requestGameHasEnd는 게임이 종료되었다는 결과를 RN(App)한테 통보할 수 있는 함수
  if (window.ReactNativeWebView) {
    // endGame 함수와 병합
    const result = JSON.stringify({
      type: 'OUTPUT_DATA',
      message: outputData,
    });
    window.ReactNativeWebView.postMessage(result);
  } else {
    console.log('Not React Native WebView');
    // alert({ message: "error" });
  }
};

const endGame = () => {
  makeOutputData();
  requestGameHasEnd();
};

const gameTutorial = () => {
  if (correctArray.length < 3) {
    let tempTutorialInfo = tutorialCode.pop();
    while (correctArray.includes(tempTutorialInfo))
      tempTutorialInfo = tutorialCode.pop();
    userInputData.placeholder = tempTutorialInfo;
  } else userInputData.placeholder = '';
};

const addCorrectArr = () => {
  correctArray.push(inputToInt);
  userAnswerGrid.querySelector(`.grid-item${correctCount + 1}`).innerText =
    correctArray[correctCount];
  correctCount += 1;
};

const lockClassInfoAdd = () => {
  calculatorGrid.classList.add('click-locked');
  document.querySelector('.warning-watch').classList.remove('hidden');
  stopWatchSeconds = LOCK_SECONDS; //스탑워치 초기화
  failCount += 1;
};

const appEvent = () => {
  //윈도우의 이벤트를 추가하고 관리하는 함수
  for (let i = 1; i <= 12; i++) {
    calculatorGrid
      .querySelector(`.grid-item${i}`)
      .addEventListener('touchstart', e => {
        //console.log(i+'누름');//색을 변하게 해야함
        if (i == 1)
          calculatorGrid
            .querySelector(`.grid-item${i}`)
            .classList.add('clicked-one');
        if (i == 3)
          calculatorGrid
            .querySelector(`.grid-item${i}`)
            .classList.add('clicked-three');
        if (i == 10)
          calculatorGrid
            .querySelector(`.grid-item${i}`)
            .classList.add('clicked-erase');
        if (i == 12)
          calculatorGrid
            .querySelector(`.grid-item${i}`)
            .classList.add('clicked-enter');
        else
          calculatorGrid
            .querySelector(`.grid-item${i}`)
            .classList.add('clicked');
      });
  }
  for (let i = 1; i <= 12; i++) {
    calculatorGrid
      .querySelector(`.grid-item${i}`)
      .addEventListener('touchend', e => {
        //console.log(i+'뗌');//
        if (i == 10) {
          //지우기 버튼
          userInput = '';
        } else if (i == 12) {
          //입력 버튼
          //체크 부분 구현
          inputToInt = Number(userInput);
          if (allCases.has(inputToInt) && !correctArray.includes(inputToInt)) {
            //맞았을 경우
            //console.log('맞았습니다.');
            addCorrectArr(); //정답을 정답 배열에 저장
            gameTutorial(); //3개 예제 보여주면서 게임 익히기

            document.querySelector(
              '.user-correct-explain',
            ).innerText = `${allCases.get(inputToInt)} = ${inputToInt}`;
            userInput = '';
            correctCountData.querySelector('p').innerText = correctCount;
            if (correctCount == objCases) {
              //게임 종료 조건 쿼리
              endGame();
            }
          } else {
            //틀림
            if (correctArray.includes(inputToInt)) {
              userAnswerGrid.querySelector(
                `.grid-item${correctArray.indexOf(inputToInt) + 1}`,
              ).style.animation = `wrong ${LOCK_SECONDS}s both`;
              setTimeout(() => {
                userAnswerGrid.querySelector(
                  `.grid-item${correctArray.indexOf(inputToInt) + 1}`,
                ).style.animation = '';
              }, LOCK_SECONDS * 1000);
            }
            lockClassInfoAdd(); //관련 클래스 및 output 정보 추가
            tempClickLock(LOCK_SECONDS * 1000); //제한시간동안 클릭 막음
            startStopWatch();
            LOCK_SECONDS = Math.min(20, LOCK_SECONDS + 5); //최대 시간은 20초
          }
        } else {
          //숫자 버튼
          if (userInput.length < 2) {
            //숫자 길이 제한과 0에 대한 처리
            if (i == 11) {
              if (userInput.length == 0 || Number(userInput) != 0)
                userInput += '0';
              else userInput += '';
            } else {
              if (userInput == '0') userInput += '';
              else userInput += String(i);
            }
          }
        }
        userInputData.value = userInput;
        if (i == 1)
          calculatorGrid
            .querySelector(`.grid-item${i}`)
            .classList.remove('clicked-one');
        if (i == 3)
          calculatorGrid
            .querySelector(`.grid-item${i}`)
            .classList.remove('clicked-three');
        if (i == 10)
          calculatorGrid
            .querySelector(`.grid-item${i}`)
            .classList.remove('clicked-erase');
        if (i == 12)
          calculatorGrid
            .querySelector(`.grid-item${i}`)
            .classList.remove('clicked-enter');
        else
          calculatorGrid
            .querySelector(`.grid-item${i}`)
            .classList.remove('clicked');
      });
  }
};

const init = () => {
  //실행에 필요한 이벤트 호출
  startGame();
  appEvent();
  console.log(objNums);
  console.log(allCases);
};

window.onload = () => {
  init();
};
