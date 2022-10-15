import React from 'react';
import styled from 'styled-components/native';
import Container from '../../../atoms/container/Container';
import Text from '../../../atoms/text/Text';

interface IDescriptionProps {
  descript: string;
}

const CustomContainer = styled(Container)`
  margin: 16px 0;
`;

const Title = styled(Text)`
  margin-bottom: 16px;
`;

const Description = ({ descript }: IDescriptionProps) => {
  return (
    <CustomContainer>
      <Title size="l" options="semiBold">
        요약
      </Title>
      <Text>{descript}</Text>
    </CustomContainer>
  );
};

export default Description;
