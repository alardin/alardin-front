import React from 'react';
import { ScrollViewProps } from 'react-native';
import styled from 'styled-components/native';
import Button from '../../../atoms/button/Button';
import Container from '../../../atoms/container/Container';
import Text from '../../../atoms/text/Text';
import MateInvite from '../../../molecules/home/create/MateInvite';
import MateMember, {
  IMateMemberData,
} from '../../../molecules/home/create/MateMember';

interface IMateInfoProps {
  members: IMateMemberData[];
  setMembers?: React.Dispatch<React.SetStateAction<IMateMemberData[]>>;
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

const ConfirmButton = styled(Button)`
  margin-top: 40px;
  margin-bottom: 40px;
`;

const MarginView = styled.View`
  margin: 0 8px;
`;

const MateInfo = ({ members, setMembers }: IMateInfoProps) => {
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
        <MateInvite {...{ setMembers }} />
      </CustomScrollBox>
      <ConfirmButton width="100%" height="48px" colorName="black" center>
        알람 등록
      </ConfirmButton>
    </CustomContainer>
  );
};

export default MateInfo;
