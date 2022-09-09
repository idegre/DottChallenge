import React from 'react';
import { ImageSelector } from '../components/ImageSelector';
import { LoadingErrorContainer } from '../components/LoadingErrorContainer';
import { useGetTasksQuery } from '../services/breedImages';

export const HomeScreen = () => {
  useGetTasksQuery();
  return (
    <LoadingErrorContainer>
      <ImageSelector />
    </LoadingErrorContainer>
  );
};
