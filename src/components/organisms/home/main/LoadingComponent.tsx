import React from 'react';
import {
  Placeholder,
  PlaceholderLine,
  Fade,
  PlaceholderMedia,
} from 'rn-placeholder';
import styled from 'styled-components/native';
import Box from '../../../atoms/box/Box';
import theme from '../../../../theme/theme';

const CustomBox = styled(Box)`
  width: 100%;
  height: 140px;
  justify-content: center;
  border: 1px solid #eaeef1;
  padding: 12px;
`;

const LeftBox = styled(Box)`
  flex: 1.2;
  justify-content: center;
`;

const RightBox = styled(Box)`
  flex: 2;
  align-items: flex-end;
`;

const LoadingComponent = ({ type }: { type: 'text' | 'item' }) => {
  return type === 'text' ? (
    <Box>
      <Placeholder Animation={Fade}>
        <PlaceholderLine width={40} height={24} />
        <PlaceholderLine noMargin width={60} height={24} />
      </Placeholder>
    </Box>
  ) : (
    <CustomBox bgColor={theme.color.white}>
      <Placeholder Animation={Fade}>
        <Box row center>
          <LeftBox>
            <PlaceholderLine width={50} height={14} />
            <PlaceholderLine width={80} height={14} />
            <PlaceholderLine width={50} height={14} />
            <PlaceholderLine noMargin width={120} height={16} />
          </LeftBox>
          <RightBox>
            <Box row>
              <PlaceholderLine width={30} height={18} />
              <PlaceholderLine
                width={45}
                height={18}
                style={{ marginLeft: 4 }}
              />
            </Box>
            <Box row>
              <PlaceholderMedia size={64} style={{ borderRadius: 8 }} />
              <PlaceholderMedia
                size={63}
                style={{ borderRadius: 8, marginLeft: 8 }}
              />
            </Box>
          </RightBox>
        </Box>
      </Placeholder>
    </CustomBox>
  );
};

export default LoadingComponent;
