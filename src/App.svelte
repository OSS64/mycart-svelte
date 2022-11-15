<script lang="ts">
	import { Router, Route } from "svelte-routing";
	import Navbar from "./shared/navbar/navbar.svelte";
	import Products from "./modules/products-list/list.svelte";
	import Details from "./modules/product-details/details.svelte";
	import Header from "./shared/header/header.svelte";
	import Footer from "./shared/footer/footer.svelte";
	import Dashboard from "./modules/dashboard/dashboard.svelte";
	import Cart from "./modules/cart/cart.svelte";

	export let url = "";
	
</script>

<main class="container-fluid">
	<div class="app-wrapper">
		<Router {url}>
			<Header />
			<Navbar />
			<div>
				<Route path="products-list" let:params>
					<Products category={params} />
				</Route>
				<Route path="details" component={Details} />
				<Route path="cart" component={Cart} />
				<Route path=""><Dashboard /></Route>
			</div>
		</Router>
	</div>
	<Footer />
</main>

<style lang="scss">
	@import "./app.scss";
</style>