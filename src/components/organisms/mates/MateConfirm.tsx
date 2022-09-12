import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components/native';
import { myProfile } from '../../../recoil/authorization';
import bottomVisible from '../../../recoil/bottomVisible';
import bottomMateInfo from '../../../recoil/mates/bottomMateInfo';
import alardinApi from '../../../utils/alardinApi';
import Box from '../../atoms/box/Box';
import Button from '../../atoms/button/Button';
import ProfileIcon from '../../atoms/profile/ProfileIcon';
import Text from '../../atoms/text/Text';

interface IMateConfirmProps {
  setRefreshData: React.Dispatch<React.SetStateAction<boolean>>;
}

const CustomBox = styled(Box)`
  justify-content: space-evenly;
  align-items: center;
`;

const CustomButton = styled(Button)`
  margin: 0 4px;
`;

const TextBox = styled(Box)`
  align-items: center;
`;

const MateConfirm = ({ setRefreshData }: IMateConfirmProps) => {
  const me = useRecoilValue(myProfile);
  const setVisible = useSetRecoilState(bottomVisible);
  const { type, id, nickname, thumbnail_image_url, kakao_id } =
    useRecoilValue(bottomMateInfo);

  const handleCancel = () => {
    setVisible(false);
  };
  const handleConfirm = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    type === 'remove'
      ? alardinApi
          .delete('/mate', { data: { id: me.id, mateId: id } })
          .then(() => {
            setRefreshData(prev => !prev);
            setVisible(false);
          })
      : alardinApi
          .post(`mate?targetUserId=${kakao_id}`, {
            id: me.id,
            mateId: kakao_id,
          })
          .then(() => {
            setRefreshData(prev => !prev);
            setVisible(false);
          });
  };

  return (
    <CustomBox height="100%">
      <ProfileIcon size={82} uri={thumbnail_image_url} />
      <TextBox>
        <Text textType="subTitle" options="semiBold">
          {type === 'remove'
            ? `${nickname}을 알라미 메이트에서`
            : `${nickname}님을 알라미 메이트로`}
        </Text>
        <Text textType="subTitle" options="semiBold">
          {type === 'remove' ? '제거하시겠습니까?' : '등록하시겠습니까?'}
        </Text>
      </TextBox>
      <Box row>
        <CustomButton
          width="45%"
          height="46px"
          colorName="red"
          center
          onPress={handleCancel}>
          거절
        </CustomButton>
        <CustomButton
          width="45%"
          height="46px"
          colorName="green"
          center
          onPress={handleConfirm}>
          수락
        </CustomButton>
      </Box>
    </CustomBox>
  );
};

export default MateConfirm;
