import React from 'react';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components/native';
import MatesNavigation from '../../navigation/top/MatesNavigation';
import Container from '../atoms/container/Container';

const CustomContainer = styled(Container)`
  width: 100%;
  height: 100%;
`;

const Mates = () => {
  return (
    <SafeAreaView>
      <CustomContainer options="zero">
        <MatesNavigation />
      </CustomContainer>
    </SafeAreaView>
  );
};

export default Mates;
