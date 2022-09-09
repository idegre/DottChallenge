import React, { ChangeEvent, LegacyRef, SyntheticEvent, useRef } from 'react';
import {useSelector} from 'react-redux';
import {LoadingErrorContainer} from '../../components/LoadingErrorContainer';
import {getUserImageAsset} from '../../store/slices/userImage/selectors';
import { Input } from './styled';

type Props = {
  onLoad: (evt: SyntheticEvent<HTMLImageElement, Event>) => void,
  onInputChange: (evt: ChangeEvent<HTMLInputElement>) => void,
  isLoading?: boolean
}

export const ImageSelector = ({onLoad, onInputChange, isLoading = false}: Props) => {
  const selectedImage = useSelector(getUserImageAsset);

  const inputRef = useRef<LegacyRef<HTMLInputElement>>()
  const imageRef = useRef<LegacyRef<HTMLImageElement>>()

  return (
    <LoadingErrorContainer isLoading={isLoading}>
      <>
        {!!selectedImage ? (
          <img
            src={selectedImage}
            onLoad={onLoad}
            alt="user's upload"
            ref={imageRef.current}
          />
        ) : (<Input>
        <input type="file" name="file" accept='image/jpeg;image/gif;image/tif;image/tiff;image/jpg;image/png' ref={inputRef.current} onChange={onInputChange} />
        </Input>)}
      </>
    </LoadingErrorContainer>
  );
};
