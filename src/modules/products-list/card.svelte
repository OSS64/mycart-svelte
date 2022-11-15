<script>
	import { navigate } from 'svelte-routing'
	import {
		Button,
		Card,
		CardBody,
		CardHeader,
		CardSubtitle,
		CardText,
		CardTitle,
		Figure,
		Image,
	} from 'sveltestrap'
	import './card.scss'
	export let product
	let key

	console.log('d2381038210')
</script>

<Card
	class="shadow mb-3 jjjjjjjjjjj879798"
	style="width:300px; margin-left: 50px; "
>
	<CardHeader>
		<CardTitle>{product.features.brand}</CardTitle>
	</CardHeader>
	<CardBody>
		<Figure>
			<Image
				fluid
				alt="product-image"
				src={product.imageUrl}
				style="height:120px;width:120px"
			/>
		</Figure>
		<CardSubtitle style="margin-bottom:10px"
			>{product.features.modelName}</CardSubtitle
		>
		<CardSubtitle class="px-card-subtitle">{'₹' + product.price}</CardSubtitle>
		<CardText class="px-card-txt" style="padding-top:10px;height:190px;">
			{product.shortDescription}
		</CardText>
		<Button on:click={() => navigate('/details?productId=' + product.id)}
			>Details</Button
		>
	</CardBody>
</Card>

<style>
</style>
