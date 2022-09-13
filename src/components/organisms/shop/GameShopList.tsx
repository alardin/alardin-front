/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { IGameMetaType } from '../../../recoil/home/alarmSettings';
import Box from '../../atoms/box/Box';
import Container from '../../atoms/container/Container';
import Text from '../../atoms/text/Text';
import GameShopIcon from '../../molecules/shop/game/GameShopIcon';

interface IGameShopProps {
  data: IGameMetaType[];
}

const Title = styled(Text)`
  margin-bottom: 12px;
`;

const ListBox = styled(Box)`
  padding: 24px 8px;
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
`;

const AdBox = styled(Box)`
  height: 80px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
`;

const GameShopList = ({ data }: IGameShopProps) => {
  return (
    <Container>
      <Title textType="subTitle" options="bold">
        게임 목록
      </Title>
      <ListBox row colorName="white">
        {data.map((item, index) => {
          return (
            <View
              key={`icon_${index}`}
              style={{
                width: '25%',
                paddingHorizontal: 4,
                marginBottom: 24,
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
      <AdBox colorName="green"></AdBox>
    </Container>
  );
};

export default GameShopList;
