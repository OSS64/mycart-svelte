<script lang="ts">
	import { navigate, Route, Router } from "svelte-routing";
	import Cart from "./modules/cart/cart.svelte";
	import Dashboard from "./modules/dashboard/dashboard.svelte";
	import Login from "./modules/login&reg/login.svelte";
	import Details from "./modules/product-details/details.svelte";
	import Products from "./modules/products-list/list.svelte";
	import ContactUs from "./modules/contact/contactUs.svelte";
	import { onMount } from "svelte";
	import Layout from "./layout/Layout.svelte";
	import { Utility } from "./shared/utilities/utility";
	import { authStore } from "./store/auth.store";
	import Signup from "./modules/signup/signup.svelte";

	export const url = "";
	// let isAuthonicated = false;

	// authStore.subscribe((res: any) => {
	// 	isAuthonicated = res.isAuthenticated;
	// });

	onMount(() => {
		if (Utility.getToken() && Utility.getUser()) {
			navigate("/");
			authStore.set({
				isAuthenticated: true,
				user: Utility.getUser(),
			});
		} else {
			navigate("/login");
		}
	});
</script>

<Router {url}>
	<div class="app-wrapper">
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
			<ContactUs />
		</Route>
		<Route path="">
			<Layout>
				<Dashboard />
			</Layout>
		</Route>
	</div>
</Router>

<style lang="scss">
	@import "./app.scss";
</style>
