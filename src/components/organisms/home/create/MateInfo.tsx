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
  padding-bottom: 12px;
`;

const CustomScrollBox = styled.ScrollView<ScrollViewProps>`
  padding: 4px;
`;

const MarginView = styled.View`
  margin: 0 8px;
`;

const MateInfo = ({ members }: IMateInfoProps) => {
  return (
    <CustomContainer>
      <Title textType="subTitle" options="semiBold">
        메이트 인원
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
