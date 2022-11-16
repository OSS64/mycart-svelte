<script>
	import { Col, Row } from 'sveltestrap'
	import { Swiper, SwiperSlide } from 'swiper/svelte'
	import '../product-details/swiper.css'
	import 'swiper/css'
	import 'swiper/css/free-mode'
	import 'swiper/css/navigation'
	import 'swiper/css/thumbs'
	import { FreeMode, Navigation, Thumbs } from 'swiper'
	import { onMount } from 'svelte'
	import { cart } from '../../store/cart.store'
	import {
		Button,
		Card,
		CardBody,
		CardFooter,
		CardHeader,
		CardSubtitle,
		CardText,
		CardTitle,
	} from 'sveltestrap'
	import { CartStore } from '../../store'
	let product
	let imgUrl = null
	// let productQuantity = 0;
	const arr = [
		'./content/images/item1.jpg',
		'./content/images/item2.jpg',
		'./content/images/item3.jpg',
		'./content/images/item1.jpg',
		'./content/images/item2.jpg',
		'./content/images/item3.jpg',
	]
	let thumbsSwiper = null
	const setThumbsSwiper = (e) => {
		const [swiper] = e.detail
		thumbsSwiper = swiper
	}
	let pageLoading = true
	const urlParams = new URLSearchParams(window.location.search)
	const productId = urlParams.get('productId')
	onMount(async () => {
		const productResponse = await fetch(
			'http://localhost:3000/products/' + productId
		)
		product = await productResponse.json()
		imgUrl = product.imageUrl
	})
	let productQuantity = 1
	let isAlreadyInCart = false
	CartStore.store.subscribe((res) => {
		const currentProduct = res?.find((item) => item?.id === productId)
		if (currentProduct) {
			productQuantity =
				currentProduct?.quantity == 0 ? 1 : currentProduct?.quantity
			isAlreadyInCart = true
		}
	})
	onMount(() => {})
	function addItemToCart() {
		CartStore.updateCartQuantity(product, productQuantity)
	}
	function minusItem() {
		if (productQuantity > 1) {
			productQuantity--
		}
	}
	function plusItem() {
		productQuantity = productQuantity + 1
	}
	function openThumbnail(imageName) {
		imgUrl = imageName
	}
</script>

<Row cols={{ lg: 2, md: 1, sm: 1 }}>
	<Col lg="4">
		<div class="thumbnailBanner">
			<Swiper
				spaceBetween={10}
				navigation={true}
				thumbs={{ swiper: thumbsSwiper }}
				modules={[FreeMode, Navigation, Thumbs]}
				class="mySwiper2"
			>
				<SwiperSlide>
					<img src={imgUrl} alt={product?.features?.modelName} />
				</SwiperSlide>
			</Swiper>
			<Swiper
				on:swiper={setThumbsSwiper}
				spaceBetween={10}
				slidesPerView={4}
				freeMode={true}
				watchSlidesProgress={true}
				modules={[FreeMode, Navigation, Thumbs]}
				class="mySwiper"
			>
				{#each arr as i}
					<SwiperSlide>
						<img
							on:click={() => openThumbnail(i)}
							src={i}
							alt={product?.features?.modelName}
						/>
					</SwiperSlide>
				{/each}
			</Swiper>
		</div>
	</Col>
	<Col lg="8">
		<div class="descriptionDetails">
			<Card class="mb-3">
				<CardHeader>
					<CardTitle
						>{product?.features?.modelName}
						{product?.features?.brand}</CardTitle
					>
				</CardHeader>
				<CardBody>
					<CardSubtitle>{product?.productName}</CardSubtitle>
					<CardText>
						{product?.shortDescription}<br />
						{product?.description}<br />
						Screen Size: {product?.features?.screenSize}<br />
						Colour: {product?.features?.colour}<br />
						Hard Disk: {product?.features?.hardDisk}<br />
						CPU Model: {product?.features?.cpuModel}<br />
						RAM Memory: {product?.features?.ramMemory}<br />
						Operating System: {product?.features?.operatingSystem}<br />
						Special Feature: {product?.features?.specialFeature}<br />
						Graphics Card: {product?.features?.graphicsCard}
					</CardText>
					<CardText><strong>Price: ₹{product?.price}</strong></CardText>
					Quantity:
					<Button on:click={() => plusItem()}>+</Button>
					{productQuantity}
					<Button on:click={() => minusItem()}>-</Button>
				</CardBody>
				<CardFooter
					><Button
						on:click={() => {
							addItemToCart()
							console.log('add to cart')
						}}
					>
						Add to Cart
					</Button>
				</CardFooter>
			</Card>
		</div>
	</Col>
</Row>

<style lang="scss">
	@import './details.scss';
</style>
