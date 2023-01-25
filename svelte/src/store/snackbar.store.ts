import { writable } from 'svelte/store';
export const snackbarStore = writable({
	title: '',
	message: '',
	isOpen: false,
});
