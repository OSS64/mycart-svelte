<script lang="ts">
	import { navigate, Link, Router } from 'svelte-routing';
	import { Button, Form, FormGroup, Input } from 'sveltestrap';
	import { callLoginApi } from '../../services/users.services';
	import Errormodal from '../../shared/utilities/errormodal.svelte';
	import { Utility } from '../../shared/utilities/utility';
	import { authStore } from '../../store/auth.store';
	import { snackbarStore } from '../../store/snackbar.store';
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
		let result = await callLoginApi(loginData);
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
			ajaxCall();
		}
		return false;
	};
</script>
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
		<Router>
			<Link to="/signup">Dont have an account? Signup here.</Link>
		</Router>
	</Form>
</div>
<style lang="scss">
	@import './login.scss';
</style>
