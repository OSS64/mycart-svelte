<script>
	import { cart } from '../../store/cart.store'
	import { onMount, afterUpdate } from 'svelte'
	import { CartStore } from '../../store'
	$: payableAmount = 0
	let selectedCoupon = ''
	let codeList = []
	let totalCartValue = 0
	let validCoupon = false
	let totalPriceAfterApplyingCoupon = 0
	const formatter = new Intl.NumberFormat('en-IN', {
		style: 'currency',
		currency: 'INR',
	})
	onMount(async () => {
		let couponCodeItems = await fetch('http://localhost:3000/coupon')
		codeList = await couponCodeItems.json()
		payableAmount = totalCartValue
	})
	afterUpdate(() => {
		payableAmount = totalCartValue
		validCoupon = false
		for (let coupon of codeList) {
			if (selectedCoupon.trim() === coupon.couponCode.trim()) {
				validCoupon = coupon
				totalPriceAfterApplyingCoupon =
					totalCartValue - totalCartValue * (coupon.discountPercent / 100)
			}
		}
	})
	let cartItems = []
	let totalCartItems = 0
	CartStore.store.subscribe((res) => {
		cartItems = res
		const total = res.reduce((sum, item) => {
			return sum + Number(item.price.replaceAll(',', '')) * item.quantity
		}, 0)
		totalCartValue = total
		payableAmount = total
	})
	function plusItem(product) {
		CartStore.addToCart(product)
	}
	function minusItem(product) {
		CartStore.removeFromCart(product)
	}
	function deleteItem(item) {
		CartStore.clearItemFromCart(item)
	}
</script>

<div class="shopping-cart">
	{#if cartItems?.length == 0}
		<div class="message">
			<p>No items in cart yet.</p>
		</div>
	{:else}
		{#each cartItems as item}
			<div class="shadow cart-item">
				<div class="row">
					<div class="image col-lg-3">
						<img width="200" src={item.imageUrl} alt="laptop" />
					</div>
					<div class="col-lg-6">
						<div class="details">
							<span class="cart-item-brand">{item.features.brand}</span>
							<p class="cart-item-model">
								{item.features.modelName}
							</p>
							<p class="cart-item-desc">
								{item.shortDescription}
							</p>
						</div>
					</div>
					<div class="col-lg-3">
						<div class="price">
							<div class="buttons">
								<button
									class="plusbtn btn btn-secondary"
									on:click={() => plusItem(item)}
								>
									+
								</button>
								<p>{item.quantity}</p>
								<button
									class="btn btn-secondary"
									on:click={() => minusItem(item)}
								>
									-
								</button>
								<button
									class="btn btn-danger"
									on:click={() => deleteItem(item)}
								>
									Delete
								</button>
							</div>
							<p>
								SubTotal : {formatter.format(
									Number(item.price.replaceAll(',', '')) * item.quantity
								)}
							</p>
						</div>
					</div>
				</div>
			</div>
		{/each}
		<div class="total">
			<h4>Total Price: {formatter.format(payableAmount)}</h4>
			{#if validCoupon}
				<h4>
					Discount Price : {formatter.format(totalPriceAfterApplyingCoupon)}
				</h4>
				<span class="discount">
					at {validCoupon.discountPercent} % discount !
				</span>
			{:else if selectedCoupon}
				<span class="discount"> Invalid Coupon</span>
			{:else}
				<span class="discount" />
			{/if}
		</div>
		<div class="btns">
			<div class="coupon">
				<input
					type="text"
					name="code"
					title="enter a couponCode"
					maxlength="20"
					bind:value={selectedCoupon}
					placeholder="Enter Coupon Code"
				/>
			</div>
			<button class="btn btn-primary btn1">Checkout</button>
		</div>
	{/if}
</div>

<style lang="scss">
	@import './cart.scss';
</style>
