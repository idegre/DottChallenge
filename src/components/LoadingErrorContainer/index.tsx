import React from 'react';
import { Container, CoverContainer } from './styled';

export type AppError = {
  type: string,
  msg: string,
}

type Props = {
  children?: JSX.Element;
  isLoading?: boolean;
  error?: AppError | null
};

export const LoadingErrorContainer = ({
	children,
	isLoading = false,
	error
}: Props) => {
	return (
		<Container>
			{isLoading && <CoverContainer>loading</CoverContainer>}
			{error && <CoverContainer>{error.msg || 'There was an error'}</CoverContainer>}
			{children}
		</Container>
	);
};
