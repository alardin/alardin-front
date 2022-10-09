import { Platform } from 'react-native';

export const minuteStringCheck = (minute: number) => {
  return minute >= 0 && minute < 10 ? `0${minute}` : `${minute}`;
};

export const convertDay = (day: number) => {
  const dayString = ['월', '화', '수', '목', '금', '토', '일'];
  return day === 0 ? '없음' : dayString[day];
};

export const convertNotifyDay = (day: number) => {
  const dayString = ['일', '월', '화', '수', '목', '금', '토'];
  return dayString[day];
};

export const convertDate = (dateString: string) => {
  if (dateString !== '' && dateString) {
    const date = new Date(dateString);
    const today = new Date();
    const [dMonth, dDate, dDay] = [
      date.getMonth() + 1,
      date.getDate() + 1,
      convertNotifyDay(date.getDay()),
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
  }
  return undefined;
};

export const convertNotifyDate = (dateString: string) => {
  if (dateString !== '' && dateString) {
    const date = new Date(dateString);
    const today = new Date();
    const [dMonth, dDate, dDay] = [
      date.getMonth() + 1,
      date.getDate() + 1,
      convertNotifyDay(date.getDay()),
    ];
    const leftDate = Math.abs(date.getDate() - today.getDate());
    const changeComment = () => {
      if (leftDate === 0) return '오늘';
      if (leftDate === 1) return '어제';
      if (leftDate === 2) return '그저께';
      if (leftDate >= 3 && leftDate <= 5) return `${leftDate}일 전`;
      return `${dMonth}월 ${dDate}일(${dDay})`;
    };
    return changeComment();
  }
  return undefined;
};

export const dateToTimeString = (date: Date) => {
  const [hour, minute] = [
    minuteStringCheck(date.getHours()),
    minuteStringCheck(date.getMinutes()),
  ];
  return `${hour}:${minute}`;
};

export const convertTime = (time: string | undefined) => {
  if (time !== '' && time) {
    const arrTime = time.split(':');
    let convertHour =
      Number(arrTime[0]) > 12 ? Number(arrTime[0]) % 12 : Number(arrTime[0]);
    const convertMinute = minuteStringCheck(Number(arrTime[1]));
    const amPm = Number(arrTime[0]) < 12 ? '오전' : '오후';
    if (amPm === '오전' && convertHour === 0) {
      convertHour = 12;
    }
    const convertString = `${convertHour}:${convertMinute}`;

    return `${amPm} ${convertString}`;
  }
};

export const isToday = (time: string) => {
  const lastTime = new Date();
  lastTime.setDate(lastTime.getDate() + 1);
  lastTime.setHours(0);
  lastTime.setMinutes(0);

  const currentTime = new Date();
  const setTime = new Date();

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

export const alarmItemtoDate = ({
  is_repeated,
  time,
}: {
  is_repeated: string;
  time: string;
}) => {
  const today = new Date(Date.now());
  const todayDate = `${today.getFullYear()}-${minuteStringCheck(
    today.getMonth() + 1,
  )}-${minuteStringCheck(today.getDate())}`;

  let convertDateType = new Date(`${todayDate}T${time}:00`);
  if (Platform.OS === 'android') {
    convertDateType.setMinutes(
      convertDateType.getMinutes() + today.getTimezoneOffset(),
    );
  }
  if (is_repeated === '0') {
    const isTodayCheck =
      is_repeated === '0' && today > convertDateType ? true : false;
    if (isTodayCheck) {
      convertDateType.setDate(convertDateType.getDate() + 1);
    }
    return convertDateType;
  }

  const checkDay = today.getDay();
  const repeatArr = is_repeated.split('').filter((stringDay: string) => {
    if (stringDay === '7') {
      stringDay = '0';
    }
    if (checkDay === Number(stringDay) && today < convertDateType) {
      return true;
    }
    return checkDay < Number(stringDay);
  });
  if (repeatArr.length !== 0) {
    const diffDay = Number(repeatArr[0]) - checkDay;
    convertDateType.setDate(convertDateType.getDate() + diffDay);
  } else {
    convertDateType.setDate(convertDateType.getDate() + 7);
  }
  return convertDateType;
};
