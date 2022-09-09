import React from 'react';
import { Container, LoaderContainer } from './styled';

type Props = {
  children?: JSX.Element;
  isLoading?: boolean;
};

export const LoadingErrorContainer = ({
  children,
  isLoading = false,
}: Props) => {
  return (
    <Container>{isLoading && <LoaderContainer>loading</LoaderContainer>}{children}</Container>
  );
};
