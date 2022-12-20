<script>
	import { onMount } from 'svelte'
	import { Button } from 'sveltestrap'
	import { AppConstants } from '../../app-constants/app-config'
	import Cards from '../products-list/card.svelte'
	import Filters from './Filters.svelte'
	import { navigate } from 'svelte-routing'
	let loading = false
	let error = false
	let brand = []
	let pricedata = []
	let products = []
	let renderData = []
	const selectedBrand = {
		brand: [],
	}
	let price = 'All'
	let noDataShown
	const queryString = window.location.search
	const urlParams = new URLSearchParams(queryString)
	const selectedCategory = urlParams.get('category')
	let categoryHasData = false
	onMount(async () => {
		loading = true
		error = false
		try {
			let response = await fetch(AppConstants.apiBase + '/products')
			products = await response.json()
			products = selectedCategory
				? products.filter(
						(el) =>
							el.category
								.toUpperCase()
								.indexOf(selectedCategory.toUpperCase()) > -1
				  )
				: products
			categoryHasData = products?.length > 0
			renderData = products
			brand = Object.values(
				products.reduce((a, { features: { brand } }) => {
					a[brand] = {
						brand,
					}
					return a
				}, {})
			)
		} catch (e) {
			error = true
		}
		loading = false
	})
	function filterFunc() {
		let myData = products
		if (selectedBrand.brand.length > 0) {
			myData = products.filter((el) =>
				selectedBrand.brand.includes(el.features.brand)
			)
		}
		if (price == 'All') {
			renderData = myData
			console.log('priceRange if', price == 'All')
		} else {
			const priceRange = pricedata.find((el) => el.text == price)
			const { PriceLow, PriceUp } = priceRange
			console.log('priceRange else', priceRange)
			renderData = myData.filter(
				(el) =>
					parseInt(el.price.replace(',', '')) <= PriceUp &&
					parseInt(el.price.replace(',', '')) > PriceLow
			)
		}
		if (renderData == '') {
			noDataShown.style.visibility = 'visible'
			noDataShown.style.display = 'block'
		} else {
			noDataShown.style.visibility = 'hidden'
			noDataShown.style.display = 'none'
		}
	}
	async function getPrice() {
		loading = true
		error = false
		let response = await fetch(AppConstants.apiBase + '/priceRg')
		let prices = await response.json()
		pricedata = prices
	}
	getPrice()
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
						{#each renderData as el, i}
							<Cards key={i} product={el} />
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

<style>
	.cardshow {
		display: flex;
	}
	h3 {
		color: grey;
		margin-top: 20px;
		margin-bottom: 20px;
	}
	.bigContainer {
		display: grid;
		grid-template-columns: 20% 80%;
	}
	.noData {
		display: none;
		visibility: hidden;
	}
	:global(#card-cls .card-body) {
		text-align: center;
	}
	.product-list-title {
		text-align: center;
	}
	.noProduct {
		min-height: 450px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.no-product-inner {
		text-align: center;
	}
	.noProduct h1 {
		font-size: 19px;
		font-weight: bold;
	}
</style>
