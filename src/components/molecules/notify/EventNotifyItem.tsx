import React from 'react';
import styled from 'styled-components/native';
import theme from '../../../theme/theme';
import { convertNotifyDate } from '../../../utils/home/convertDateTime';
import Box from '../../atoms/box/Box';
import CheckBox from '../../atoms/checkbox/CheckBox';
import ProfileIcon from '../../atoms/profile/ProfileIcon';
import Text from '../../atoms/text/Text';
import { INotifyDataType } from '../../organisms/notify/NotifyList';

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
  handler,
}: IEventNotfiyProps) => {
  // const [checked, setChecked] = useState<boolean>(false);
  const convertTypeMessage = (noticeType: string) => {
    let result: string = '';
    switch (noticeType) {
      case 'NOTICE':
        result = '더 다양한 소식으로 돌아오겠습니다!';
        break;
      case 'EVENT':
        result = 'Alardin에서 많은 혜택을 누리세요~';
        break;
    }
    return { result };
  };

  const { result } = convertTypeMessage(type);

  return (
    <NotifyBox width="100%" height="100px" bgColor={theme.color.white} row>
      <IconBox>
        <ProfileIcon
          size={64}
          local={
            type === 'mate'
              ? require('../../../assets/icons/ic-users.svg')
              : type === 'announce'
              ? require('../../../assets/icons/ic-announce.png')
              : type === 'event'
              ? require('../../../assets/icons/ic-event.png')
              : require('../../../assets/icons/ic-info.png')
          }
        />
      </IconBox>
      <TextBox>
        <Content size="s" options="semiBold">
          {content}
        </Content>
        <Content size="s">{result}</Content>
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
  );
};

export default EventNotifyItem;
