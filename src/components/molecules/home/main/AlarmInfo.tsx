import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import Box from '../../../atoms/box/Box';
import Container from '../../../atoms/container/Container';
import ProfileIcon from '../../../atoms/profile/ProfileIcon';
import Text from '../../../atoms/text/Text';
import Label from '../../../atoms/label/Label';
import { useNavigation } from '@react-navigation/native';
import { IAlarmInfoData } from '../../../../recoil/home/alarmList';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../navigation/stack/StackNavigation';
import { TouchableOpacity } from 'react-native';
import themeColor from '../../../../theme/theme';
import { isToday } from '../../../../utils/home/convertDateTime';

type IAlarmAttendNavigation = StackNavigationProp<
  RootStackParamList,
  'AlarmAttend'
>;

export interface IAlarmInfoProps extends IAlarmInfoData {
  margin?: string;
}

const InfoBox = styled(Box)`
  padding: 16px;
  border: ${({ theme }) => `1px solid ${theme.color.gray_300}`};
`;

const LeftContainer = styled(Container)`
  flex: 1.2;
  justify-content: space-around;
`;

const RoomInfoBox = styled(Box)`
  align-items: center;
`;

const ClockText = styled(Text)`
  margin: 4px 0;
`;

const RightContainer = styled(Container)`
  flex: 2;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
`;

const TextLine = styled(Box)`
  width: 1px;
  height: 90%;
  background-color: black;
  margin: 0 4px;
  align-self: center;
`;

const ProfileImageBox = styled(Box)`
  flex-direction: row;
`;

const AlarmInfo = (props: IAlarmInfoProps) => {
  const {
    is_private,
    Host,
    Members,
    Game,
    time,
    name,
    max_member,
    is_repeated,
  } = props;
  const [today, setToday] = useState<boolean>(false);

  const splitedTime = time?.split(' ');

  const navigation = useNavigation<IAlarmAttendNavigation>();
  const handlePress = () => {
    navigation.navigate('AlarmAttend', { ...props, type: 'attend' });
  };

  useEffect(() => {
    if (time) {
      setToday(isToday(time));
    }
  }, [time]);

  return (
    <TouchableOpacity onPress={handlePress}>
      <InfoBox width="100%" height="140px" bgColor={themeColor.color.white} row>
        <LeftContainer options="zero">
          <Text size="s">{String(name)}</Text>
          <ClockText options="semiBold">
            {splitedTime ? `${splitedTime[0]} ${splitedTime[1]}` : ''}
          </ClockText>
          <Text size="s">
            {!(is_repeated === '없음' || is_repeated === '0')
              ? `매주 ${is_repeated}`
              : today
              ? '오늘'
              : '내일'}
          </Text>
          <RoomInfoBox row>
            <Text size="s">{Host ? Host.nickname : '미확인'}</Text>
            <TextLine />
            <Text size="s">{`맴버 ${Members.length}/${String(
              max_member,
            )}`}</Text>
          </RoomInfoBox>
        </LeftContainer>
        <RightContainer options="zero">
          <Box row>
            <Label
              bgColor={
                is_private
                  ? themeColor.color.tag_red
                  : themeColor.color.primary_50
              }
              textColor={
                is_private
                  ? themeColor.color.function_warning
                  : themeColor.color.primary_600
              }
              marginRight>
              {is_private ? '비공개' : '공개'}
            </Label>
            <Label
              bgColor={themeColor.color.tag_blue}
              textColor={themeColor.color.white}
              marginRight>
              {Game.name}
            </Label>
          </Box>
          <ProfileImageBox>
            {Members.map(({ thumbnail_image_url }, index) => {
              if (index > 3) {
                return;
              }
              return (
                <ProfileIcon
                  size={54 - Members.length * 2}
                  key={`player_${index}`}
                  uri={thumbnail_image_url}
                  isMargin
                />
              );
            })}
          </ProfileImageBox>
        </RightContainer>
      </InfoBox>
    </TouchableOpacity>
  );
};

export default AlarmInfo;
