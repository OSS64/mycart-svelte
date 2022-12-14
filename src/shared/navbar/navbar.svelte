<script lang="ts">
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
  let cartItemsCount = 0;
  let isOpen = false;
  $: cartItemsCount = $cart.reduce((sum, item) => sum + item.quantity, 0);
  function navCollapseOpener(event) {
    isOpen = event.detail.isOpen;
  }
  let user: any = null;
  let isAuthonicated: boolean = false;
  authStore.subscribe((res: any) => {
    user = res.user;
    isAuthonicated = res.isAuthenticated;
  });
</script>

<div class="app-navbar stickyAtTop">
  <Navbar color="light" light expand="md" class="custom-navbar shadow-sm">
    <NavbarToggler on:click={() => (isOpen = !isOpen)} />
    <Collapse {isOpen} navbar expand="md" on:update={navCollapseOpener}>
      <Nav class="ms-auto" navbar>
        <NavItem class="mlmr-3">
          <NavLink disabled>Solutions</NavLink>
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
          <NavLink on:click={() => navigate("/contact/*")}>Contact Us</NavLink>
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
                >{user?.email}
                <img class="px-icn" src="/log-out.png" alt="" />
              </NavLink>
              <span slot="title"> Are you sure to logout?</span>
              <span slot="description">
                You will be logged out from the system.
              </span>
            </Confirm>
          {:else}
            <NavLink>Login</NavLink>
          {/if}
        </NavItem>
        <NavItem class="mlmr-3">
          <NavLink on:click={() => navigate("/cart")}
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