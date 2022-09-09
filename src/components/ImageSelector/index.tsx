import React, { ChangeEvent, LegacyRef, SyntheticEvent, useCallback, useEffect, useRef } from 'react';
import {useSelector} from 'react-redux';
import {LoadingErrorContainer} from '../../components/LoadingErrorContainer';
import { useMobilenet } from '../../hooks/use-mobilenet';
import {useAppDispatch} from '../../store/hooks';
import {selectImage, setImageContent} from '../../store/slices/userImage';
import {getUserImageAsset} from '../../store/slices/userImage/selectors';
import { Input } from './styled';

export const ImageSelector = () => {
  const dispatch = useAppDispatch();
  const selectedImage = useSelector(getUserImageAsset);

  const inputRef = useRef<LegacyRef<HTMLInputElement>>()
  const imageRef = useRef<LegacyRef<HTMLImageElement>>()

  const onInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => dispatch(selectImage(e)), [dispatch])

  const {isLoading, predictImageContent} = useMobilenet()

  const handleLoad = useCallback(async (imgEvt: SyntheticEvent<HTMLImageElement, Event>) => {
    const classes = await predictImageContent(imgEvt.currentTarget)
    classes && dispatch(setImageContent(classes))
  }, [predictImageContent, dispatch])

  return (
    <LoadingErrorContainer isLoading={isLoading}>
      <>
        {!!selectedImage ? (
          <img
            src={selectedImage}
            onLoad={handleLoad}
            onInput={console.log}
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
