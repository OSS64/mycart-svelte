<script lang="ts">
	import { Button, Form, FormGroup, Input } from 'sveltestrap'
	import { AppConstants } from '../../app-constants/app-config'
	import { authStore } from '../../store/auth.store'
	import { Utility } from '../../shared/utilities/utility'
	import { navigate } from 'svelte-routing'
	$: email = ''
	$: password = ''
	$: isEmailInValid = Utility.isEmailValid(email)
	$: isPasswordInValid = Utility.isPasswordValid(password)
	let globalErrorMessage: string = ''
	const onSubmit = (e: any) => {
		e.preventDefault()
		if (email !== AppConstants.defaultUser.email) {
			globalErrorMessage = 'Email is not valid'
		} else if (password !== AppConstants.defaultUser.password) {
			globalErrorMessage = 'Password is not valid'
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

<div class="px-page">
	<Form class="form">
		<h4 class="title">Login</h4>
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
		<Button type="button" on:click={() => navigate('/signup')}>Register</Button>
		<small><p class="text-below">All fields are necessary.</p></small>
	</Form>
</div>

<style lang="scss">
	// :global(.username) {
	// 	margin: auto;
	// 	width: 20%;
	// 	box-shadow: 0px -2px 20px 2px rgba(0, 0, 0, 0.4);
	// }
	// :global(.password) {
	// 	margin: auto;
	// 	width: 20%;
	// 	box-shadow: 0px -2px 20px 2px rgba(0, 0, 0, 0.4);
	// }
	.title {
		text-align: center;
		margin-bottom: 20px;
		font-size: 22px;
	}
	.px-page {
		height: 100vh;
		width: 100vw;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	:global(.form) {
		min-width: 450px;
		background: #fff;
		box-shadow: 0 0 10px #ddd;
		text-align: center;
		padding: 50px 20px;
	}
	.text-danger {
		color: red;
	}
	.text-below {
		align-items: flex-end;
	}
</style>
