import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { ISummaryData } from '../../../../recoil/home/summary';
import { isToday } from '../../../../utils/home/convertDateTime';
import Box from '../../../atoms/box/Box';
import Container from '../../../atoms/container/Container';
import Text from '../../../atoms/text/Text';
import themeColor from '../../../../theme/theme';

const CustomContainer = styled(Container)``;

const CustomText = styled(Text)`
  margin: 2px 0;
`;

const TextBox = styled(Box)`
  align-items: flex-end;
`;

const PrivateBox = styled(Box)`
  margin-top: 28px;
  margin-bottom: 18px;
  padding: 6px 10px;
`;

const SummaryText = ({
  is_private,
  is_repeated,
  time,
  Game_id,
  name,
}: ISummaryData) => {
  const [today, setToday] = useState<boolean>(false);
  useEffect(() => {
    if (time) {
      setToday(isToday(time));
    }
  }, [time]);

  return (
    <CustomContainer>
      <CustomText size="xl" options="semiBold">
        {name}
      </CustomText>
      <PrivateBox
        width="60px"
        radius={24}
        bgColor={themeColor.color.primary_50}
        center>
        <Text colorName={themeColor.color.primary_600} options="semiBold">
          {is_private ? '비공개' : '공개'}
        </Text>
      </PrivateBox>
      <CustomText size="xl">
        {!(is_repeated === '없음' || is_repeated === '0')
          ? `매주 ${is_repeated}`
          : today
          ? '오늘'
          : '내일'}
      </CustomText>
      <CustomText size="xl">{time}</CustomText>
      <TextBox row>
        <CustomText size="xl">{Game_id}</CustomText>
        <CustomText size="xl">로 깨워드려요!</CustomText>
      </TextBox>
    </CustomContainer>
  );
};

export default SummaryText;
