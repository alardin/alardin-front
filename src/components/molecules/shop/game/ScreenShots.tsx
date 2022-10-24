import React from 'react';
import { ListRenderItem } from 'react-native';
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
  width: 240px;
  height: 420px;
`;

const ScreenShotImage = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 12px;
`;

const Title = styled(Text)`
  margin-bottom: 16px;
`;

const ScreenShots = ({ images }: IScreenShotsProps) => {
  const renderItem: ListRenderItem<string> = ({ item }) => (
    <ScreenShotBox bgColor="#fffff" style={{ marginRight: 24 }}>
      <ScreenShotImage source={{ uri: item }} />
    </ScreenShotBox>
  );
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
