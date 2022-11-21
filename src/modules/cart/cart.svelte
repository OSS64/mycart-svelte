<script>
	import { cart } from "../../store/cart.store";
	import { onMount, afterUpdate } from "svelte";
	import { AppConstants } from "../../app-constants/app-config";
	import { Utility } from "../../shared/utilities/utility";

  
	$: payableAmount = 0;
	let selectedCoupon = "";
	let codeList = [];
	let totalCartValue = 0;
	let validCoupon = false;
	let totalPriceAfterApplyingCoupon = 0;

	$: totalCartValue = $cart.reduce((sum, item) => {
		return sum + Number(item.price.replaceAll(",", "")) * item.quantity;
	}, 0);

	onMount(async () => {
		initialisingQty();
		let couponCodeItems = await fetch(AppConstants.apiBase + "/coupon");
		codeList = await couponCodeItems.json();
		 payableAmount = totalCartValue;
	});

	afterUpdate(() => {
		payableAmount = totalCartValue;
		validCoupon = false;
		for (let coupon of codeList) {
			if (selectedCoupon.trim() === coupon.couponCode.trim()) {
				validCoupon = coupon;
				totalPriceAfterApplyingCoupon = totalCartValue - (totalCartValue * (coupon.discountPercent / 100));
			}
		}
	});
	
	function initialisingQty() {
		for (let product of $cart) {
			product["quantity"] = product.hasOwnProperty("quantity")
				? product["quantity"]
				: 1;
			$cart = $cart;
		}
	}

	function plusItem(product) {
		for (let item of $cart) {
			if (item.id === product.id) {
				if (item["quantity"] < 10) {
					item["quantity"] += 1;
				}
			}
		}
		$cart = $cart;
	}

	function minusItem(product) {
		for (let item of $cart) {
			if (item.id === product.id) {
				if (item["quantity"] > 1) {
					item["quantity"] -= 1;
				}
			}
		}
		$cart = $cart;
	}

	function deleteItem(id) {
		$cart = $cart.filter(function (item) {
			return item.id !== id;
		});
	}

</script>

<div class="shopping-cart">
	{#if $cart == 0}
		<div class="message">
			<p>No items in cart yet.</p>
		</div>
	{:else}
		{#each $cart as item}
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
								<button class="btn btn-secondary" on:click={() => minusItem(item)}>
									-
								</button>
								<button class="btn btn-danger" on:click={() => deleteItem(item.id)}>
									Delete
								</button>
							</div>
							<p>SubTotal : {Utility.formatNumber.format(Number(
									item.price.replaceAll(",", "")
								) * item.quantity)}
							</p>
						</div>
					</div>
				</div>
			</div>
		{/each}
		<div class="total">
			<h4> Total Price: {Utility.formatNumber.format(payableAmount)} </h4>
			{#if validCoupon}
				<h4>Discount Price : {Utility.formatNumber.format(totalPriceAfterApplyingCoupon)}</h4>
				<span class="discount"> at {validCoupon.discountPercent} % discount ! </span>
				{:else if selectedCoupon}
				<span class="discount"> Invalid Coupon</span>
				{:else}
				<span class="discount"> </span>
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
	@import "./cart.scss";
</style>
