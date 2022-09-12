import React from 'react';
import styled from 'styled-components/native';
import Container from '../../../atoms/container/Container';
import Text from '../../../atoms/text/Text';

const CustomContainer = styled(Container)`
  margin: 16px 0;
`;

const Title = styled(Text)`
  margin-bottom: 16px;
`;

const Description = () => {
  return (
    <CustomContainer>
      <Title textType="title" options="semiBold">
        요약
      </Title>
      <Text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo,
        doloremque ipsum. Facilis officia consequuntur possimus, corrupti
        numquam id labore sequi aut corporis dolores sed necessitatibus, ullam
        nemo, repellat officiis culpa?
      </Text>
    </CustomContainer>
  );
};

export default Description;
