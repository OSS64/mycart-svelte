<script>
	import { createEventDispatcher } from "svelte";
	export let selectedBrand;
	export let brands;
	export let price;
	export let pricedata;
	const dispatch = createEventDispatcher();
</script>

<div>
	<div class="filterHeading">
		<p>Select Brand</p>
	</div>
	<div class="container">
		{#each brands as el}
			<div class="checkBoxBrand">
				<input
					id={el.brand}
					type="checkbox"
					value={el.brand}
					bind:group={selectedBrand}
					on:change={() => dispatch("filter")}
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
						on:change={() => dispatch("filter")}
					/>
					<label class="form-check-label" for="flexRadioDefault1">
						{el.text}
					</label>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
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
	/* h3 {
		color: grey;
		margin-top: 20px;
		margin-bottom: 20px;
	} */
	.rbtn {
		display: inline-block;
	}
	/* .bigContainer {
		display: grid;
		grid-template-columns: 20% 80%;
	} */
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
	:global(#card-cls .card-body) {
		text-align: center;
	}
</style>
