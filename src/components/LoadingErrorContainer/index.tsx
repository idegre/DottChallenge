import React, { Suspense } from 'react';

type Props = {
  children?: JSX.Element;
  isLoading?: boolean;
};

export const LoadingErrorContainer = ({
  children,
  isLoading = false,
}: Props) => {
  return <Suspense fallback={<div>loading</div>}>
    {children}
  </Suspense>
};
