import { appPref } from './../utils/utils'
import { writable } from 'svelte/store'
export const authStore = writable({
	isAuthenticated: false,
	user: null,
})

export const logout = () => {
	authStore.set({
		isAuthenticated: false,
		user: null,
	})
	appPref.clear()
}
