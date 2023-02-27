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
  import { Utility } from '../../shared/utilities/utility';
  import { cart } from '../../store/cart.store';
  import './swiper.scss';
  import { getProduct } from './../../services/products.services';
  import type { Product } from '../../models/types';
  import Loader from '../../shared/utilities/Loader.svelte';
  import { classList } from 'svelte-body';
  import { Table } from 'sveltestrap';
  import { Modal, ModalBody, ModalFooter, ModalHeader } from 'sveltestrap';
  let open = false;
  const toggle = () => (open = !open);

  let imgUrl = null;
  let productQuantity = 0;
  let productDetails: Product = null;

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
   * Get product id from the browser's url.
   */
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('productId');

  let receivedResponse = false;
  /**
   * Execute on component's initialisation.
   */
  export const callOnLoad = async () => {
    if (!Utility.hasAccess()) {
      return;
    }
    /**
     * Call products API with ID taken from browser URL
     * and display product.
     */

    let result = await getProduct(productId);
    if (!result.hasOwnProperty('message')) {
      receivedResponse = true;
      result = Utility.updateImageUrl([result]).at(0);
      displayProduct(result);
    }
  };

  /**
   * Prepare productDetails.
   */
  const displayProduct = (product: Product) => {
    /**
     * Get product from svelte productStore
     */
    productDetails = product;

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
    open = !open;
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

<svelte:body use:classList="{'page-details'}" />
{#if !receivedResponse}
  <Loader />
{:else if productDetails?._id}
  <div class="px-details">
    <Row cols="{{ md: 1, sm: 1 }}">
      <Col lg="5">
        <div class="thumbnailBanner">
          <Swiper
            spaceBetween="{10}"
            navigation="{true}"
            thumbs="{{ swiper: thumbsSwiper }}"
            modules="{[FreeMode, Navigation, Thumbs]}"
            class="mySwiper2"
          >
            <SwiperSlide>
              <img src="{imgUrl}" alt="{productDetails?.features?.modelName}" />
            </SwiperSlide>
          </Swiper>
          <Swiper
            on:swiper="{setThumbsSwiper}"
            spaceBetween="{10}"
            slidesPerView="{4}"
            freeMode="{true}"
            watchSlidesProgress="{true}"
            modules="{[FreeMode, Navigation, Thumbs]}"
            class="mySwiper"
          >
            {#each arr as i}
              <SwiperSlide>
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <img
                  on:click="{() => openThumbnail(i)}"
                  src="{i}"
                  alt="{productDetails?.features?.modelName}"
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
              <CardTitle class="px-title"
                >{productDetails?.features?.modelName}
                {productDetails?.features?.brand}</CardTitle
              >
            </CardHeader>
            <CardBody class="px-description">
              <CardText class="px-subTitle">
                <CardSubtitle>{productDetails?.productName}</CardSubtitle>
              </CardText>

              <CardText class="px-shortDescription">
                {productDetails?.shortDescription}<br />

                <Table striped class="px-features">
                  <thead>
                    <tr>
                      <th>Specifications</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <!-- <th scope="row">1</th> -->
                      <td>Screen Size</td>
                      <td>{productDetails?.features?.screenSize}</td>
                    </tr>
                    <tr>
                      <!-- <th scope="row">2</th> -->
                      <td>Colour</td>
                      <td>{productDetails?.features?.colour}</td>
                    </tr>
                    <tr>
                      <!-- <th scope="row">3</th> -->
                      <td>Hard Disk</td>
                      <td>{productDetails?.features?.hardDisk}</td>
                    </tr>
                    <tr>
                      <!-- <th scope="row">4</th> -->
                      <td>CPU Model</td>
                      <td>{productDetails?.features?.cpuModel}</td>
                    </tr>
                    <tr>
                      <!-- <th scope="row">5</th> -->
                      <td>RAM Memory</td>
                      <td>{productDetails?.features?.ramMemory}</td>
                    </tr>
                    <tr>
                      <!-- <th scope="row">6</th> -->
                      <td>Operating System</td>
                      <td>{productDetails?.features?.operatingSystem}</td>
                    </tr>
                    <tr>
                      <!-- <th scope="row">7</th> -->
                      <td>Special Feature</td>
                      <td>{productDetails?.features?.specialFeature}</td>
                    </tr>
                    <tr>
                      <!-- <th scope="row">8</th> -->
                      <td>Graphics Card</td>
                      <td>{productDetails?.features?.graphicsCard}</td>
                    </tr>
                    <tr>
                      <!-- <th scope="row">9</th> -->
                      <td>Processor</td>
                      <td>{productDetails?.description}</td>
                    </tr>
                  </tbody>
                </Table>
              </CardText>
              <CardText
                ><strong
                  >Price: {Utility.formatNumber.format(
                    Number(productDetails?.price)
                  )}</strong
                ></CardText
              >
              Quantity:
              <Button on:click="{() => plusItem()}">+</Button>
              {productQuantity}
              <Button on:click="{() => minusItem()}">-</Button>
            </CardBody>
            <CardFooter>
              <Button on:click="{() => addItemToCart()}">Add to Cart</Button>
              <Modal isOpen="{open}" toggle="{toggle}">
                <ModalHeader toggle="{toggle}"
                  >1 item added to the cart</ModalHeader
                >
                <ModalBody>
                  {productDetails?.productName}
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" on:click="{() => navigate('/cart')}"
                    >Proceed to Checkout</Button
                  >
                  <Button color="secondary" on:click="{toggle}"
                    >Continue Shopping</Button
                  >
                </ModalFooter>
              </Modal>
            </CardFooter>
          </Card>
        </div>
      </Col>
    </Row>
  </div>
{:else}
  <div class="noProduct">
    <div class="no-product-inner">
      <h1>No Product Found</h1>
      <Button on:click="{() => navigate('/')}">Go Back</Button>
    </div>
  </div>
{/if}

<style lang="scss">
  @import './details.scss';
</style>
