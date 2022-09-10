import React from 'react';
import { render } from '@testing-library/react';
import {Constants, PhotoGallery} from '../index';

describe('gallery component', () => {
	test('shows empty state', () => {
		const mockGetAlt = jest.fn();
		const mockGetKey = jest.fn();
		const el = render(<PhotoGallery isLoading={false} urls={[]} getAlt={mockGetAlt} getKey={mockGetKey} />);
		expect(el.getByTestId(Constants.NO_ITEM_CARD_ID));
		expect(mockGetAlt).toBeCalledTimes(0);
		expect(mockGetKey).toBeCalledTimes(0);
	});
	test('renders all photos', () => {
		const mockUrls = ['url1', 'url2', 'url3'];
		const mockGetAlt = jest.fn((i) => i);
		const mockGetKey = jest.fn((url) => url);
		const el = render(<PhotoGallery isLoading={false} urls={mockUrls} getAlt={mockGetAlt} getKey={mockGetKey} />);
		expect(mockGetAlt).toBeCalledTimes(mockUrls.length);
		expect(mockGetKey).toBeCalledTimes(mockUrls.length);
		const photoContainer = el.getByTestId(Constants.PHOTO_CONTAINER);
		expect(photoContainer).toBeTruthy();
		expect(photoContainer.childNodes.length).toBe(mockUrls.length);
	});
});