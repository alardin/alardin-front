/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/naming-convention */

import React, { useEffect, useState } from 'react';
import { Calendar, DateData, LocaleConfig } from 'react-native-calendars';
import { MarkedDates } from 'react-native-calendars/src/types';
import CenterScreen from '../../../screen/CenterScreen';
import theme from '../../../theme/theme';
import alardinApi from '../../../utils/alardinApi';
import { minuteStringCheck } from '../../../utils/home/convertDateTime';
import Button from '../../atoms/button/Button';
import FilterDate from '../../organisms/record/time/FilterDate';
import RecTimeList from '../../organisms/record/time/RecTimeList';

export interface IRecTimeItem {
  created_at: string;
  User_id: number;
  Alarm_result_id: number;
  Alarm_result: {
    start_time: string;
    end_time: string;
    trial: number;
    play_time: number;
    Game: {
      name: string;
      thumbnail_url: string;
    };
    Alarm: {
      id: number;
      Members: { nickname: string; thumbnail_image_url: string }[];
    };
  };
}

export interface IRecTimeState {
  date: string;
  records: IRecTimeItem[];
}

const TRecordTime = () => {
  LocaleConfig.locales['kr'] = {
    monthNames: [
      '1월',
      '2월',
      '3월',
      '4월',
      '5월',
      '6월',
      '7월',
      '8월',
      '9월',
      '10월',
      '11월',
      '12월',
    ],
    monthNamesShort: [
      '1월',
      '2월',
      '3월',
      '4월',
      '5월',
      '6월',
      '7월',
      '8월',
      '9월',
      '10월',
      '11월',
      '12월',
    ],
    dayNames: [
      '일요일',
      '월요일',
      '화요일',
      '수요일',
      '목요일',
      '금요일',
      '토요일',
    ],
    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
    today: '오늘',
  };
  LocaleConfig.defaultLocale = 'kr';

  const [loading, setLoading] = useState<boolean>(false);
  const [selectDate, setSelectDate] = useState<{
    start: number;
    end: number;
    startText: string;
    endText: string;
  }>({
    start: 0,
    end: 0,
    startText: '',
    endText: '',
  });
  const [markedDates, setMarkedDates] = useState<MarkedDates>({});
  const [visible, setVisible] = useState<boolean>(false);
  const [data, setData] = useState<IRecTimeState[]>([]);
  const [filterData, setFilterData] = useState<IRecTimeState[]>([]);

  const handleDate = (day: DateData) => {
    const convertDate = day.timestamp;
    if (
      (selectDate.start !== 0 && selectDate.end !== 0) ||
      (selectDate.start === 0 && selectDate.end === 0)
    ) {
      setMarkedDates({
        [day.dateString]: {
          startingDay: true,
          selected: true,
          color: theme.color.primary_400,
        },
      });
      setSelectDate({
        start: convertDate,
        end: 0,
        startText: day.dateString,
        endText: '',
      });
      return;
    }
    setMarkedDates(prevState => {
      let markerTemp = {};
      const diffDay = Math.floor(
        (day.timestamp - selectDate.start) / 1000 / 60 / 60 / 24,
      );
      for (let i = 0; i < diffDay - 1; i++) {
        const toDate = new Date(selectDate.start);
        toDate.setDate(toDate.getDate() + i + 1);
        markerTemp = {
          ...markerTemp,
          [`${toDate.getFullYear()}-${minuteStringCheck(
            toDate.getMonth() + 1,
          )}-${minuteStringCheck(toDate.getDate())}`]: {
            selected: true,
            color: theme.color.primary_400,
          },
        };
      }
      return {
        ...prevState,
        ...markerTemp,
        [day.dateString]: {
          endingDay: true,
          selected: true,
          color: theme.color.primary_400,
        },
      };
    });
    setSelectDate(prevState => ({
      ...prevState,
      end: convertDate,
      endText: day.dateString,
    }));
  };

  const handleSubmit = () => {
    if (selectDate.start === 0 || selectDate.end === 0) {
      setSelectDate({
        start: 0,
        end: 0,
        startText: '',
        endText: '',
      });
    }
    setMarkedDates({});
    setVisible(false);
  };

  useEffect(() => {
    setLoading(true);
    alardinApi.get('/users/history').then(res => {
      console.log(JSON.stringify(res.data.data));
      const tempHash = new Map();
      const tempArr = [];
      res.data.data.map((record: IRecTimeItem) => {
        const date = record.created_at.split('T')[0];
        if (tempHash.has(date)) {
          tempHash.set(date, [...tempHash.get(date), record]);
          return;
        }
        tempHash.set(date, [record]);
      });
      for (const [key, value] of tempHash) {
        tempArr.push({ date: key, records: value });
      }
      setData(tempArr);
      setLoading(false);
    });
    return () => setData([]);
  }, []);

  useEffect(() => {
    selectDate.start !== 0 && selectDate.end !== 0
      ? setFilterData(
          data.filter(item => {
            const itemTimestamp = new Date(item.date).getTime();
            return (
              selectDate.start <= itemTimestamp &&
              itemTimestamp <= selectDate.end
            );
          }),
        )
      : setFilterData(data);
    return () => setFilterData([]);
  }, [selectDate, data]);

  return (
    <>
      <FilterDate {...{ setVisible, selectDate, setSelectDate }} />
      <RecTimeList data={filterData} {...{ setData, loading, setLoading }} />
      <CenterScreen visible={visible} setVisible={setVisible}>
        <Calendar
          markingType="period"
          onDayPress={handleDate}
          markedDates={markedDates}
          style={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
        />
        <Button
          width="100%"
          height="l"
          center
          style={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}
          options="primary_fill"
          onPress={handleSubmit}>
          확인
        </Button>
      </CenterScreen>
    </>
  );
};

export default TRecordTime;
