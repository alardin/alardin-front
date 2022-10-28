/* eslint-disable @typescript-eslint/no-unused-expressions */

import React from 'react';
import styled from 'styled-components';
import Box from '../../atoms/box/Box';
import MenuSwitch from '../../molecules/menu/MenuSwitch';

interface ISwitchListProps {
  title: string;
  data: {
    title: string;
    value: boolean;
    handler?: (args: any) => void;
  }[];
}

const CustomBox = styled(Box)`
  margin-top: 10px;
`;

const SwitchList = ({ data }: ISwitchListProps) => {
  return (
    <CustomBox width="100%">
      {data.map((item, index) => (
        <MenuSwitch
          key={`item_${index}`}
          title={item.title}
          value={item.value}
          handler={item.handler}
        />
      ))}
    </CustomBox>
  );
};

export default SwitchList;
