<style lang="scss">
    @import "./header.scss";
</style>

<script lang="ts">
    import { Icon } from 'sveltestrap';
    import { navigate } from "svelte-routing";
</script>
<header class="navbar navbar-dark" style="padding:10px 0;">
    <h1>
        <a class="title noselect" on:click={() => navigate("/")}><Icon name="shop"/>&nbsp;<strong>MyCart.com</strong></a>
        <!-- <a class="title noselect" on:click={() => navigate("/")}><img src="./content/images/logo.png" alt="Logo">&nbsp;<strong>MyCart.com</strong></a> -->
    </h1>
</header>

  