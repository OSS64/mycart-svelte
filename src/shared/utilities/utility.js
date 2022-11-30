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
		return email.length > 0 &&  !email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
	},
	isPasswordValid: (password) => {
		return password.length < 8 && password.length > 0
	},
}
