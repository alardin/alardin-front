/* eslint-disable @typescript-eslint/no-unused-expressions */

import React from 'react';
import styled from 'styled-components/native';
import Box from '../../atoms/box/Box';
import Container from '../../atoms/container/Container';
import Text from '../../atoms/text/Text';
import MenuButton from '../../molecules/menu/MenuButton';
import MenuInfo from '../../molecules/menu/MenuInfo';

interface ISettingListProps {
  title: string;
  data: {
    type: string;
    key: string;
    value?: string;
    handlePress?: () => void;
  }[];
}

const SettingTitle = styled(Text)`
  margin: 12px 0;
`;

const SettingList = ({ title, data }: ISettingListProps) => {
  return (
    <Container>
      <SettingTitle textType="subTitle" options="semiBold">
        {title}
      </SettingTitle>
      <Box width="100%">
        {data.map((item, index) =>
          item.type === 'info' ? (
            <MenuInfo
              key={`item_${index}`}
              title={item.key}
              value={item.value}
            />
          ) : (
            <MenuButton
              key={`item_${index}`}
              type={item.type}
              title={item.key}
              handlePress={item.handlePress}
            />
          ),
        )}
      </Box>
    </Container>
  );
};

export default SettingList;
