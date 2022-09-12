/* eslint-disable react-native/no-inline-styles */

import React, { useState } from 'react';
import { FlatList, ListRenderItem, SafeAreaView, View } from 'react-native';
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
  padding-top: 24px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  min-height: 280px;
`;

const AdBox = styled(Box)`
  height: 80px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
`;

const GameShopList = ({ data }: IGameShopProps) => {
  const numColums = 4;
  const [containerWidth, setContainerWidth] = useState<number>(0);

  const renderItem: ListRenderItem<any> = ({ item }) => (
    <View
      style={{
        width: (containerWidth - 8) / numColums,
        paddingHorizontal: 4,
        marginBottom: 24,
      }}>
      <GameShopIcon text={item.name} icon={item.thumbnail_url} id={item.id} />
    </View>
  );

  return (
    <Container>
      <Title textType="subTitle" options="bold">
        게임 목록
      </Title>
      <ListBox row colorName="white">
        <FlatList
          scrollEnabled={false}
          data={data}
          renderItem={renderItem}
          onLayout={e => setContainerWidth(e.nativeEvent.layout.width)}
          keyExtractor={(_, index) => index}
          numColumns={numColums}
        />
      </ListBox>
      <AdBox colorName="green"></AdBox>
    </Container>
  );
};

export default GameShopList;
