import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import {GalleryImage} from '../index';
import {Constants as wrapperConsts} from '../../../../LoadingErrorContainer';

describe('gallery image component', () => {
	test('shows loading state', () => {
		const el = render(<GalleryImage dimentions={200} alt="mock" src="mock" />);
		expect(el.getByTestId(wrapperConsts.LOADING_TESTID));
	});
	test('shows error state', () => {
		const el = render(<GalleryImage dimentions={200} alt="mock" src="mock" />);
		const image = el.getByRole('img');
		fireEvent.error(image);
		expect(el.getByTestId(wrapperConsts.ERROR_TESTID));
		expect(el.queryByTestId(wrapperConsts.LOADING_TESTID)).toBeNull();
	});
	test('shows image state', () => {
		const el = render(<GalleryImage dimentions={200} alt="mock" src="LOAD_SUCCESS_SRC" />);
		const image = el.getByRole('img');
		fireEvent.load(image);
		expect(el.findByAltText('mock'));
		expect(el.queryByTestId(wrapperConsts.ERROR_TESTID)).toBeNull();
		expect(el.queryByTestId(wrapperConsts.LOADING_TESTID)).toBeNull();
	});
});