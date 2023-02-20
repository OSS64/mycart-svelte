<script lang="ts">
  import { onMount } from "svelte";
  import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
    Icon,
  } from "sveltestrap";
  import { navigate } from "svelte-routing";
  import { Confirm } from "svelte-confirm";
  import { cart } from "../../store/cart.store";
  import { authStore, logout } from "../../store/auth.store";
  import { Utility } from "../utilities/utility";

  let isOpen = false;
  $: cartItemsCount = $cart.reduce((sum, item) => sum + item.quantity, 0);

  let user: any = null;
  let isAuthonicated: boolean = false;

  function navCollapseOpener(e: CustomEvent) {
    isOpen = e.detail.isOpen;
  }

  /**
   * Different way to subscribe svelte store.
   * Display login link, if user is not authenticated.
   */
  authStore.subscribe((res: any) => {
    user = res.user;
    isAuthonicated = res.isAuthenticated;
  });

  /**
   * If somehow page get loaded, then there will be no svelte storage data,
   * so cart count may display 0, in spite of having cart item in session storage.
   * It will check sessionstorage, if svelte cart store does not have any item.
   */
  onMount(() => {
    if (cartItemsCount <= 0) {
      Utility.loadCartFromStorage();
    }
  });
</script>

<div class="app-navbar stickyAtTop">
  <Navbar color="light" light expand="md" class="custom-navbar shadow-sm">
    <NavbarToggler on:click={() => (isOpen = !isOpen)} />
    <Collapse {isOpen} navbar expand="md" on:update={navCollapseOpener}>
      <Nav class="ms-auto" navbar>
        <!-- <NavItem class="mlmr-3">
          <NavLink disabled>Solutions</NavLink>
        </NavItem> -->
        <NavItem class="mlmr-3">
          <NavLink href="javascript:void(0)" on:click={() => navigate("/products-list")}>Products</NavLink>
        </NavItem>
        <NavItem class="mlmr-3">
          <NavLink disabled>Services</NavLink>
        </NavItem>
        <NavItem class="mlmr-3">
          <NavLink disabled>Support</NavLink>
        </NavItem>
        <NavItem class="mlmr-3">
          <NavLink disabled>Offers</NavLink>
        </NavItem>
        <NavItem class="mlmr-3">
          <NavLink disabled>About</NavLink>
        </NavItem>
        <NavItem class="mlmr-3">
          <NavLink
            href="javascript:void(0)"
            on:click={() => navigate("/contact")}>Contact Us</NavLink
          >
        </NavItem>
        <NavItem class="mlmr-3">
          <NavLink >{user?.email}</NavLink>
        </NavItem>
        <NavItem class="mlmr-3">
          {#if isAuthonicated}
            <Confirm
              confirmTitle="Confirm"
              cancelTitle="Cancel"
              let:confirm={confirmThis}
            >
              <NavLink
                on:click={() => {
                  confirmThis(() => {
                    logout();
                  });
                }}
                >Log out
                <!-- <img class="px-icn" src="/log-out.png" alt="" /> -->
              </NavLink>
              <span slot="title"> Are you sure to logout?</span>
              <span slot="description">
                You will be logged out from the system.
              </span>
            </Confirm>
          <!-- {:else}
            <NavLink>Login</NavLink>-->
          {/if}
        </NavItem>
        <NavItem class="mlmr-3">
          <NavLink href="javascript:void(0)" on:click={() => navigate("/cart")}
            ><Icon name="cart3" />
            <span class="badge badge-warning" id="lblCartCount">
              {cartItemsCount}
            </span>
           
          </NavLink>
        </NavItem>
      </Nav>
    </Collapse>
  </Navbar>
</div>

<style lang="scss">
  @import "./navbar.scss";
</style>
