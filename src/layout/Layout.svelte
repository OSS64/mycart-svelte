<script lang="ts">
	import Footer from '../shared/footer/footer.svelte'
	import Header from '../shared/header/header.svelte'
	import Navbar from '../shared/navbar/navbar.svelte'
</script>

<main class="container-fluid">
	<div class="app-wrapper">
		<Header />
		<Navbar />
		<div>
			<slot />
		</div>
	</div>
	<Footer />
</main>
