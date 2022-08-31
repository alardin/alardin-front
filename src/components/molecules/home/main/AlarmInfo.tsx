import React from 'react';
import styled from 'styled-components/native';
import Box from '../../../atoms/box/Box';
import Container from '../../../atoms/container/Container';
import ProfileIcon from '../../../atoms/profile/ProfileIcon';
import Text from '../../../atoms/text/Text';
import Label from '../../../atoms/label/Label';
import Button from '../../../atoms/button/Button';
import { useNavigation } from '@react-navigation/native';
import { IAlarmInfoData } from '../../../../recoil/home/alarmList';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../navigation/stack/StackNavigation';

type IAlarmAttendNavigation = StackNavigationProp<
  RootStackParamList,
  'AlarmAttend'
>;

export interface IAlarmInfoProps extends IAlarmInfoData {
  margin?: string;
}

const InfoBox = styled(Box)`
  padding: 0 8px;
`;

const LeftContainer = styled(Container)`
  flex: 3;
  justify-content: center;
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
  const { is_private, is_repeated, Members, Game, time } = props;

  const splitedTime = time?.split(' ');

  const navigation = useNavigation<IAlarmAttendNavigation>();
  const handlePress = () => {
    navigation.navigate('AlarmAttend', { ...props, type: 'attend' });
  };

  return (
    <Button {...props} width="100%" height="88px" onPress={handlePress}>
      <InfoBox width="100%" height="100%" colorName="white" row>
        <LeftContainer>
          <TextBox row>
            <ClockText>{splitedTime ? splitedTime[0] : ''}</ClockText>
            <Text textType="title" options="semiBold">
              {splitedTime ? splitedTime[1] : ''}
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
            <Label colorName="skyBlue">{Game.name}</Label>
          </Box>
        </LeftContainer>
        <RightContainer>
          {Members.map(({ thumbnail_image_url }, index) => (
            <ProfileIcon
              size={56}
              key={`player_${index}`}
              position="absolute"
              arrow={{ right: index === 0 ? 0 : index + 15 }}
              zIndex={Members.length - index}
              uri={thumbnail_image_url}
            />
          ))}
        </RightContainer>
      </InfoBox>
    </Button>
  );
};

export default AlarmInfo;
