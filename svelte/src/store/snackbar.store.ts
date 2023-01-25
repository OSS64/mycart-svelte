import { writable } from 'svelte/store';

 interface ISnackBarStore {
	title?:string
	message?:string
	isOpen:boolean
	timer?:boolean,
	endTimerRedirectUrl?:string
}
export const snackbarStore = writable<ISnackBarStore>({
	title: '',
	message: '',
	isOpen: false,
	timer:false,
	endTimerRedirectUrl:''
});
