<script lang="ts">
  import Footer from "../shared/footer/footer.svelte";
  import Header from "../shared/header/header.svelte";
  import Navbar from "../shared/navbar/navbar.svelte";
</script>

<div class="container-fluid">
  <Header />
  <Navbar />
  <main>
    <slot />
  </main>
  <Footer />
</div>
