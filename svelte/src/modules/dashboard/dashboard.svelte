<script lang="ts">
  import { onMount } from "svelte";
  import Carousel from "./carousel.svelte";
  import { Alert } from "sveltestrap";
  import { navigate } from "svelte-routing";
  import Parallax from "./parallax-effect.svelte";
  import { categoryStore, prodStore } from "./../../store/product.store";
  import { getCategories } from "../../services/products.services";
  import Errormodal from "../../shared/utilities/errormodal.svelte";

  let categoryList: string[] = [];
  let selectedCategory = "";
  let showAlert = false;
  let message = "";



  /**
   * Execute as soon as component's markup mount on DOM.
   */
  export const callOnLoad = async () => {
    /**
     * If category API is already fetched data before, it will not call it again.
     * If there is no data in categoryStore, it will call API
     * and set data in categoryStore.
     */
    if (!prodStore.hasCategory) {
      let result = await getCategories();
      console.log(result);
      if (result.hasOwnProperty("message")) {
      } else {
        categoryList = result;
      }
    } else {
      /**
       * Execute if there is categories in categoryStore.
       */
      categoryList = $categoryStore;
    }
  };

  /**
   * Call on component's initialization
   */
  onMount(callOnLoad);

  /**
   * Execute on click of Search button, and it navigates to PLP page
   * with the selected category in url.
   */
  function handleSearch() {
    if (selectedCategory != "") {
      navigate("/products-list?category=" + selectedCategory);
    } else {
      /**
       * Display an alert message if category is not selected from the dropdown
       * and remove it after 3 secs.
       */
      message = "Please select a category.";
      showAlert = true;
      setTimeout(() => (showAlert = false), 3000);
    }
  }
</script>

<div class="dashboard">
  <Alert isOpen={showAlert} color="warning" fade={true} dismissible
    >{message}</Alert
  >
  <div class="m-large">
    <div class="form-inline category-list-wrapper">
      <div class="form-group">
        <div class="input-group">
          <select
            bind:value={selectedCategory}
            class="form-select "
            aria-label=""
            data-size="5"
          >
            <option disabled value="">Please select a category</option>
            {#each categoryList as category}
              <option value={category}>{category}</option>
            {/each}
          </select>
          <button type="button" on:click={handleSearch} class="btn btn-theme"
            >Search</button
          >
        </div>
      </div>
    </div>
    <div class="content-placeholder mt25 cust-carousel">
      <Carousel />
    </div>
    <div class="description">
      <p>
        This is a micro e-commerce website where the portal invites you to visit
        their inventory and select products from a list of electronic hardwares
        and devices. The website is a classic demonstration of how to help meet
        the needs of a customer using a micro e-commerce platform. Every user
        has his own unique requirements and the application tries to deliver a
        match for every customer.
      </p>
      <p>
        This e-commerce portal provides many easy to use features. A user can
        filter from the list of products by selecting a specific category on the
        dashboard. Further, more optional filters are available in the product
        list screen. All the products are displayed in a set of cards fashion
        with short description. A user can add any number of products to the
        cart from the list. The user can see the number of items in the cart at
        the top-right corner, on the cart icon.
      </p>
      <p>
        When a user clicks on a particular card of product, the user is
        navigated to the product details screen. A complete description of the
        selected item is displayed.
      </p>
    </div>
    <Parallax />
  </div>
</div>

<style lang="scss">
  @import "./dashboard.scss";
</style>
