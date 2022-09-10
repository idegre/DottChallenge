import {listResponseTransform, rootResponseTransform} from '..';
import { BreedResponse, BreedListResponse } from '../types';

export const mockBreedImages = {
	message: [
		'url1',
		'url2',
		'url3'
	],
	status: 'fulfilled'
} as BreedResponse;

export const mockBreedList = {
	message: {
		breed1: [],
		breed2: [
			'subbreed1',
			'subbreed2'
		],
		breed3: [
			'subbreed3'
		]
	},
	status: 'fulfilled'
} as BreedListResponse;

describe('Dog API', () => {
	test('breed transform function should work as expected', () => {
		expect(rootResponseTransform(mockBreedImages)).toStrictEqual(mockBreedImages.message);
	});
	test('breed transform function should work as expected when empty', () => {
		expect(rootResponseTransform({ message: [], status: 'fulfilled' })).toStrictEqual([]);
	});
	test('list transform function should work as expected', () => {
		expect(listResponseTransform(mockBreedList)).toStrictEqual(['breed1','breed2','subbreed1','subbreed2','breed3','subbreed3']);
	});
	test('list transform function should work as expected when empty', () => {
		expect(listResponseTransform({
			message: {},
			status: 'fulfilled'
		})).toStrictEqual([]);
	});
});
