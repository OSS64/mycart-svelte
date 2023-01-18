<script lang="ts">
	import { navigate, Link, Router } from 'svelte-routing';
	import { AppConstants } from '../../app-constants/app-config';
	import { Utility } from '../../shared/utilities/utility';
	import { authStore } from '../../store/auth.store';
	import {
		Form,
		FormGroup,
		Input,
		Label,
		Button,
		FormText,
		Modal,
		ModalBody,
		ModalHeader,
		ModalFooter,
	} from 'sveltestrap';
	import { onDestroy } from 'svelte';
	let email = '';
	let password = '';

	/**
	 * Assign svelet reactive variable on the basis of email/password.
	 * The value of these variable get changed with the change of
	 * email/password field value.
	 */
	$: isEmailInValid = Utility.isEmailInValid(email);
	$: isPasswordInValid = Utility.isPasswordInValid(password);

	let globalErrorMessage: string = '';

	/**
	 * Used to pass data in login API
	 */
	const loginData = {};

	/**
	 * Method is getting call after successful validation of login form.
	 */
	const ajaxCall = async () => {
		/**
		 * Header is used in login API call
		 */
		const requestHeader: RequestInit = {
			method: 'POST',
			body: JSON.stringify(loginData),
			headers: {
				'Content-Type': 'application/json',
			},
		};

		/**
		 * After success response of login API call,
		 * token and user set to session storage.
		 * Svelte auth store is updated with isAuthenticated = true
		 * then it redirects to dashboard page.
		 */
		await fetch(AppConstants.apiBase + '/login', requestHeader)
			.then((response) => response.json())
			.then((data) => {
				console.log('data:', data);
				Utility.setToken(data.user.token);
				const user = {
					email: data.user.email,
					password: loginData['password'],
					token: data.user.token,
				};
				Utility.setUser(user);
				authStore.set({
					isAuthenticated: true,
					user: user,
				});
				navigate('/');
			})
			.catch((error) => {
				console.log('error:', error);
			});
	};

	/**
	 * Validate login form, then submit the form if both the fields
	 * have data within it.
	 * @param e - submit event
	 */
	export const onSubmit = (e: any) => {
		e.preventDefault();
		if (email.length === 0 && password.length === 0) {
			globalErrorMessage = 'Fields are Empty';
			return;
		}
		if (email.length === 0) {
			globalErrorMessage = 'Email is Empty';
			return;
		}
		if (password.length === 0) {
			globalErrorMessage = 'Password is Empty';
			return;
		}
		if (email.length > 0 && password.length > 0) {
			globalErrorMessage = '';

			loginData['email'] = email;
			loginData['password'] = password;

			submitForm();
		}
		return false;
	};

	/**
	 * Flag to display Toast Message.
	 */
	let resStatus = 0;

	let isOpen: boolean = false;
	let toastMessage: string = '';
	let toggle = () => {
		isOpen = !isOpen;
	};

	/**
	 * used for timer counter, to display message.
	 */
	let counter: number;
	let interval: string | number | NodeJS.Timer;

	/**
	 * Concat timer in toastmessage until timer reaches to 0.
	 * At 0 sec, timer get stopped.
	 */
	const startTimer = (msg: string) => {
		if (!counter) {
			stopTimer();
		} else {
			toastMessage = `${msg}.
        You will be redirected to home page after ${counter} sec${
				counter === 1 ? '' : 's'
			}.`;
			counter -= 1;
		}
	};

	/**
	 * Trigger timer at an interval of 1 sec.
	 */
	const showTimerMessage = (msg: string) => {
		if (!interval) {
			counter = 5;
			interval = setInterval(startTimer, 1000, msg);
		}
	};

	/**
	 * Clear interval, to stop memory leak.
	 * Then navigate to home page.
	 */
	const stopTimer = () => {
		clearInterval(interval);
		interval = null;
		navigate('/');
	};

	/**
	 * One of Life Cycle Hooks implementation.
	 */
	onDestroy(stopTimer);
	/**
	 * Used to store data, required for API call.
	 */

	// let loginApiFailed = false;
	/**
	 * call asynchronous API call.
	 * after success, it returns to login page.
	 */
	const submitForm = async () => {
		/**
		 * Populate Fetch Header Requests.
		 */
		const requestHeader: RequestInit = {
			method: 'POST',
			body: JSON.stringify({
				email: loginData['email'],
				password: loginData['password'],
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		};

		/**
		 * Perform Fetch API call for login
		 */
		try {
			await fetch(AppConstants.apiBase + '/login', requestHeader)
				.then((response) => {
					isOpen = true;
					resStatus = response.status;
					return response.json();
				})

				.then((data) => {
					if (!data?.user) {
						toastMessage = data.message;
						return;
					}
					switch (resStatus) {
						case 400:
						case 404:
						default:
							toastMessage = data.message;
							break;

						case 200:
							Utility.setToken(data?.user?.token);
							Utility.setUser(data?.user);
							toastMessage = data.message;
							authStore.set({
								isAuthenticated: true,
								user: data?.user,
							});
							showTimerMessage(data.user?.email || '');
							break;
					}
				})
				.catch((error) => {
					isOpen = true;
					toastMessage = `Unable to connect API.
          Internet Connection Issue.
          ${error}`;
				});
		} catch (error) {
			console.log('catch error:', error);
		}
	};
</script>

<Modal {isOpen} {toggle}>
	<ModalHeader {toggle}>Register Response | Status:{resStatus}</ModalHeader>
	<ModalBody>
		{toastMessage || 'Please wait...'}
	</ModalBody>
	<ModalFooter>
		<Button color="secondary" on:click={toggle}>Cancel</Button>
	</ModalFooter>
</Modal>
<div class="px-page login-bg">
	<Form class="form">
		<h4 class="title">Welcome user!</h4>
		<p class="text-below">All fields are necessary.</p>
		{#if globalErrorMessage.length}
			<p class="text-danger">{globalErrorMessage}</p>
		{/if}
		<FormGroup class="username" floating label="Email">
			<Input
				type="email"
				bind:value={email}
				placeholder="Enter a value"
				invalid={isEmailInValid}
				feedback="Please enter a valid email"
			/>
		</FormGroup>
		<FormGroup class="password" floating label="Password">
			<Input
				type="password"
				bind:value={password}
				invalid={isPasswordInValid}
				placeholder="Enter a value"
				feedback="Please enter a valid password"
			/>
		</FormGroup>
		<Button type="button" on:click={onSubmit}>Login</Button><br />
		<div>
			<a href="/signup">Dont have an account? Signup here.</a>
		</div>
	</Form>
</div>

<style lang="scss">
	@import './login.scss';
</style>
