import { AppConstants } from '../app-constants/app-config';
import { ErrorStore } from '../store/errormodal.store';
import { Utility } from '../shared/utilities/utility';
import { authStore } from '../store/auth.store';
import { openErrorMessage } from './error.service';

/**
 * Header's data required for register and login API call
 * @param formData - JSON object required to pass in body during API call.
 * @returns - Header data for API call
 */
const requestHeader = (formData: {}) => {
	return {
		method: 'POST',
		body: JSON.stringify(formData),
		headers: {
			'Content-Type': 'application/json',
		},
	};
};
/**
 * Trigger register API call
 * @param data - JSON object required to pass in body during API call.
 * @returns - Promise
 */
const fetchRegister = async (data: {}) => {
	try {
		const response = await fetch(
			AppConstants.apiBase + '/register',
			requestHeader(data)
		);
		return await response.json();
	} catch (error) {
		return error;
	}
};
/**
 * Call register API asynchronously
 * @param form - JSON object required to pass in body during API call.
 * @returns - a Promise
 */
export const callRegisterApi = async (form: {}, isLogmeIn: boolean) => {
	const result = await fetchRegister(form);
	let res = Utility.getErrorMessage(result, 'register');
	if (result.statusCode) {
		if (result.statusCode === 201) {
			if (isLogmeIn) {
				// openErrorMessage({
				// 	isOpen: true,
				// 	message: result.message,
				// 	title: 'Success',
				// });
				await callLoginApi({
					email: form['email'],
					password: form['password'],
				});
			}
			// else {
			// 	openErrorMessage({
			// 		isOpen: true,
			// 		endTimerRedirectUrl: '/login',
			// 		message: result.message,
			// 		timer: true,
			// 		title: 'Success',
			// 	});
			// }
		} else {
			openErrorMessage({
				isOpen: true,
				message: `Error : ${result.message}`,
				title: 'Failed',
			});
		}
	} else {
		openErrorMessage({
			isOpen: true,
			message: 'Please refresh the page and try again.',
			title: 'Failed',
		});
	}
	return { message: res.message, statusCode: result.statusCode };
};
/**
 * login API call
 * @param data - JSON object required to pass in body during API call.
 * @returns - Promise
 */
const fetchLogin = async (data: {}) => {
	try {
		const response = await fetch(
			AppConstants.apiBase + '/login',
			requestHeader(data)
		);
		return await response.json();
	} catch (error) {
		return error;
	}
};
/**
 * Call login API asynchronously
 * @param form - JSON object required to pass in body during API call.
 * @returns - a Promise
 */
export const callLoginApi = async (form: {}) => {
	const result = await fetchLogin(form);
	if (result.hasOwnProperty('user')) {
		// openErrorMessage({
		// 	isOpen: true,
		// 	timer: true,
		// 	message: 'You have logged in successfully.',
		// 	title: 'Success',
		// 	endTimerRedirectUrl: '/',
		// });
		window.location.href = '/';
		Utility.setToken(result.user.token);
		const user = {
			email: result.user.email,
			password: form['password'],
			token: result.user.token,
		};
		Utility.setUser(user);
		authStore.set({
			isAuthenticated: true,
			user: user,
		});
		return result;
	} else {
		openErrorMessage({
			isOpen: true,
			message: `Error : ${result.message}`,
			title: 'Failed',
		});
		return Utility.getErrorMessage(result, 'product');
	}
};