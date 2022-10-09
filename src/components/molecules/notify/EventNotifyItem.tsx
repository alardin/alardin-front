import React, { useState } from 'react';
import styled from 'styled-components/native';
import theme from '../../../theme/theme';
import { convertNotifyDate } from '../../../utils/home/convertDateTime';
import Box from '../../atoms/box/Box';
import CheckBox from '../../atoms/checkbox/CheckBox';
import Text from '../../atoms/text/Text';
import { INotifyDataType } from '../../organisms/notify/NotifyList';

const NotifyBox = styled(Box)``;

const IconBox = styled(Box)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const TextBox = styled(Box)`
  flex: 3;
  justify-content: center;
  padding-left: 4px;
`;

const Content = styled(Text)`
  padding-bottom: 4px;
`;

const EventNotifyItem = ({ type, content, date }: INotifyDataType) => {
  const [checked, setChecked] = useState<boolean>(false);
  const convertTypeMessage = (noticeType: string) => {
    let result = '';
    switch (noticeType) {
      case 'NOTICE':
        result = '더 다양한 소식으로 돌아오겠습니다!';
        break;
      case 'EVENT':
        result = 'Alardin에서 많은 혜택을 누리세요~';
        break;
    }
    return result;
  };
  return (
    <NotifyBox width="100%" height="100px" bgColor={theme.color.white} row>
      <IconBox>
        <Box width="52px" height="52px" bgColor={theme.color.gray_300}></Box>
      </IconBox>
      <TextBox>
        <Content size="s" options="semiBold">
          {content}
        </Content>
        <Content size="s">{convertTypeMessage(type)}</Content>
        <Text size="xs">{convertNotifyDate(date)}</Text>
      </TextBox>
      <CheckBox
        checked={checked}
        setChecked={setChecked}
        type="boolean"
        width="14px"
        height="14px"
        rounded
      />
    </NotifyBox>
  );
};

export default EventNotifyItem;
