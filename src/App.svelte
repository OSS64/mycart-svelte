<script lang="ts">
	import { Router, Route } from 'svelte-routing'
	import Navbar from './shared/navbar/navbar.svelte'
	import Products from './modules/products-list/list.svelte'
	import Details from './modules/product-details/details.svelte'
	import Header from './shared/header/header.svelte'
	import Footer from './shared/footer/footer.svelte'
	import Dashboard from './modules/dashboard/dashboard.svelte'
	import Cart from './modules/cart/cart.svelte'
	import Login from './modules/login&reg/login.svelte'
	import { authStore } from './store/auth.store'
	import { onMount } from 'svelte'
	import { appPref } from './utils/utils'
	export let url = ''
	let isAuthonicated: boolean = false
	authStore.subscribe((res: any) => {
		isAuthonicated = res.isAuthenticated
	})
	onMount(() => {
		if (appPref.getToken() && appPref.getUser()) {
			isAuthonicated = true
			authStore.set({
				isAuthenticated: true,
				user: appPref.getUser(),
			})
		}
	})
</script>

{#if !isAuthonicated}
	<Login />
{:else}
	<main class="container-fluid">
		<div class="app-wrapper">
			<Router {url}>
				<Header />
				<Navbar />
				<div>
					<Route path=""><Dashboard /></Route>
					<Route path="products-list" let:params>
						<Products category={params} />
					</Route>
					<Route path="details" component={Details} />
					<Route path="cart" component={Cart} />
					<!-- <Route path=""><Login /></Route> -->
				</div>
			</Router>
		</div>
		<Footer />
	</main>
{/if}

<style lang="scss">
	@import './app.scss';
</style>
