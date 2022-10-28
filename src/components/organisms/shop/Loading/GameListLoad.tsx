/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import styled from 'styled-components/native';
import Box from '../../../atoms/box/Box';
import Container from '../../../atoms/container/Container';
import Text from '../../../atoms/text/Text';
import themeColor from '../../../../theme/theme';
import {
  Placeholder,
  PlaceholderLine,
  PlaceholderMedia,
  Fade,
} from 'rn-placeholder';

const Title = styled(Text)`
  margin-bottom: 20px;
`;

const ListBox = styled(Box)`
  padding: 12px;
  flex-wrap: wrap;
  flex-direction: row;
  border: ${({ theme }) => `1px solid ${theme.color.gray_300}`};
  background-color: white;
  min-height: 140px;
`;

const ItemBox = styled(Box)`
  margin: 4px 0;
`;

const GameListLoad = () => {
  return (
    <Container>
      <Title options="bold">게임 목록</Title>
      <Placeholder Animation={Fade}>
        <ListBox row bgColor={themeColor.color.white}>
          {Array.from({ length: 8 }).map(() => {
            return (
              <ItemBox width="25%" center>
                <PlaceholderMedia
                  size={50}
                  style={{ marginBottom: 8, alignSelf: 'center' }}
                />
                <PlaceholderLine width={70} noMargin />
              </ItemBox>
            );
          })}
        </ListBox>
      </Placeholder>
    </Container>
  );
};

export default GameListLoad;
