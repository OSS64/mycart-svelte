<script lang="ts">
	import { onMount } from 'svelte';
	import Carousel from './carousel.svelte';
	import { Alert } from 'sveltestrap';
	import { navigate } from 'svelte-routing';
	import { AppConstants } from '../../app-constants/app-config';
	import Parallax from './parallax-effect.svelte';
	import { Utility } from '../../shared/utilities/utility';
	import { productStore } from './../../store/product.store';
	import { snackbarStore } from '../../store/snackbar.store';

	let categoryList = [];
	let selectedCategory = '';
	let showAlert = false;
	let message = '';

	/**
	 * Header's data required in product API call
	 */
	const requestHeader: RequestInit = {
		headers: { Authorization: Utility.getToken() },
	};

	/**
	 * Execute as soon as component's markup mount on DOM.
	 */
	export const callOnLoad = async () => {
		/**
		 * If products API is already fetched data before, it will not call it again.
		 * If there is no data in productStore, it will call API
		 * and set data in productStore.
		 */
		if ($productStore.length === 0) {
			await fetch(AppConstants.apiBase + '/products', requestHeader)
				.then((data) => {
					return data.json();
				})
				.then((result) => {
					if (Array.isArray(result)) {
						/**
						 * update product image URL, if image is small, update it with
						 * large image and assign no image if image url is improper.
						 */
						result = Utility.updateImageUrl(result);

						productStore.set(result);
						categoryList = populateCategory(result);
					} else {
						snackbarStore.set({
							isOpen: true,
							toastMessage: 'we encountered some problems',
							resStatus: 'Please try again later',
						});
					}
				});
		} else {
			/**
			 * Execute if there is products in productStore.
			 */
			categoryList = populateCategory($productStore);
		}
	};

	/**
	 * Call on component's initialization
	 */
	onMount(callOnLoad);

	/**
	 * Returns list of category from all the products.
	 * @param data - products
	 * @returns - array of product's category.
	 */
	const populateCategory = (data: any[]) => {
		return [
			...new Set(data.map((product: { category: any }) => product.category)),
		];
	};

	/**
	 * Execute on click of Search button, and it navigates to PLP page
	 * with the selected category in url.
	 */
	function handleSearch() {
		if (selectedCategory != '') {
			navigate('/products-list?category=' + selectedCategory);
		} else {
			/**
			 * Display an alert message if category is not selected from the dropdown
			 * and remove it after 3 secs.
			 */
			message = 'Please select a category.';
			showAlert = true;
			setTimeout(() => (showAlert = false), 3000);
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
		<Parallax />
	</div>
</div>

<style lang="scss">
	@import './dashboard.scss';
</style>
