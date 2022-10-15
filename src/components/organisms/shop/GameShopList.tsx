/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { IGameMetaType } from '../../../recoil/home/alarmSettings';
import Box from '../../atoms/box/Box';
import Text from '../../atoms/text/Text';
import GameShopIcon from '../../molecules/shop/game/GameShopIcon';
import themeColor from '../../../theme/theme';

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

const GameShopList = ({ data }: IGameShopProps) => {
  return (
    <>
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
    </>
  );
};

export default GameShopList;
