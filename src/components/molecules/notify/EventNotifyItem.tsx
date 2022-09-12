import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';
import theme from '../../../theme/theme';
import Box from '../../atoms/box/Box';
import Label from '../../atoms/label/Label';
import Text from '../../atoms/text/Text';
import { INotifyDataType } from '../../organisms/notify/NotifyList';

const NotifyBox = styled(Box)`
  justify-content: space-between;
  align-items: center;
`;

const IconBox = styled(Box)`
  flex: 1.5;
  height: 100%;
`;

const TextBox = styled(Box)`
  flex: 4;
  height: 100%;
  justify-content: center;
  padding-left: 4px;
`;

const Content = styled(Text)`
  padding-bottom: 4px;
`;

const CountBox = styled(Box)`
  flex: 1;
  height: 100%;
  margin-top: 16px;
  align-items: center;
`;

const EventNotifyItem = ({ type, content, date }: INotifyDataType) => {
  return (
    <NotifyBox width="100%" height="56px" row>
      <IconBox center>
        <Label width={48} height={48} colorName="white" rounded shadow>
          <Icon
            size={24}
            color={theme.color.black}
            name={
              type === 'announce'
                ? 'megaphone-outline'
                : type === 'event'
                ? 'newspaper-outline'
                : 'rocket-outline'
            }
          />
        </Label>
      </IconBox>
      <TextBox>
        <Content textType="comment" options="semiBold">
          {content}
        </Content>
        <Text textType="comment">{date}</Text>
      </TextBox>
      <CountBox>
        <Label width={28} height={28} colorName="red">
          3
        </Label>
      </CountBox>
    </NotifyBox>
  );
};

export default EventNotifyItem;
