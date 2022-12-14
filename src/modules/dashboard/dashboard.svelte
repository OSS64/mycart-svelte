<script>
	import { onMount } from 'svelte'
	import Carousel from './carousel.svelte'
	import { Alert } from 'sveltestrap'
	import { navigate } from 'svelte-routing'
	import { AppConstants } from '../../app-constants/app-config'
	import CallToAction from './CallToAction.svelte'
	let categoryList = []
	let selectedCategory = ''
	let showAlert = false
	let message = ''
	onMount(async () => {
		let products = await fetch(AppConstants.apiBase + '/search')
		let productsList = await products.json()
		categoryList = [...new Set(productsList.map((product) => product.category))]
	})
	function handleSearch() {
		if (selectedCategory != '') {
			navigate('/products-list?category=' + selectedCategory)
		} else {
			message = 'Please select a category.'
			showAlert = true
			setTimeout(() => (showAlert = false), 3000)
		}
	}
</script>

<div class="dashboard">
	<Alert isOpen={showAlert} color="warning" fade={true} dismissible
		>{message}</Alert
	>
	<div class="m-large">
		<div class="form-inline category-list-wrapper">
			<div class="form-group">
				<div class="input-group">
					<select
						bind:value={selectedCategory}
						class="form-select "
						aria-label=""
						data-size="5"
					>
						<option disabled value="">Please select a category</option>
						{#each categoryList as category}
							<option value={category}>{category}</option>
						{/each}
					</select>
					<button type="button" on:click={handleSearch} class="btn btn-theme"
						>Search</button
					>
				</div>
			</div>
		</div>
		<div class="content-placeholder mt25 cust-carousel">
			<Carousel />
		</div>
		<div class="description">
			<p>
				This is a micro e-commerce website where the portal invites you to visit
				their inventory and select products from a list of electronic hardwares
				and devices. The website is a classic demonstration of how to help meet
				the needs of a customer using a micro e-commerce platform. Every user
				has his own unique requirements and the application tries to deliver a
				match for every customer.
			</p>
			<p>
				This e-commerce portal provides many easy to use features. A user can
				filter from the list of products by selecting a specific category on the
				dashboard. Further, more optional filters are available in the product
				list screen. All the products are displayed in a set of cards fashion
				with short description. A user can add any number of products to the
				cart from the list. The user can see the number of items in the cart at
				the top-right corner, on the cart icon.
			</p>
			<p>
				When a user clicks on a particular card of product, the user is
				navigated to the product details screen. A complete description of the
				selected item is displayed.
			</p>
		</div>
		<CallToAction />
	</div>
</div>

<style lang="scss">
	@import './dashboard.scss';
</style>
