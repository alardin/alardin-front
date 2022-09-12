import React from 'react';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components/native';
import RecordNavigation from '../../navigation/top/RecordNavigation';
import Container from '../atoms/container/Container';
import Header from '../molecules/record/Header';

const CustomContainer = styled(Container)`
  width: 100%;
  height: 100%;
`;

const Record = () => (
  <SafeAreaView>
    <CustomContainer>
      <Header />
      <RecordNavigation />
    </CustomContainer>
  </SafeAreaView>
);

export default Record;
