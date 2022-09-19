import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components/native';
import bottomVisible from '../../../recoil/bottomVisible';
import { IMembersDataType } from '../../../recoil/home/members';
import bottomMateInfo from '../../../recoil/mates/bottomMateInfo';
import Box from '../../atoms/box/Box';
import Button from '../../atoms/button/Button';
import ProfileIcon from '../../atoms/profile/ProfileIcon';
import Text from '../../atoms/text/Text';

const InfoBox = styled(Box)`
  padding: 4px 16px;
`;

const LeftBox = styled(Box)`
  flex: 3;
`;

const RightBox = styled(Box)`
  flex: 1;
  align-items: flex-end;
`;

const TextBox = styled(Box)`
  padding-left: 16px;
  justify-content: center;
`;

const FriendInfo = ({
  id,
  kakao_id,
  thumbnail_image_url,
  nickname,
}: IMembersDataType) => {
  const idValue = id ? `#${id}` : '카카오톡 친구';
  const setVisible = useSetRecoilState(bottomVisible);
  const setMateInfo = useSetRecoilState(bottomMateInfo);

  const handlePress = () => {
    const type = id ? 'remove' : 'add';
    setVisible(true);
    setMateInfo({
      id,
      kakao_id,
      thumbnail_image_url,
      nickname,
      type,
    });
  };

  return (
    <InfoBox width="100%" height="88px" colorName="white" row center>
      <LeftBox row>
        <ProfileIcon size={56} uri={thumbnail_image_url} />
        <TextBox>
          <Text options="semiBold">{idValue}</Text>
          <Text textType="subTitle" options="bold">
            {nickname}
          </Text>
        </TextBox>
      </LeftBox>
      <RightBox>
        <Button
          width="48px"
          height="48px"
          colorName={id ? 'red' : 'green'}
          center
          onPress={handlePress}>
          {id ? (
            <Icon name="person-add-disabled" color="white" size={24} />
          ) : (
            <Icon name="person-add" color="white" size={24} />
          )}
        </Button>
      </RightBox>
    </InfoBox>
  );
};

export default FriendInfo;
