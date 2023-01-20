<script lang="ts">
    import { Icon } from "sveltestrap";
    import { Link } from "svelte-routing";
</script>

<div class="vertical-center">
    <div class="container">
        <div id="notfound" class="text-center ">
            <h1>😮</h1>
            <h2>Oops! Page Not Be Found</h2>
            <p>Sorry but the page you are looking for does not exist. Please go back to :</p>
            <Link to="/"
                ><Icon name="shop" />&nbsp;<strong>MyCart.com</strong></Link
            >
        </div>
    </div>
</div>
