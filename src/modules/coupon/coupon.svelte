<script>
	import { createEventDispatcher } from "svelte";

	let selectedCoupon = "";

	const dispatch = createEventDispatcher();

	const handleSubmit = () => {
		dispatch("applycoupon", { selectedCoupon });
	};
</script>

<form on:submit|preventDefault={handleSubmit}>
	<input
		type="text"
		name="code"
		title="enter a couponCode"
		maxlength="20"
		bind:value={selectedCoupon}
	/>
	<button class="btn btn-primary btn2">Apply coupon</button>
</form>

<style>
	input {
		padding: 8px 8px;
		font-size: small;
	}
	.btn2 {
		margin-left: 10px;
	}
</style>
