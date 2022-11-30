import { Utility } from '../shared/utilities/utility'
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
	window.location.href = '/login'
	Utility.clear()
}
