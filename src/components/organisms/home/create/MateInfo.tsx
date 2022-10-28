import React from 'react';
import { ScrollViewProps } from 'react-native';
import styled from 'styled-components/native';
import { IMembersDataType } from '../../../../recoil/home/members';
import Container from '../../../atoms/container/Container';
import Text from '../../../atoms/text/Text';
import MateMember from '../../../molecules/home/create/MateMember';

interface IMateInfoProps {
  members: IMembersDataType[];
  setMembers?: React.Dispatch<React.SetStateAction<IMembersDataType[]>>;
}

const CustomContainer = styled(Container)`
  margin: 20px 0;
`;

const Title = styled(Text)`
  padding-bottom: 20px;
`;

const CustomScrollBox = styled.ScrollView<ScrollViewProps>``;

const MarginView = styled.View`
  margin-right: 8px;
`;

const MateInfo = ({ members }: IMateInfoProps) => {
  return (
    <CustomContainer>
      <Title size="l" options="semiBold">
        같이 참여하는 메이트
      </Title>
      <CustomScrollBox horizontal showsHorizontalScrollIndicator={false}>
        {members.map((member, index) => (
          <MarginView key={`member_${index}`}>
            <MateMember {...member} />
          </MarginView>
        ))}
      </CustomScrollBox>
    </CustomContainer>
  );
};

export default MateInfo;
