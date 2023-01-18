<script lang="ts">
	import { onMount } from 'svelte';
	import { Button } from 'sveltestrap';
	import Cards from '../products-list/card.svelte';
	import Filters from './Filters.svelte';
	import { navigate } from 'svelte-routing';
	import { priceStore } from './../../store/price';
	import { productStore } from './../../store/product.store';
	import { AppConstants } from '../../app-constants/app-config';
	import { Utility } from '../../shared/utilities/utility';
	import { snackbarStore } from '../../store/snackbar.store';

	let loading = false;
	let error = false;
	let brand = [];
	let pricedata = [];
	let products = [];
	let renderData = [];
	const selectedBrand = {
		brand: [],
	};
	let price = 'All';
	let noDataShown: any;

	/**
	 * Get category from url.
	 */
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const selectedCategory = urlParams.get('category');

	/**
	 * Used to check whether used category has products or not.
	 * if there is no product, then no product text will display.
	 */
	let categoryHasData = false;

	/**
	 * Header required for products API call
	 */
	const requestHeader: RequestInit = {
		headers: { Authorization: Utility.getToken() },
	};

	/**
	 * execute callOnLoad callback as the component has been mounted to the DOM.
	 */
	export const callOnLoad = async () => {
		loading = true;
		error = false;
		try {
			/**
			 * If svelte productStore does not have data then API will call
			 * and set productStore.
			 */
			if ($productStore.length === 0) {
				await fetch(AppConstants.apiBase + '/products', requestHeader)
					.then((data) => {
						return data.json();
					})
					.then((result) => {
						if (Array.isArray(result)) {
							result = Utility.updateImageUrl(result);
							productStore.set(result);
							getBrandsAndProducts();
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
				 * Execute if svelte productStore already contains products.
				 */
				getBrandsAndProducts();
			}

			loading = false;
		} catch (e) {
			error = true;
		}
	};

	/**
	 * Populates products to be rendered in DOM.
	 */
	const getBrandsAndProducts = () => {
		products = populateProducts($productStore, selectedCategory);
		categoryHasData = products?.length > 0;
		renderData = products;
		brand = populateBrands(products);
	};

	/**
	 * Returns filtered products on basis of category in the url.
	 * @param data - products array
	 * @param filterStr - category in url
	 * @returns data - return filtered products
	 */
	const populateProducts = (data: any[], filterStr: string) => {
		if (filterStr) {
			data = data.filter(
				(el: { category: string }) =>
					el.category.toUpperCase().indexOf(filterStr.toUpperCase()) > -1
			);
		}
		return data;
	};

	/**
	 * Return brands from the filtered products based on category in the url.
	 * @param data - filtered products
	 * @returns array of brands from the filtered products
	 */
	const populateBrands = (data: any[]) => {
		return Object.values(
			data.reduce((a, { features: { brand } }) => {
				a[brand] = {
					brand,
				};
				return a;
			}, {})
		);
	};

	/**
	 * Perform more filter based on facet selection.
	 */
	function filterFunc() {
		let myData = products;

		/**
		 * Update products based on brand facet apply.
		 */
		if (selectedBrand.brand.length > 0) {
			myData = products.filter((el) =>
				selectedBrand.brand.includes(el.features.brand)
			);
		}

		/**
		 * Update renderData based on price facet apply.
		 */
		if (price == 'All') {
			renderData = myData;
		} else {
			const priceRange = pricedata.find((el) => el.text == price);
			const { PriceLow, PriceUp } = priceRange;
			renderData = myData.filter(
				(el) =>
					parseInt(el.price.toString().replace(',', '')) <= PriceUp &&
					parseInt(el.price.toString().replace(',', '')) > PriceLow
			);
		}

		/**
		 * manage to display "No data" based on filter from facets.
		 */
		if (renderData.length === 0) {
			noDataShown.style.visibility = 'visible';
			noDataShown.style.display = 'block';
		} else {
			noDataShown.style.visibility = 'hidden';
			noDataShown.style.display = 'none';
		}
	}

	/**
	 * Populates price facets from svelte priceStore.
	 */
	export async function getPrice() {
		loading = true;
		error = false;

		try {
			let prices = priceStore;
			pricedata = prices;
			loading = false;
		} catch (error) {
			return error;
		}
	}

	/**
	 * Invoke onMount during the component's initialisation.
	 */
	onMount(() => {
		callOnLoad();
		getPrice();
	});
</script>

{#if categoryHasData}
	<div class="row">
		<h3 class="product-list-title">Product List</h3>
	</div>
	<div class="bigContainer">
		<div class="abc">
			<Filters
				bind:selectedBrand={selectedBrand.brand}
				bind:brands={brand}
				bind:price
				bind:pricedata
				on:filter={filterFunc}
			/>
		</div>
		<div>
			{#if loading}
				Loading: {loading}
			{:else if error}
				Error: {error}
			{:else}
				<div class="cardshow">
					<div class="row">
						{#each renderData as el}
							<Cards product={el} />
						{/each}
					</div>
				</div>
			{/if}
			<div class="noData" bind:this={noDataShown}>
				<p>No data</p>
			</div>
		</div>
	</div>
{:else}
	<div class="noProduct">
		<div class="no-product-inner">
			<h1>No Product Found</h1>
			<Button on:click={() => navigate('/')}>Go Back</Button>
		</div>
	</div>
{/if}

<style lang="scss">
	@import './list.scss';
</style>
