import React from 'react';
import styled from 'styled-components/native';
import Box from '../../../atoms/box/Box';
import Text from '../../../atoms/text/Text';
import { IRecCountDataType } from '../../../organisms/record/count/RecCountList';

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

const RecCountItem = ({
  thumbnail_image_url,
  nickname,
  success_count,
  fail_count,
  created_at,
}: IRecCountDataType) => {
  return (
    <ItemBox row>
      <LeftBox>
        <Text size="xsmall" colorName="lightGray">
          성공 횟수
        </Text>
        <PaddingText
          size="medium"
          options="bold">{`${success_count}회`}</PaddingText>
        <Text size="xsmall" colorName="lightGray">
          실패 횟수
        </Text>
        <Text size="medium" options="bold">{`${fail_count}회`}</Text>
      </LeftBox>
      <RightBox>
        <Text size="xsmall" colorName="lightGray">
          총 횟수
        </Text>
        <PaddingText size="medium" options="bold">
          {`${success_count + fail_count}회`}
        </PaddingText>
        <Text size="xsmall" colorName="lightGray">
          메이트를 맺은지
        </Text>
        <Text size="medium" options="bold">
          D+24
        </Text>
      </RightBox>
    </ItemBox>
  );
};

export default RecCountItem;
