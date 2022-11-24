export const appPref = {
	setToken: (token: string) => {
		sessionStorage.setItem('token', token)
	},
	getToken: () => {
		return sessionStorage.getItem('token')
	},
	clear() {
		sessionStorage.clear()
	},
	setUser: (user: any) => {
		sessionStorage.setItem('user', JSON.stringify(user))
	},
	getUser: () => {
		return JSON.parse(sessionStorage.getItem('user') || '{}')
	},
}
