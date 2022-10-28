import React from 'react';
import styled from 'styled-components/native';
import Box from '../../../atoms/box/Box';
import Text from '../../../atoms/text/Text';
import theme from '../../../../theme/theme';

interface IRecCountTitleProps {
  name: string;
  playCount: number;
}

const TitleBox = styled(Box)`
  justify-content: space-between;
  align-items: center;
  padding: 14px;
`;

const LeftBox = styled(Box)``;

const RightBox = styled(Box)``;

const RecCountTitle = ({ name, playCount }: IRecCountTitleProps) => {
  return (
    <TitleBox row>
      <LeftBox row center>
        <Text>{name}</Text>
      </LeftBox>
      <RightBox center>
        <Text
          size="s"
          colorName={
            theme.color.primary_600
          }>{`총 ${playCount}회 같이 참여`}</Text>
      </RightBox>
    </TitleBox>
  );
};

export default RecCountTitle;
