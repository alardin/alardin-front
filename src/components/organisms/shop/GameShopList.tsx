/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { IGameMetaType } from '../../../recoil/home/alarmSettings';
import Box from '../../atoms/box/Box';
import Container from '../../atoms/container/Container';
import Text from '../../atoms/text/Text';
import GameShopIcon from '../../molecules/shop/game/GameShopIcon';
import themeColor from '../../../theme/theme';
import { fetchGames } from '../../../hooks/useShopData';

interface IGameShopProps {
  data: IGameMetaType[];
}

const Title = styled(Text)`
  margin-bottom: 20px;
`;

const ListBox = styled(Box)`
  padding: 18px;
  flex-wrap: wrap;
  flex-direction: row;
  border: ${({ theme }) => `1px solid ${theme.color.gray_300}`};
  background-color: white;
  min-height: 140px;
`;

const resource = fetchGames();

const GameShopList = () => {
  const { data }: IGameShopProps = resource.gameList.read();
  return (
    <Container>
      <Title options="bold">게임 목록</Title>
      <ListBox row bgColor={themeColor.color.white}>
        {data.map((item, index) => {
          return (
            <View
              key={`icon_${index}`}
              style={{
                width: '25%',
                marginVertical: 8,
              }}>
              <GameShopIcon
                text={item.name}
                icon={item.thumbnail_url}
                id={item.id}
              />
            </View>
          );
        })}
      </ListBox>
    </Container>
  );
};

export default GameShopList;
