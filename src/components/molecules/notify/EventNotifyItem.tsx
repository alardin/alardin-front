import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { RootStackParamList } from '../../../navigation/stack/StackNavigation';
import theme from '../../../theme/theme';
import { convertNotifyDate } from '../../../utils/home/convertDateTime';
import Box from '../../atoms/box/Box';
import CheckBox from '../../atoms/checkbox/CheckBox';
import ProfileIcon from '../../atoms/profile/ProfileIcon';
import Text from '../../atoms/text/Text';
import { INotifyDataType } from '../../organisms/notify/NotifyList';

type MateNavigationHook = StackNavigationProp<RootStackParamList, 'Mates'>;

interface IEventNotfiyProps extends INotifyDataType {
  keyNumber: number;
  value: boolean;
  handler: React.Dispatch<React.SetStateAction<boolean[]>>;
}

const NotifyBox = styled(Box)``;

const IconBox = styled(Box)`
  flex: 1.5;
  justify-content: center;
  align-items: center;
`;

const TextBox = styled(Box)`
  flex: 3;
  justify-content: center;
  padding-left: 4px;
`;

const CheckContainer = styled(Box)`
  flex: 1;
  padding-top: 20px;
  align-items: center;
`;

const Content = styled(Text)`
  padding-bottom: 4px;
`;

const EventNotifyItem = ({
  type,
  content,
  date,
  isHidden,
  value,
  keyNumber,
  thumbnail_image_url,
  handler,
}: IEventNotfiyProps) => {
  const navigation = useNavigation<MateNavigationHook>();
  const convertProps =
    type === 'mate'
      ? { uri: thumbnail_image_url }
      : type === 'announce'
      ? { local: require('../../../assets/icons/ic-announce.png') }
      : type === 'event'
      ? { local: require('../../../assets/icons/ic-event.png') }
      : { local: require('../../../assets/icons/ic-info.png') };

  const handlePress = () => {
    if (type === 'mate') {
      navigation.navigate('Mates');
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <NotifyBox width="100%" height="100px" bgColor={theme.color.white} row>
        <IconBox>
          <ProfileIcon size={64} {...convertProps} />
        </IconBox>
        <TextBox>
          <Content size="s" options="semiBold">
            {content}
          </Content>
          <Text size="xs">{convertNotifyDate(date)}</Text>
        </TextBox>
        <CheckContainer>
          <CheckBox
            border
            checked={value}
            setChecked={handler}
            index={keyNumber}
            type="array"
            width="18px"
            height="18px"
            style={{ display: isHidden ? 'none' : 'flex' }}
            rounded
          />
        </CheckContainer>
      </NotifyBox>
    </TouchableOpacity>
  );
};

export default EventNotifyItem;
