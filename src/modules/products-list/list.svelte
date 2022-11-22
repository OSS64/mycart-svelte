<script>
	import { onMount } from 'svelte'
	import Cards from '../products-list/card.svelte'
	import { AppConstants } from '../../app-constants/app-config'
	import { inview } from 'svelte-inview'
	// import { baseApiUrl } from "../products-list/config.js"
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
	onMount(async () => {
		loading = true
		error = false
		try {
			let response = await fetch(
				AppConstants.apiBase + '/products?_page=1&_limit=10'
			)
			const data = await response.json()
			products = data
			products = selectedCategory
				? products.filter(
						(el) =>
							el.category
								.toUpperCase()
								.indexOf(selectedCategory.toUpperCase()) > -1
				  )
				: products
			renderData = products
			brand = Object.values(
				products.reduce((a, { features: { brand } }) => {
					a[brand] = {
						brand,
					}
					return a
				}, {})
			)
			normoreData = data?.length < 8
		} catch (e) {
			error = true
		}
		loading = false
	})
	let normoreData = true
	let fixPage = 2
	const loadMore = async () => {
		console.log('first', fixPage)
		// const response = await SearchApiService.filter({
		// 	...criteria,
		// 	page: fixPage++
		// });
		let response = await fetch(
			AppConstants.apiBase + `/products?_page=${fixPage++}&_limit=10`
		)
		const data = await response.json()
		products = [...products, ...data]
		// products = selectedCategory
		// 	? products.filter(
		// 			(el) =>
		// 				el.category.toUpperCase().indexOf(selectedCategory.toUpperCase()) >
		// 				-1
		// 	  )
		// 	: products
		renderData = [...renderData, ...data]
		brand = Object.values(
			products.reduce((a, { features: { brand } }) => {
				a[brand] = {
					brand,
				}
				return a
			}, {})
		)
		normoreData = data?.length < 8
	}
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
			// window.alert("No data to be shown");
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
	$: {
		console.log(renderData?.length < 8)
	}
</script>

<div class="row">
	<h3>Product List</h3>
</div>
<!-- <div id="dropdown">
  <select>
    {#each renderData as product}
      <option value={product}>{product.productName}</option>
    {/each}
  </select>
</div> -->
<div class="bigContainer">
	<div>
		<div class="filterHeading">
			<p>Select Brand</p>
		</div>
		<div class="container">
			{#each brand as el, i}
				<div class="checkBoxBrand">
					<input
						id={el.brand}
						type="checkbox"
						value={el.brand}
						bind:group={selectedBrand.brand}
						on:change={() => filterFunc()}
					/>
					<label for={el.brand}>{el.brand}</label>
				</div>
			{/each}
		</div>
		<div class="filterHeading">
			<p>Select Price(INR)</p>
		</div>
		<div class="rbtnContainer">
			<div class="rbtn">
				{#each pricedata as el}
					<div class="form-check">
						<input
							class="form-check-input"
							type="radio"
							name="flexRadioDefault"
							id="flexRadioDefault1"
							bind:group={price}
							value={el.text}
							on:change={filterFunc}
						/>
						<label class="form-check-label" for="flexRadioDefault1">
							{el.text}
						</label>
					</div>
				{/each}
			</div>
		</div>
	</div>
	<div>
		{#if loading}
			Loading: {loading}
		{:else if error}
			Error: {error}
		{/if}
		{#if renderData.length > 0}
			<div class="cardshow">
				<div class="row">
					{#each renderData as el, i}
						<Cards key={i} product={el} />
					{/each}
				</div>
			</div>
		{/if}
		{#if normoreData}
			No More Data
		{:else}
			<span
				use:inview={{
					rootMargin: '400px',
				}}
				on:enter={() => {
					loadMore()
				}}
			/>
			<div class="py-4">
				<h4 class="text-center">loading..</h4>
			</div>
		{/if}
	</div>
</div>

<!-- {#if normoreData}
				<div class="p-3 mb-12">
					<div>
						<h4 class="text-center text-xs font-semibold text-black">
							{Constant.NO_DATA_FOUND}
						</h4>
						<h4 class="text-xs text-gray-500  float-right mr-2 mb-2">― Coco Chanel</h4>
					</div>
				</div>
			{:else}
				<span
					use:inview={{
						rootMargin: '400px'
					}}
					on:enter={() => {
						loadMore();
					}}
				/>
				<div class="py-4">
					<h4 class="text-center">loading..</h4>
				</div>
			{/if} -->
<style>
	.cardshow {
		display: flex;
	}
	#dropdown {
		display: block;
		width: 300px;
		max-width: 100%;
		margin-left: 270px;
	}
	.checkBoxBrand {
		text-align: left;
		margin-left: 30px;
	}
	label {
		display: inline;
	}
	h3 {
		color: grey;
		margin-top: 20px;
		margin-bottom: 20px;
	}
	.rbtn {
		display: inline-block;
	}
	.bigContainer {
		display: grid;
		grid-template-columns: 20% 80%;
	}
	.rbtnContainer {
		text-align: left;
		margin-left: 30px;
	}
	.filterHeading {
		font-weight: 500;
		text-align: center;
		margin-bottom: 30px;
		margin-top: 30px;
		background-color: rgb(247, 247, 247);
		border-radius: 5px;
		margin-left: 30px;
		margin-right: 30px;
		box-shadow: 0 0 25px rgba(0, 0, 0, 0.25);
	}
	.noData {
		display: none;
		visibility: hidden;
	}
</style>
