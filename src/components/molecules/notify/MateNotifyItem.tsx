import React from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components/native';
import bottomVisible from '../../../recoil/bottomVisible';
import Box from '../../atoms/box/Box';
import Button from '../../atoms/button/Button';
import Label from '../../atoms/label/Label';
import ProfileIcon from '../../atoms/profile/ProfileIcon';
import Text from '../../atoms/text/Text';
import { INotifyDataType } from '../../organisms/notify/NotifyList';

const NotifyBox = styled(Box)`
  justify-content: space-between;
  align-items: center;
`;

const ProfileBox = styled(Box)`
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

const MateNotifyItem = ({ content, date }: INotifyDataType) => {
  const setVisible = useSetRecoilState(bottomVisible);
  const handlePress = () => {
    setVisible(true);
  };

  return (
    <Button onPress={handlePress}>
      <NotifyBox width="100%" height="64px" row>
        <ProfileBox center>
          <ProfileIcon size={48} />
        </ProfileBox>
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
    </Button>
  );
};

export default MateNotifyItem;
