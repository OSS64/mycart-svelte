<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	let selectedCoupon = '';
	const dispatch = createEventDispatcher();
	/**
	 * Execute applycoupon method from the parent component, on submit
	 * of the coupon form.
	 */
	const handleSubmit = () => {
		dispatch('applycoupon', { selectedCoupon });
	};
</script>

<form class="couponForm" on:submit|preventDefault={handleSubmit}>
	<input
		type="text"
		name="code"
		title="enter a couponCode"
		maxlength="20"
		bind:value={selectedCoupon}
	/>
	<button class="btn btn-primary btn2">Apply coupon</button>
</form>

<style lang="scss">
	.couponForm {
		display: flex;
		column-gap: 10px;
		input {
			padding: 8px 8px;
			font-size: small;
		}
	}
	@media (max-width: 768px) {
		.couponForm {
			flex-direction: column;
			row-gap: 10px;
			.btn2 {
				width: 100%;
			}
		}
	}
</style>
