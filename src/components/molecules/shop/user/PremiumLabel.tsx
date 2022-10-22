import React from 'react';
import Button from '../../../atoms/button/Button';

interface IPremiumLabelProps {
  isPremium: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const PremiumLabel = ({ isPremium, setVisible }: IPremiumLabelProps) => {
  const text = isPremium ? '프리미엄 이용중' : '프리미엄 전환';
  const handlePress = () => {
    setVisible(true);
  };

  return (
    <Button
      height="xs"
      fontSize={12}
      options="primary"
      center
      disabled={isPremium ? true : false}
      onPress={handlePress}>
      {text}
    </Button>
  );
};

export default PremiumLabel;
