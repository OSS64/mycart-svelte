import { writable } from 'svelte/store';
export const snackbarStore = writable({
	resStatus: '',
	toastMessage: '',
	isOpen: false,
});
