export const minuteStringCheck = (minute: number) => {
  return minute >= 0 && minute < 10 ? `0${minute}` : `${minute}`;
};

export const convertDay = (day: number) => {
  const dayString = ['월', '화', '수', '목', '금', '토', '일'];
  return day === 0 ? '없음' : dayString[day];
};

export const convertDate = (date: Date) => {
  const today = new Date();
  const [dMonth, dDate, dDay] = [
    date.getMonth(),
    date.getDate() + 1,
    convertDay(date.getDay()),
  ];
  const leftDate = Math.abs(today.getDate() - dDate);
  const changeComment = () => {
    if (leftDate === 0) return '오늘';
    if (leftDate === 1) return '내일';
    if (leftDate === 2) return '내일 모레';
    if (leftDate >= 3 && leftDate <= 5) return `${leftDate}일 후`;
    return `${dMonth}월 ${dDate}일(${dDay})`;
  };
  return changeComment();
};

export const dateToTimeString = (date: Date) => {
  const [hour, minute] = [date.getHours(), date.getMinutes()];
  return `${hour}:${minute}`;
};

export const convertTime = (time: string) => {
  const arrTime = time.split(':');
  const convertHour =
    Number(arrTime[0]) > 12 ? Number(arrTime[0]) % 12 : Number(arrTime[0]);
  const convertMinute = minuteStringCheck(Number(arrTime[1]));
  const convertString = `${convertHour}:${convertMinute}`;
  const amPm = Number(arrTime[0]) < 12 ? '오전' : '오후';

  return `${amPm} ${convertString}`;
};

export const isToday = (time: string) => {
  const lastTime = new Date();
  lastTime.setDate(lastTime.getDate() + 1);
  lastTime.setHours(0);
  lastTime.setMinutes(0);

  const currentTime = new Date();
  const setTime = new Date();

  console.log(time.split(' '));
  const [amPm, strTime] = time.split(' ');
  const [hour, minute] = strTime.split(':');
  const strHour = () => {
    if (amPm === '오후' && Number(hour) !== 12) {
      return Number(hour) + 12;
    }
    return Number(hour);
  };
  setTime.setHours(strHour());
  setTime.setMinutes(Number(minute));
  return setTime < lastTime && setTime > currentTime ? true : false;
};

export const convertRepeatDay = (days: string) => {
  const arrDays = days.split('');
  const convertDays = arrDays.map((day, index) => {
    const result = convertDay(Number(day));
    if (arrDays.length > 1 && index < arrDays.length - 1) {
      return `${result},`;
    }
    return result;
  });
  return convertDays.join('');
};
