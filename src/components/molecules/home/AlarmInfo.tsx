import React from 'react';
import styled from 'styled-components/native';
import Box from '../../atoms/box/Box';
import Container from '../../atoms/container/Container';
import ProfileIcon from '../../atoms/profile/ProfileIcon';
import Text from '../../atoms/text/Text';
import Label from '../../atoms/label/Label';
import Button from '../../atoms/button/Button';
import { useNavigation } from '@react-navigation/native';

export interface IAlarmInfoData {
  id: number;
  time: string;
  is_repeated: string;
  is_private: boolean;
  music_volume: number;
  max_members: number;
  game: string;
  host_id: number;
  members: object[];
  date: Date;
}

interface IAlarmInfoProps extends IAlarmInfoData {
  margin?: string;
}

const InfoBox = styled(Box)`
  padding: 4px 8px;
`;

const LeftContainer = styled(Container)`
  flex: 3;
`;

const RightContainer = styled(Container)`
  flex: 1;
  justify-content: center;
  align-items: flex-end;
`;

const TextBox = styled(Box)`
  padding-bottom: 4px;
  align-items: flex-end;
`;

const ClockText = styled(Text)`
  padding-right: 3px;
  padding-bottom: 5px;
`;

const AlarmInfo = (props: IAlarmInfoProps) => {
  const { is_private, is_repeated, members, game, time } = props;

  const [amPm, timeNum] = time.split(' ');

  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate('AlarmAttend', { ...props, type: 'attend' });
  };

  return (
    <Button {...props} width="100%" height="88px" onPress={handlePress}>
      <InfoBox width="100%" height="100%" colorName="white" row>
        <LeftContainer>
          <TextBox row>
            <ClockText>{amPm}</ClockText>
            <Text textType="title" options="semiBold">
              {timeNum}
            </Text>
          </TextBox>
          <Box row>
            <Label marginHorizontal colorName="red">
              {is_private ? '비공개' : '공개'}
            </Label>
            {is_repeated !== '없음' && (
              <Label marginHorizontal colorName="darkGray">
                반복
              </Label>
            )}
            <Label colorName="skyBlue">{game}</Label>
          </Box>
        </LeftContainer>
        <RightContainer>
          {members.map((image, index) => (
            <ProfileIcon
              key={`player_${index}`}
              position="absolute"
              arrow={{ right: index === 0 ? 0 : index + 15 }}
              zIndex={members.length - index}
            />
          ))}
        </RightContainer>
      </InfoBox>
    </Button>
  );
};

export default AlarmInfo;
