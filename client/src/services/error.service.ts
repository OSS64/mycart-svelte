import { ErrorStore, type InErrorStore } from '../store/errormodal.store';
// show error message
export const openErrorMessage = (options: InErrorStore) => {
	if (!Object.keys(options)) return;
	ErrorStore.set(options);
};