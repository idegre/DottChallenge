import React from 'react';

import useErrorBoundary from 'use-error-boundary';

import { Container, CoverContainer } from './styled';

import locales from '../../locales/en';

export type AppError = {
  type: string,
  msg: string,
}

type Props = {
  children?: JSX.Element;
  isLoading?: boolean;
  error?: AppError | null
  LoadingComponent?: JSX.Element;
  ErrorComponent?: JSX.Element;
};

const defaultLoading = locales.defaultLoading;

const defaultError = locales.defaultError;

export const LoadingErrorContainer = ({
	children,
	isLoading = false,
	error: propsError,
	LoadingComponent,
	ErrorComponent
}: Props) => {
	const {
		ErrorBoundary,
		error,
		didCatch
	} = useErrorBoundary();
	return (
		<ErrorBoundary>
			<Container>
				{isLoading && <CoverContainer>{LoadingComponent || defaultLoading}</CoverContainer>}
				{(propsError || didCatch) && <CoverContainer>
					{ErrorComponent || (propsError || error)?.msg || defaultError}
				</CoverContainer>}
				{children}
			</Container>
		</ErrorBoundary>
	);
};
