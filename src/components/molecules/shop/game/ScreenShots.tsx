import React from 'react';
import { Image, ListRenderItem } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import Box from '../../../atoms/box/Box';
import Container from '../../../atoms/container/Container';
import Text from '../../../atoms/text/Text';

interface IScreenShotsProps {
  images: string[];
}

const CustomContainer = styled(Container)`
  margin: 16px 0;
`;

const ScreenShotBox = styled(Box)`
  width: 260px;
  height: 480px;
  margin-right: 20px;
`;

const ScreenShotImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 8px;
`;

const Title = styled(Text)`
  margin-bottom: 16px;
`;

const ScreenShots = ({ images }: IScreenShotsProps) => {
  const renderItem: ListRenderItem<string> = ({ item }) => {
    return (
      <ScreenShotBox>
        <ScreenShotImage source={{ uri: item }} resizeMode="stretch" />
      </ScreenShotBox>
    );
  };
  return (
    <CustomContainer>
      <Title size="l" options="semiBold">
        스크린샷
      </Title>
      <Box row>
        <FlatList renderItem={renderItem} data={images} horizontal />
      </Box>
    </CustomContainer>
  );
};

export default ScreenShots;
