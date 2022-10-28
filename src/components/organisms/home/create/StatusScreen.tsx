import React from 'react';
import styled from 'styled-components/native';
import Box from '../../../atoms/box/Box';
import Container from '../../../atoms/container/Container';
import Text from '../../../atoms/text/Text';
import theme from '../../../../theme/theme';

import EarthIcon from '../../../../assets/icons/ic-earth.svg';

const CustomContainer = styled(Container)`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const CustomText = styled(Text)`
  margin-top: 20px;
`;

const CustomSubText = styled(Text)`
  margin: 8px 0;
`;

const StatusScreen = ({ type }: { type: 'loading' | 'error' }) => {
  return (
    <CustomContainer options="zero">
      <Box center>
        <EarthIcon
          width={60}
          height={60}
          fill={
            type === 'loading'
              ? theme.color.primary_600
              : theme.color.function_error
          }
        />
        <CustomText
          size="m"
          options="semiBold"
          colorName={
            type === 'loading' ? theme.color.primary_400 : theme.color.tag_red
          }>
          {type === 'loading'
            ? `필요한 정보를 불러오고 있습니다`
            : `알람방 생성에 문제가 생겼습니다`}
        </CustomText>
        <CustomSubText size="s" colorName={theme.color.gray_500}>
          {type === 'loading'
            ? `Alardin을 이용해주셔서 감사합니다!`
            : `앱 백그라운드를 종료 후 다시 이용해보세요`}
        </CustomSubText>
      </Box>
    </CustomContainer>
  );
};

export default StatusScreen;
