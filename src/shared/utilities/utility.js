import { AppConstants } from '../../app-constants/app-config'

const formatter = new Intl.NumberFormat(AppConstants.formatterConfig.locale, {
	style: AppConstants.formatterConfig.style,
	currency: AppConstants.formatterConfig.currency,
})
export const Utility = {
	formatNumber: formatter,
	setToken: (token) => {
		sessionStorage.setItem('token', token)
	},
	getToken: () => {
		return sessionStorage.getItem('token')
	},
	clear() {
		sessionStorage.clear()
	},
	setUser: (user) => {
		sessionStorage.setItem('user', JSON.stringify(user))
	},
	getUser: () => {
		return JSON.parse(sessionStorage.getItem('user'))
	},
	isEmailValid: (email) => {
		console.log('email', email)
		return email.length > 0 && !email.includes('@')
	},
	isPasswordValid: (password) => {
		return password.length < 5 && password.length > 0
	},
}
