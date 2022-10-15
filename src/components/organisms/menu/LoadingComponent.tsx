import React from 'react';
import {
  Placeholder,
  PlaceholderLine,
  Fade,
  PlaceholderMedia,
} from 'rn-placeholder';
import styled from 'styled-components/native';
import Box from '../../atoms/box/Box';

const CustomBox = styled(Box)`
  width: 100%;
  height: 120px;
  justify-content: center;
  align-items: center;
`;

const LeftBox = styled(Box)`
  flex: 1.5;
  justify-content: center;
  align-items: center;
`;

const RightBox = styled(Box)`
  flex: 4;
  padding-top: 2px;
`;

const LoadingComponent = () => {
  return (
    <CustomBox>
      <Placeholder Animation={Fade}>
        <Box row>
          <LeftBox>
            <PlaceholderMedia size={64} />
          </LeftBox>
          <RightBox>
            <PlaceholderLine width={30} />
            <PlaceholderLine width={30} />
            <PlaceholderLine noMargin width={80} />
          </RightBox>
        </Box>
      </Placeholder>
    </CustomBox>
  );
};

export default LoadingComponent;
