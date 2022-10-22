import React from 'react';
import styled from 'styled-components/native';
import theme from '../../../../theme/theme';
import Box from '../../../atoms/box/Box';
import ProfileIcon from '../../../atoms/profile/ProfileIcon';
import Text from '../../../atoms/text/Text';
import { IRecCountItem } from '../../../templates/record/TRecordCount';

const ItemBox = styled(Box)`
  justify-content: space-between;
  padding: 10px;
`;

const LeftBox = styled(Box)`
  flex: 1;
`;

const MiddleBox = styled(Box)`
  flex: 3;
  justify-content: center;
  padding-left: 16px;
`;

const MiddleText = styled(Text)`
  padding: 2px 0;
`;

const RightBox = styled(Box)`
  flex: 1.5;
  justify-content: center;
  align-items: flex-end;
`;

const DdateText = styled(Text)`
  margin-top: 4px;
`;

const RecCountItem = ({
  successCount,
  failCount,
  mateDue,
  thumbnail_image_url,
}: IRecCountItem) => {
  return (
    <ItemBox row>
      <LeftBox>
        <ProfileIcon size={52} uri={thumbnail_image_url} />
      </LeftBox>
      <MiddleBox>
        <MiddleText
          size="s"
          colorName={
            theme.color.gray_600
          }>{`성공 횟수: ${successCount}회`}</MiddleText>
        <MiddleText size="s" colorName={theme.color.gray_600}>
          {`실패 횟수: ${failCount}회`}
        </MiddleText>
      </MiddleBox>
      <RightBox>
        <Text size="s" colorName={theme.color.gray_600}>
          메이트 디데이
        </Text>
        <DdateText size="m" options="semiBold">{`D+${mateDue}`}</DdateText>
      </RightBox>
    </ItemBox>
  );
};

export default RecCountItem;
