import React from 'react';
import styled from 'styled-components/native';
import Box from '../../../atoms/box/Box';
import Button from '../../../atoms/button/Button';
import Text from '../../../atoms/text/Text';

interface IPremiumLabelProps {
  isPremium: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const LabelBox = styled(Box)`
  padding: 4px 12px;
`;

const PremiumIcon = styled.Image`
  width: 20px;
  height: 20px;
  margin-right: 8px;
`;

const LabelText = styled(Text)``;

const PremiumLabel = ({ isPremium, setVisible }: IPremiumLabelProps) => {
  const text = isPremium ? '프리미엄 이용중' : '프리미엄 유저 전환';
  const handlePress = () => {
    if (isPremium === false) {
      setVisible(true);
    }
  };

  return (
    <Button onPress={handlePress}>
      <LabelBox row center colorName={isPremium ? 'skyBlue' : 'white'}>
        <PremiumIcon source={require('../../../../assets/images/crown.png')} />
        <LabelText
          textType="comment"
          options="semiBold"
          colorName={isPremium ? 'white' : 'black'}>
          {text}
        </LabelText>
      </LabelBox>
    </Button>
  );
};

export default PremiumLabel;
