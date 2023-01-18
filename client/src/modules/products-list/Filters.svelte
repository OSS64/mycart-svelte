<script lang="ts">
  import { createEventDispatcher } from "svelte";
  export let selectedBrand = [];
  export let brands = [];
  export let price = "";
  export let pricedata = [];
  const dispatch = createEventDispatcher();
</script>

<div class="facets">
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

<style lang="scss">
  @import "./filters.scss";
</style>
