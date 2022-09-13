import React from 'react';
import styled from 'styled-components/native';
import Box from '../../atoms/box/Box';
import Button from '../../atoms/button/Button';
import Text from '../../atoms/text/Text';

const PremiumBox = styled(Box)`
  width: 90%;
  height: 480px;
  border-radius: 8px;
  align-self: center;
  overflow: hidden;
`;

const PremiumImage = styled.Image`
  flex: 3;
`;

const MiddleBox = styled(Box)`
  flex: 2;
  padding: 16px 8px;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const BottomBox = styled(Box)`
  flex: 1;
  padding: 16px 8px;
  justify-content: center;
  align-items: center;
`;

const Title = styled(Text)`
  margin-bottom: 12px;
  text-align: center;
`;

const SubText = styled(Text)`
  margin: 2px 0;
`;

const CommentText = styled(Text)`
  margin: 8px 0;
`;

const PremiumBuy = () => {
  return (
    <PremiumBox colorName="white">
      <PremiumImage
        source={{ uri: 'https://thumbs.dreamstime.com/b/sleep-8047886.jpg' }}
      />
      <MiddleBox>
        <Title textType="subTitle" options="semiBold">
          1달의 학원 비용으로 {'\n'}1년의 아침을 제공합니다
        </Title>
        <SubText>🎮 모든 게임을 잠금 해제</SubText>
        <SubText>👩‍❤️‍👨 메이트 슬롯 추가</SubText>
        <SubText>🖼 앱 광고 배너 추가</SubText>
      </MiddleBox>
      <BottomBox>
        <Button width="95%" height="48px" colorName="skyBlue" center>
          프리미엄 구독
        </Button>
        <CommentText textType="comment">
          ₩5,000/월, 인앱 결제로 진행됩니다
        </CommentText>
      </BottomBox>
    </PremiumBox>
  );
};

export default PremiumBuy;
