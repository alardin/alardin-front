import React from 'react';
import styled from 'styled-components/native';
import Container from '../../atoms/container/Container';
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import Text from '../../atoms/text/Text';

interface ITabStyleProps {
  isFocused: boolean;
}

const TabContainer = styled(Container)`
  flex-direction: row;
`;

const TabButton = styled.TouchableHighlight<ITabStyleProps>`
  margin-right: 8px;
  padding: 4px 16px;
  background-color: ${({ theme, isFocused }) =>
    isFocused ? theme.color.gray_900 : theme.color.white};
`;

const TabText = styled(Text)<ITabStyleProps>`
  color: ${({ theme, isFocused }) =>
    isFocused ? theme.color.white : theme.color.gray_900};
`;

const TabBar = ({ state, navigation }: MaterialTopTabBarProps) => {
  return (
    <TabContainer>
      {state.routes.map((route, index) => {
        const label = route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };
        return (
          <TabButton
            isFocused={isFocused}
            onPress={onPress}
            key={`tab_${index}`}>
            <TabText isFocused={isFocused}>{label}</TabText>
          </TabButton>
        );
      })}
    </TabContainer>
  );
};

export default TabBar;
