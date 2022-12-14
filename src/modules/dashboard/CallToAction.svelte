<script>
	const bgUrl =
		'https://images.unsplash.com/photo-1527356900876-cae61d8d8462?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2076&q=80'
</script>

<div class="cta" style="background-image: url({bgUrl});">
	<h2 class="title">Get started with Our Products</h2>
	<h5 class="sub-title">
		You can start by selecting a category from the list below.
	</h5>
</div>

<style>
	.cta {
		min-height: 300px;
		background-position: bottom left;
		position: relative;
		background-size: auto;
		background-attachment: fixed;
		background-position: center;
		background-repeat: no-repeat;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #fff;
		flex-direction: column;
		position: relative;
		z-index: 1;
	}
	.cta:after {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		height: 100%;
		width: 100%;
		background: #000;
		z-index: -1;
		opacity: 0.2;
	}
	.title {
		font-size: 40px;
		font-weight: bold;
		margin-bottom: 15px;
	}
</style>
