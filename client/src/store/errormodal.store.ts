import { writable } from 'svelte/store';

 export interface InErrorStore {
	title?:string
	message?:string
	isOpen:boolean
	timer?:boolean,
	endTimerRedirectUrl?:string
}
export const ErrorStore = writable<InErrorStore>({
	title: '',
	message: '',
	isOpen: false,
	timer:false,
	endTimerRedirectUrl:''
});
