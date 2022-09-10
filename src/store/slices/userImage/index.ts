import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export const reducerPath = 'userImage';

export type ImageContent = {
  className: string;
  probability: number;
}

export type State = {
  selectedImage: string | null;
  isLoading: boolean;
  imageContent: ImageContent[] | null
};

const initialState: State = {
	selectedImage: null,
	isLoading: true,
	imageContent: null,
};

const counterSlice = createSlice({
	name: reducerPath,
	initialState,
	reducers: {
		selectImage(state, action: PayloadAction<React.ChangeEvent<HTMLInputElement>>) {
			if(action.payload.target?.files) {
				state.selectedImage = URL.createObjectURL(action.payload.target?.files[0]);
			}
		},
		setIsLoading(state, action: PayloadAction<boolean>) {
			state.isLoading = action.payload;
		},
		setImageContent(state, action: PayloadAction<ImageContent[]>) {
			state.imageContent = action.payload;
		},
	},
});

export const {selectImage, setIsLoading, setImageContent} = counterSlice.actions;
export default counterSlice.reducer;
