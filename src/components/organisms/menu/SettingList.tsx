/* eslint-disable @typescript-eslint/no-unused-expressions */

import React from 'react';
import styled from 'styled-components';
import Box from '../../atoms/box/Box';
import Container from '../../atoms/container/Container';
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

const CustomBox = styled(Box)`
  margin-top: 10px;
`;

const SettingList = ({ data }: ISettingListProps) => {
  return (
    <CustomBox width="100%">
      {data.map((item, index) =>
        item.type === 'info' ? (
          <MenuInfo key={`item_${index}`} title={item.key} value={item.value} />
        ) : (
          <MenuButton
            key={`item_${index}`}
            type={item.type}
            title={item.key}
            handlePress={item.handlePress}
          />
        ),
      )}
    </CustomBox>
  );
};

export default SettingList;
