<script lang="ts">
  import { Icon } from "sveltestrap";
  import { Link } from "svelte-routing";
</script>

<header class="navbar navbar-dark">
  <h1>
    <Link to="/"><Icon name="shop" />&nbsp;<strong>MyCart.com</strong></Link>
  </h1>
</header>

<style lang="scss">
  @import "./header.scss";
</style>
