import React from 'react';
import { Image } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import Box from '../../../atoms/box/Box';
import Container from '../../../atoms/container/Container';
import Text from '../../../atoms/text/Text';

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

const ScreenShots = () => {
  const exampleData = [
    'http://res.heraldm.com/content/image/2015/02/12/20150212000850_0.jpg',
    'http://res.heraldm.com/content/image/2015/02/12/20150212000850_0.jpg',
    'http://res.heraldm.com/content/image/2015/02/12/20150212000850_0.jpg',
    'http://res.heraldm.com/content/image/2015/02/12/20150212000850_0.jpg',
  ];
  const renderItem = ({ item }) => (
    <ScreenShotBox colorName="white" style={{ marginRight: 24 }}>
      <ScreenShotImage source={{ uri: item }} />
    </ScreenShotBox>
  );
  return (
    <CustomContainer>
      <Title textType="title" options="semiBold">
        스크린샷
      </Title>
      <Box row>
        <FlatList renderItem={renderItem} data={exampleData} horizontal />
      </Box>
    </CustomContainer>
  );
};

export default ScreenShots;
