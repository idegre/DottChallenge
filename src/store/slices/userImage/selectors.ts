import {RootState} from '../../store';

export const getUserImageAsset = (state: RootState) =>
	state.userImage.selectedImage; 
