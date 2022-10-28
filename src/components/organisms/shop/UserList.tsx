import React, { ReactNode } from 'react';
import styled from 'styled-components/native';
import Container from '../../atoms/container/Container';

interface IUserListProps {
  children: ReactNode;
}

const CustomContainer = styled(Container)`
  margin: 8px 0;
`;

const UserList = ({ children }: IUserListProps) => {
  return <CustomContainer>{children}</CustomContainer>;
};

export default UserList;
