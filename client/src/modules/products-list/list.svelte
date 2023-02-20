<script lang="ts">
	import { onMount } from 'svelte';
	import { Button } from 'sveltestrap';
	import Cards from '../products-list/card.svelte';
	import Filters from './Filters.svelte';
	import { navigate } from 'svelte-routing';
	import { priceStore } from './../../store/price';
	import Loader from '../../shared/utilities/Loader.svelte';
	import { Utility } from '../../shared/utilities/utility';
	import { getProductList } from '../../services/products.services';
	import type { Product } from '../../models/types';
	import Pagination from './pagination/Pagination.svelte';
	import { classList } from 'svelte-body';
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
	let total: number;
	/**
	 * Used to check whether used category has products or not.
	 * if there is no product, then no product text will display.
	 */
	const category = new URLSearchParams(window.location.search).get('category');
	let categoryHasData = false;
	/**
	 * execute callOnLoad callback as the component has been mounted to the DOM.
	 */
	export const callOnLoad = async () => {
		loading = true;
		error = false;
		let result = await getProductList(1, 5, category);
		if (result.hasOwnProperty('message')) {
			error = true;
		} else {
			loading = false;
			total = result['prodcutsCount'];
			result = Utility.updateImageUrl(result['products'] as Product[]);
			getBrandsAndProducts(result);
		}
	};
	const pageChange = async (event: {
		detail: { currentPage: number; pageSize: number };
	}) => {
		let result = await getProductList(
			event.detail.currentPage,
			event.detail.pageSize,
			category
		);
		if (result.hasOwnProperty('message')) {
			error = true;
		} else {
			loading = false;
			total = result['prodcutsCount'];
			result = Utility.updateImageUrl(result['products'] as Product[]);
			getBrandsAndProducts(result);
		}
	};
	/**
	 * Populates products to be rendered in DOM.
	 */
	const getBrandsAndProducts = (result: any) => {
		products = result;
		categoryHasData = products?.length > 0;
		renderData = products;
		brand = populateBrands(products);
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

<svelte:body use:classList={'page-list'} />
{#if loading}
	<Loader />
{:else if error}
	<div class="noProduct">
		<div class="no-product-inner">
			<p>Error: {error}</p>
		</div>
	</div>
{:else if categoryHasData}
	<div class="row">
		<h3 class="product-list-title">Product List</h3>
	</div>
	<div class="bigContainer">
		<div class="leftpanel">
			<Filters
				bind:selectedBrand={selectedBrand.brand}
				bind:brands={brand}
				bind:price
				bind:pricedata
				on:filter={filterFunc}
			/>
		</div>
		<div class="rightpanel">
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
				<Pagination {total} on:setPage={pageChange} />
			{/if}
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
