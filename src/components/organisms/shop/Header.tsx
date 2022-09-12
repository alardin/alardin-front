import React from 'react';
import styled from 'styled-components/native';
import Container from '../../atoms/container/Container';
import Text from '../../atoms/text/Text';
import PremiumLabel from '../../molecules/shop/user/PremiumLabel';

interface IHeaderProps {
  isPremium: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const CustomContainer = styled(Container)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Header = ({ isPremium, setVisible }: IHeaderProps) => {
  return (
    <CustomContainer>
      <Text textType="title" options="bold">
        상점
      </Text>
      <PremiumLabel isPremium={isPremium} setVisible={setVisible} />
    </CustomContainer>
  );
};

export default Header;
