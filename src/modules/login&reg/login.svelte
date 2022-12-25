<script lang="ts">
	import { navigate, Link } from 'svelte-routing'
	import { afterUpdate, onMount } from 'svelte/internal'
	import { Button, Form, FormGroup, Input } from 'sveltestrap'
	import { AppConstants } from '../../app-constants/app-config'
	import { Utility } from '../../shared/utilities/utility'
	import { authStore } from '../../store/auth.store'
	let showErrorMessage = false
	$: email = ''
	$: password = ''
	$: isEmailInValid = Utility.isEmailValid(email)
	$: isPasswordInValid = Utility.isPasswordValid(password)
	$: globalErrorMessage = ''
	$: {
		if (email.length === 0 && password.length === 0) {
			globalErrorMessage = 'Fields are Empty'
		} else if (email.length === 0) {
			globalErrorMessage = 'Email is Empty'
		} else if (password.length === 0) {
			globalErrorMessage = 'Password is Empty'
		} else if (
			email !== AppConstants.defaultUser.email &&
			password !== AppConstants.defaultUser.password
		) {
			globalErrorMessage = 'Email and password wrong'
		} else if (email !== AppConstants.defaultUser.email) {
			globalErrorMessage = 'Email wrong'
		} else if (password !== AppConstants.defaultUser.password) {
			globalErrorMessage = 'Password wrong'
		} else {
			globalErrorMessage = ''
		}
		console.log(globalErrorMessage, 'globalErrorMessage')
	}
	onMount(() => {
		console.log('login page')
	})
	afterUpdate(() => {
		console.log('login page after update')
	})
	const onSubmit = (e: any) => {
		e.preventDefault()
		if (email.length === 0 && password.length === 0) {
			globalErrorMessage = 'Fields are Empty'
			return
		}
		if (email.length === 0) {
			globalErrorMessage = 'Email is Empty'
			return
		}
		if (password.length === 0) {
			globalErrorMessage = 'Password is Empty'
			return
		}
		if (
			email !== AppConstants.defaultUser.email &&
			password !== AppConstants.defaultUser.password
		) {
			globalErrorMessage = 'Email and password wrong'
		} else if (email !== AppConstants.defaultUser.email) {
			globalErrorMessage = 'Email wrong'
		} else if (password !== AppConstants.defaultUser.password) {
			globalErrorMessage = 'Password wrong'
		} else {
			globalErrorMessage = ''
			Utility.setToken(AppConstants.defaultUser.token)
			Utility.setUser(AppConstants.defaultUser)
			authStore.set({
				isAuthenticated: true,
				user: AppConstants.defaultUser,
			})
			navigate('/')
		}
	}
</script>

<div class="px-page login-bg">
	<Form class="form">
		<h4 class="title">Welcome user!</h4>
		<p class="text-below">All fields are necessary.</p>
		{#if globalErrorMessage.length && showErrorMessage}
			<p class="text-danger">{globalErrorMessage}</p>
		{/if}
		<FormGroup class="username" floating label="Email">
			<Input
				on:focus={() => {
					showErrorMessage = true
				}}
				type="email"
				autocomplete="off"
				bind:value={email}
				placeholder="Enter a value"
				invalid={isEmailInValid}
			/>
		</FormGroup>
		<FormGroup class="password" floating label="Password">
			<Input
				type="password"
				autocomplete="off"
				bind:value={password}
				invalid={isPasswordInValid}
				placeholder="Enter a value"
			/>
		</FormGroup>
		<Button type="button" on:click={onSubmit}>Login</Button><br />
		<Link to="/signup">Dont have an account? Signup here.</Link>
	</Form>
</div>

<style lang="scss">
	.title {
		text-align: center;
		margin-bottom: 20px;
		font-size: 22px;
	}
	.px-page {
		height: 100vh;
		width: 100vw;
		display: grid;
		align-items: center;
		justify-content: center;
	}
	:global(.form) {
		min-width: 450px;
		background: #fff;
		box-shadow: 0 0 10px rgb(0, 0, 0);
		text-align: center;
		padding: 50px 20px;
		border-radius: 10px;
	}
	.text-danger {
		color: red;
	}
	.text-below {
		font-size: 10px;
		text-align: left;
	}
	.px-page.login-bg {
		background-image: url('./../content/images/login-bg-img.avif');
		background-size: cover;
		background-position: left bottom;
		position: relative;
		z-index: 1;
	}
	.px-page.login-bg:after {
		content: '';
		position: absolute;
		left: 0;
		bottom: 0;
		height: 100%;
		width: 100%;
		background: #000;
		z-index: -1;
		opacity: 0.7;
	}
</style>
