import React, { ChangeEvent, useCallback, useRef, useState } from 'react';
import {AppError, LoadingErrorContainer} from '../../components/LoadingErrorContainer';
import { Container, HiddenInput, ImageContainer, VisibleInput } from './styled';

import locales from '../../locales/en';

type Props = {
  onChange: (img: React.MutableRefObject<HTMLImageElement>, url: string | null) => void,
  isLoading?: boolean,
  error?: AppError | null
}

const inputProps = {
	type:'file',
	name:'file',
	accept:'image/jpeg;image/gif;image/tif;image/tiff;image/jpg;image/png'
};

export const ImageSelector = ({onChange, isLoading = false, error}: Props) => {
	const [selectedImage, setSelectedImage] = useState<string | null>(null);

	const inputRef = useRef<HTMLInputElement>(null);
	const imageRef = useRef<HTMLImageElement>() as React.MutableRefObject<HTMLImageElement>;

	const handleClick = useCallback(() => {
		inputRef.current?.click();
	}, []);

	const handleInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		e.target?.files && setSelectedImage(URL.createObjectURL(e.target.files[0]));
	}, []);

	const handleLoad = useCallback(() => {
		onChange(imageRef, selectedImage);
	}, [selectedImage]);

	return (
		<LoadingErrorContainer isLoading={isLoading} error={error}>
			<Container>
				{selectedImage ? (
					<ImageContainer>
						<img
							src={selectedImage}
							onLoad={handleLoad}
							alt="user's upload"
							ref={imageRef}
						/>
					</ImageContainer>
				) : (<>
					<VisibleInput onClick={handleClick}>{locales.inputCTA}</VisibleInput>
					<HiddenInput>
						<input
							{...inputProps}
							ref={inputRef}
							onChange={handleInput}
						/>
					</HiddenInput>
				</>
				)}
			</Container>
		</LoadingErrorContainer>
	);
};
