<script lang="ts">
	import { navigate, Route, Router } from 'svelte-routing';
	import Cart from './modules/cart/cart.svelte';
	import Dashboard from './modules/dashboard/dashboard.svelte';
	import Login from './modules/login&reg/login.svelte';
	import Details from './modules/product-details/details.svelte';
	import Products from './modules/products-list/list.svelte';
	import ContactUs from './modules/contact/contactUs.svelte';
	import { onMount } from 'svelte';
	import Layout from './layout/Layout.svelte';
	import { Utility } from './shared/utilities/utility';
	import { authStore } from './store/auth.store';
	import Signup from './modules/signup/signup.svelte';
	import Error from './error/error.svelte';
	export const url = '';
	/**
	 * If user and token is set in session storage
	 * Then it set Auth Storage with isAuthenticated to true.
	 */
	onMount(() => {
		if (Utility.getToken() && Utility.getUser()) {
			authStore.set({
				isAuthenticated: true,
				user: Utility.getUser(),
			});
			/**
			 * After login if user try to open login or signup page it will redirect to
			 * dashboard page.
			 */
			if (location.pathname === '/signup' || location.pathname === '/login') {
				navigate('/');
			}
		} else if (location.pathname !== '/signup') {
			/**
			 * If guest try to open authenticated pages except signup, it will redirect
			 * to login page. If user open signup page, it should not redirect to login page.
			 */
			navigate('/login');
		}
	});
</script>

<Router {url}>
	<Route path="products-list">
		<Layout>
			<Products />
		</Layout>
	</Route>
	<Route path="login">
		<Login />
	</Route>
	<Route path="signup">
		<Signup />
	</Route>
	<Route path="details">
		<Layout>
			<Details />
		</Layout>
	</Route>
	<Route path="cart">
		<Layout>
			<Cart />
		</Layout>
	</Route>
	<Route path="contact/*">
		<Layout>
			<ContactUs />
		</Layout>
	</Route>
	<Route path="/">
		<Layout>
			<Dashboard />
		</Layout>
	</Route>
	<Route component={Error} />
</Router>

<style lang="scss">
	@import './app.scss';
</style>
