<script lang="ts">
  import {
    cart,
    maxquantity,
    minquantity,
    totalPrice,
  } from "../../store/cart.store";
  import { onMount, onDestroy } from "svelte";
  import { Utility } from "../../shared/utilities/utility";
  import Coupon from "../coupon/coupon.svelte";
  import { fade, fly } from "svelte/transition";
  import { couponStore } from "./../../store/coupon.store";

  let payableAmount = 0;
  let selectedCoupon = "";
  let codeList = [];
  let validCoupon = null;
  let totalPriceAfterApplyingCoupon = 0;

  /**
   * Call on component's initialization.
   */
  onMount(async () => {
    /**
     * If there is product in session storage, then populate products
     * from session storage in cart store.
     */
    Utility.loadCartFromStorage();

    /**
     * Populates coupon from svelte coupon store
     */
    codeList = $couponStore;
  });

  /**
   * Subscribe totalPrice from svelte store and assign it to a local variable.
   */
  const unsubscribe = totalPrice.subscribe((value) => {
    payableAmount = value;
  });

  /**
   * one of Life Cycle hooks in svelte, which is called when component is
   * unmounted/unrendered
   */
  onDestroy(() => {
    unsubscribe();
  });

  /**
   * Executes when coupon form is getting submitted from child component,
   * and display discounted price
   * @param event
   */
  export const applyCoupon = (event: {
    detail: { selectedCoupon: string };
  }) => {
    validCoupon = null;
    selectedCoupon = event.detail.selectedCoupon;
    for (let coupon of codeList) {
      if (selectedCoupon.trim() === coupon.couponCode.trim()) {
        validCoupon = coupon;
        totalPriceAfterApplyingCoupon =
          $totalPrice - $totalPrice * (coupon.discountPercent / 100);
      }
    }
  };

  /**
   * Executes on click of "+" button of a product.
   * Update quantity attribute of the product and assign to cart store.
   * Then update entire cart store to the session storage, so that on page refresh
   * all items in cart display properly.
   * @param product
   */
  function plusItem(product: { _id: any }) {
    for (let item of $cart) {
      if (item._id === product._id) {
        if (item["quantity"] < $maxquantity) {
          item["quantity"] += 1;
        }
      }
    }
    cart.set($cart);
    Utility.setSession("cartdata", $cart);
  }

  /**
   * Executes on click of "+" button of a product.
   * Functionality same as plusItem method.
   * @param product
   */
  function minusItem(product: { _id: any }) {
    for (let item of $cart) {
      if (item._id === product._id) {
        if (item["quantity"] > $minquantity) {
          item["quantity"] -= 1;
        }
      }
    }
    cart.set($cart);
    Utility.setSession("cartdata", $cart);
  }

  /**
   * Removes product from the cart store and update session storage.
   * @param id - product id
   */
  function deleteItem(id: string) {
    $cart = $cart.filter(function (item) {
      return item._id !== id;
    });
    cart.set($cart);
    Utility.setSession("cartdata", $cart);
  }
</script>

<!-- Update page title of the Cart Page -->
<svelte:head>
  <title>cart items</title>
</svelte:head>

<div class="shopping-cart">
  {#if $cart.length === 0}
    <div class="message">
      <p>No items in cart yet.</p>
    </div>
  {:else}
    {#each $cart as item}
      <div transition:fly class="shadow cart-item">
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
                  on:click={() => deleteItem(item._id)}
                >
                  Delete
                </button>
              </div>
              <p>
                SubTotal : {Utility.formatNumber.format(
                  Number(item.price.toString().replaceAll(",", "")) *
                    item.quantity
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    {/each}
    <div class="total">
      <h4>Total Price: {Utility.formatNumber.format(payableAmount)}</h4>
      {#if validCoupon}
        <h4 transition:fade>
          Discount Price : {Utility.formatNumber.format(
            totalPriceAfterApplyingCoupon
          )}
        </h4>
        <span class="discount" transition:fade>
          at {validCoupon.discountPercent} % discount !
        </span>
      {:else if selectedCoupon}
        <span class="discount" transition:fade> Invalid Coupon</span>
      {:else}
        <span class="discount" />
      {/if}
    </div>
    <div class="btns">
      <div class="coupon">
        <Coupon on:applycoupon={applyCoupon} />
      </div>
      <button class="btn btn-primary">Checkout</button>
    </div>
  {/if}
</div>

<style lang="scss">
  @import "./cart.scss";
</style>
