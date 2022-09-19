import React from 'react';
import styled from 'styled-components/native';
import Box from '../../../atoms/box/Box';
import Text from '../../../atoms/text/Text';
import { IRecCountItem } from '../../../templates/record/TRecordCount';

const ItemBox = styled(Box)`
  justify-content: space-between;
  padding: 16px 12px;
`;

const LeftBox = styled(Box)`
  justify-content: center;
`;

const RightBox = styled(Box)`
  align-items: flex-end;
`;

const PaddingText = styled(Text)`
  margin-bottom: 4px;
`;

const RecCountItem = ({ successCount, failCount, mateDue }: IRecCountItem) => {
  return (
    <ItemBox row>
      <LeftBox>
        <Text size="xsmall" colorName="lightGray">
          성공 횟수
        </Text>
        <PaddingText
          size="medium"
          options="bold">{`${successCount}회`}</PaddingText>
        <Text size="xsmall" colorName="lightGray">
          실패 횟수
        </Text>
        <Text size="medium" options="bold">{`${failCount}회`}</Text>
      </LeftBox>
      <RightBox>
        <Text size="xsmall" colorName="lightGray">
          메이트 디데이
        </Text>
        <Text size="medium" options="bold">
          {`D+${mateDue}`}
        </Text>
      </RightBox>
    </ItemBox>
  );
};

export default RecCountItem;
