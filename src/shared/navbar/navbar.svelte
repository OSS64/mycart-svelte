<style lang="scss">
  @import "./navbar.scss";
</style>
<script lang="ts">
  import {Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink, Icon} from 'sveltestrap';
  import { navigate } from "svelte-routing";
  import { cart } from "../../store/cart.store";
  let cartItemsCount = 0;
  let isOpen = false;  
  $:cartItemsCount =  $cart.reduce((sum, item) => sum + item.quantity, 0);
  function navCollapseOpener(event) {
    isOpen = event.detail.isOpen;
  }
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
          <NavLink disabled>Login</NavLink>
        </NavItem>
        <NavItem class="mlmr-3">
          <NavLink on:click={() => navigate("/cart")}><Icon name="cart3"/>
            <span class='badge badge-warning' id='lblCartCount'> 
              <!-- {#if cartItemsCount > 0} -->
                  { cartItemsCount }
              <!-- {/if} -->
            </span>
          </NavLink>
        </NavItem>
      </Nav>
    </Collapse>
  </Navbar>
</div>