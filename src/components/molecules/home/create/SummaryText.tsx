import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { ISummaryData } from '../../../../recoil/home/summary';
import { isToday } from '../../../../utils/home/convertDateTime';
import Box from '../../../atoms/box/Box';
import Container from '../../../atoms/container/Container';
import Text from '../../../atoms/text/Text';

const CustomContainer = styled(Container)`
  align-items: flex-end;
`;

const CustomText = styled(Text)`
  margin: 2px 0;
`;

const TextBox = styled(Box)`
  align-items: flex-end;
  margin-bottom: 4px;
`;

const SummaryText = ({
  player,
  is_repeated,
  time,
  Game_id,
  type,
}: ISummaryData) => {
  const [today, setToday] = useState<boolean>(false);
  useEffect(() => {
    if (time) {
      setToday(isToday(time));
    }
  }, [time]);

  return (
    <CustomContainer>
      {type === 'attend' && (
        <TextBox row>
          <CustomText textType="subTitle" options="bold">
            {`${player} 메이트`}
          </CustomText>
          <CustomText>와 함께</CustomText>
        </TextBox>
      )}
      <CustomText textType="subTitle" options="bold">
        {!(is_repeated === '없음' || is_repeated === '0')
          ? `매주 ${is_repeated}`
          : today
          ? '오늘'
          : '내일'}
      </CustomText>
      <CustomText textType="title" options="bold">
        {time}
      </CustomText>
      <TextBox row>
        <CustomText textType="subTitle" options="bold">
          {`"${Game_id}"`}
        </CustomText>
        <CustomText>으로</CustomText>
      </TextBox>
      <CustomText>깨워드립니다!</CustomText>
    </CustomContainer>
  );
};

export default SummaryText;
