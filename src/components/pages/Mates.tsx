import React from 'react';
import { SafeAreaView } from 'react-native';
import { useRecoilState } from 'recoil';
import styled from 'styled-components/native';
import MatesNavigation from '../../navigation/top/MatesNavigation';
import centerVisible from '../../recoil/mates/centerVisible';
import CenterScreen from '../../screen/CenterScreen';
import Container from '../atoms/container/Container';
import SearchList from '../molecules/mates/search/SearchList';

const CustomContainer = styled(Container)`
  width: 100%;
  height: 100%;
`;

const Mates = () => {
  const [visible, setVisible] = useRecoilState(centerVisible);

  return (
    <SafeAreaView>
      <CustomContainer options="zero">
        <MatesNavigation />
      </CustomContainer>
      <CenterScreen {...{ visible, setVisible }}>
        <SearchList />
      </CenterScreen>
    </SafeAreaView>
  );
};

export default Mates;
