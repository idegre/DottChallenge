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
});