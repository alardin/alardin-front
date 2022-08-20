import React, { useEffect, useState } from 'react';
import { SetterOrUpdater, useSetRecoilState } from 'recoil';
import styled from 'styled-components/native';
import { summaryData } from '../../../../recoil/home/summary';
import Box from '../../../atoms/box/Box';
import CheckBox from '../../../atoms/checkbox/CheckBox';

//  0 ~ 6 -> 일 ~ 토요일

interface ISetItemDaysProps {
  display: string;
  setSetting: SetterOrUpdater<any>;
}

const DaysBox = styled(Box)<Omit<ISetItemDaysProps, 'setSetting'>>`
  justify-content: space-around;
  align-items: center;
  padding: 12px 18px;
  ${({ display }) => display === '아니요' && `display: none`}
`;

const SetItemDays = ({ display, setSetting }: ISetItemDaysProps) => {
  const dayText = ['월', '화', '수', '목', '금', '토', '일'];
  const [checked, setChecked] = useState<boolean[]>(
    Array.from({ length: 8 }, () => false),
  );
  const setSummary = useSetRecoilState(summaryData);

  useEffect(() => {
    const daysArr = checked
      .map((day, index) => day && index)
      .filter(value => typeof value === 'number');
    console.log(daysArr);
    const convertDays = daysArr.length === 0 ? '0' : daysArr.join('');
    setSetting((prevState: any) => ({
      ...prevState,
      is_repeated: convertDays,
    }));
    setSummary(prevState => ({
      ...prevState,
      is_repeated: daysArr.map(day => dayText[day - 1]).join(', '),
    }));
  }, [checked]);

  return (
    <DaysBox width="100%" height="50px" display={display} row>
      {dayText.map((value, index) => (
        <CheckBox
          key={`day_${index}`}
          width="28px"
          height="28px"
          rounded
          colorName="black"
          index={index + 1}
          checked={checked[index + 1]}
          setChecked={setChecked}
          center>
          {value}
        </CheckBox>
      ))}
    </DaysBox>
  );
};

export default SetItemDays;