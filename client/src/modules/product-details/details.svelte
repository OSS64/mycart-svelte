<script lang="ts">
	import { onMount } from 'svelte';
	import { navigate } from 'svelte-routing';
	import {
		Button,
		Card,
		CardBody,
		CardFooter,
		CardHeader,
		CardSubtitle,
		CardText,
		CardTitle,
		Col,
		Row,
	} from 'sveltestrap';
	import { FreeMode, Navigation, Thumbs } from 'swiper';
	import 'swiper/css';
	import 'swiper/css/free-mode';
	import 'swiper/css/navigation';
	import 'swiper/css/thumbs';
	import { Swiper, SwiperSlide } from 'swiper/svelte';
	import { AppConstants } from '../../app-constants/app-config';
	import { Utility } from '../../shared/utilities/utility';
	import { cart } from '../../store/cart.store';
	import './swiper.scss';
	import { productStore } from './../../store/product.store';
	import { snackbarStore } from '../../store/snackbar.store';

	let imgUrl = null;
	let productQuantity = 0;
	let productDetails = null;

	/**
	 * List of thumbnails used in swiper slide.
	 */
	const arr = [
		'/content/images/item1.jpg',
		'/content/images/item2.jpg',
		'/content/images/item3.jpg',
		'/content/images/item1.jpg',
		'/content/images/item2.jpg',
		'/content/images/item3.jpg',
	];

	let thumbsSwiper = null;

	/**
	 * Display main image, on click of thumbnail in slider.
	 * @param e
	 */
	const setThumbsSwiper = (e: CustomEvent) => {
		const [swiper] = e.detail;
		thumbsSwiper = swiper;
	};

	/**
	 * Prepare header required for API call.
	 */
	const requestHeader: RequestInit = {
		headers: { Authorization: Utility.getToken() },
	};

	/**
	 * Get product id from the browser's url.
	 */
	const urlParams = new URLSearchParams(window.location.search);
	const productId = urlParams.get('productId');

	/**
	 * Execute on component's initialisation.
	 */
	export const callOnLoad = async () => {
		/**
		 * Call API if svelte productStore is empty
		 * and set productStore.
		 */
		if ($productStore.length === 0) {
			await fetch(AppConstants.apiBase + '/products', requestHeader)
				.then((data) => {
					return data.json();
				})
				.then((result) => {
					if (Array.isArray(result)) {
						result = Utility.updateImageUrl(result);
						productStore.set(result);
						getProduct();
					} else {
						snackbarStore.set({
							isOpen: true,
							toastMessage: 'we encountered some problems',
							resStatus: 'Please try again later',
						});
					}
				});
		} else {
			/**
			 * If svelte productStore is not empty, then filter product
			 * from productStore.
			 */
			getProduct();
		}
	};

	/**
	 * Prepare productDetails.
	 */
	const getProduct = () => {
		/**
		 * Get product from svelte productStore
		 */
		productDetails = $productStore
			.filter((prod) => prod._id === productId)
			.at(0);

		/**
		 * If product exists in svelte cart store, then
		 * product fetch from cart store.
		 */
		$cart.forEach(function (prod) {
			if (prod._id == productDetails._id) {
				productDetails = prod;
			}
		});

		/**
		 * Add product's thumbnail image in swiper slide.
		 */
		imgUrl = productDetails.imageUrl;
		arr.push(imgUrl);

		initialisingQty();
	};

	/**
	 * Execute on component's initialization.
	 */
	onMount(callOnLoad);

	/**
	 * If product doesn't have quantity attribute, set quantity = 1 and display
	 * If product already added to cart, then that quantity display in PDP page.
	 */
	function initialisingQty() {
		productDetails['quantity'] = productDetails.hasOwnProperty('quantity')
			? productDetails['quantity']
			: 1;
		productQuantity = productDetails['quantity'];
	}

	/**
	 * Add product to svelte cart store.
	 */
	function addItemToCart() {
		/**
		 * Check whether product is present in cart store or not
		 */
		let existingItems = $cart.some((prod) => prod._id == productDetails._id);

		/**
		 * If product is not present in cart store, then add product to cart store.
		 */
		if (!existingItems) {
			$cart = [...$cart, productDetails];
		} else {
			/**
			 * If product is present in cart store, then
			 */
			$cart.forEach(function (prod) {
				if (prod._id == productDetails._id) {
					prod['quantity'] = productDetails.quantity;
				}
			});
		}
		/**
		 * Same as cart.set($cart)
		 */
		$cart = $cart;

		/**
		 * Set cart store to sessionstorage, so that on page refresh,
		 * we can show products added to cart, and cart quantity at navbar.
		 */
		Utility.setSession('cartdata', $cart);
	}

	/**
	 * execute on click of "-" button in PDP page and
	 * display number in DOM
	 */
	function minusItem() {
		if (productDetails.quantity != 0) {
			productDetails.quantity -= 1;
			productQuantity = productDetails.quantity;
		}
	}

	/**
	 * execute on click of "+" button in PDP page and
	 * display number in DOM
	 */
	function plusItem() {
		if (productDetails.quantity < 10) {
			productDetails.quantity += 1;
			productQuantity = productDetails.quantity;
		}
	}

	/**
	 * Set slider image path to display in banner area
	 * on click of swiper slideer.
	 * @param imageName - image path
	 */
	function openThumbnail(imageName: string) {
		imgUrl = imageName;
	}
</script>

{#if productDetails?._id}
	<Row cols={{ md: 1, sm: 1 }}>
		<Col lg="5">
			<div class="thumbnailBanner">
				<Swiper
					spaceBetween={10}
					navigation={true}
					thumbs={{ swiper: thumbsSwiper }}
					modules={[FreeMode, Navigation, Thumbs]}
					class="mySwiper2"
				>
					<SwiperSlide>
						<img src={imgUrl} alt={productDetails?.features?.modelName} />
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
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<img
								on:click={() => openThumbnail(i)}
								src={i}
								alt={productDetails?.features?.modelName}
							/>
						</SwiperSlide>
					{/each}
				</Swiper>
			</div>
		</Col>
		<Col lg="7">
			<div class="descriptionDetails">
				<Card class="mb-3">
					<CardHeader>
						<CardTitle
							>{productDetails?.features?.modelName}
							{productDetails?.features?.brand}</CardTitle
						>
					</CardHeader>
					<CardBody>
						<CardSubtitle>{productDetails?.productName}</CardSubtitle>
						<CardText>
							{productDetails?.shortDescription}<br />
							{productDetails?.description}<br />
							Screen Size: {productDetails?.features?.screenSize}<br />
							Colour: {productDetails?.features?.colour}<br />
							Hard Disk: {productDetails?.features?.hardDisk}<br />
							CPU Model: {productDetails?.features?.cpuModel}<br />
							RAM Memory: {productDetails?.features?.ramMemory}<br />
							Operating System: {productDetails?.features?.operatingSystem}<br
							/>
							Special Feature: {productDetails?.features?.specialFeature}<br />
							Graphics Card: {productDetails?.features?.graphicsCard}
						</CardText>
						<CardText><strong>Price: ₹{productDetails?.price}</strong></CardText
						>
						Quantity:
						<Button on:click={() => plusItem()}>+</Button>
						{productQuantity}
						<Button on:click={() => minusItem()}>-</Button>
					</CardBody>
					<CardFooter
						><Button on:click={() => addItemToCart()}>Add to Cart</Button>
					</CardFooter>
				</Card>
			</div>
		</Col>
	</Row>
{:else}
	<div class="noProduct">
		<div class="no-product-inner">
			<h1>No Product Found</h1>
			<Button on:click={() => navigate('/')}>Go Back</Button>
		</div>
	</div>
{/if}

<style lang="scss">
	@import './details.scss';
</style>
