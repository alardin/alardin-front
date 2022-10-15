/* eslint-disable react-native/no-inline-styles */

import React, { useState } from 'react';
import {
  Placeholder,
  PlaceholderLine,
  PlaceholderMedia,
  Fade,
} from 'rn-placeholder';
import styled from 'styled-components/native';
import Box from '../../../atoms/box/Box';
import Container from '../../../atoms/container/Container';
import Text from '../../../atoms/text/Text';
import PremiumLabel from '../../../molecules/shop/user/PremiumLabel';

const CustomContainer = styled(Container)`
  flex-direction: row;
  align-items: center;
  padding: 16px 0;
`;

const LeftBox = styled(Box)`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const RightBox = styled(Box)`
  justify-content: center;
  flex: 4;
  padding-left: 12px;
`;

const TextBox = styled(Box)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const GradeBox = styled(Box)`
  flex-direction: row;
  align-items: center;
`;

const UserLoad = () => {
  const [, setVisible] = useState<boolean>(false);
  return (
    <Placeholder Animation={Fade}>
      <CustomContainer>
        <LeftBox>
          <PlaceholderMedia size={60} style={{ borderRadius: 16 }} />
        </LeftBox>
        <RightBox>
          <PlaceholderLine width={20} height={18} noMargin />
          <TextBox>
            <GradeBox>
              <Text size="s">회원등급</Text>
              <PlaceholderLine
                width={26}
                height={22}
                noMargin
                style={{ marginLeft: 8 }}
              />
            </GradeBox>
            <PremiumLabel isPremium={false} setVisible={setVisible} />
          </TextBox>
        </RightBox>
      </CustomContainer>
    </Placeholder>
  );
};

export default UserLoad;
