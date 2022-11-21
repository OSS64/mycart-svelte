<style lang="scss">
  @import "./details.scss";
</style>
<script>
  import { Col, Row } from "sveltestrap";
  import { Swiper, SwiperSlide } from "swiper/svelte";
  import "../product-details/swiper.css";
  import "swiper/css";
  import "swiper/css/free-mode";
  import "swiper/css/navigation";
  import "swiper/css/thumbs";
  import { FreeMode, Navigation, Thumbs } from "swiper";
  import { onMount } from "svelte";
  import { cart } from "../../store/cart.store";
  // import { productQuantity } from "../../store/details.store";
  import { AppConstants } from "../../app-constants/app-config";
  import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardSubtitle,
    CardText,
    CardTitle,
  } from "sveltestrap";

  let product;
  let imgUrl = null;
  let productQuantity = 0;
  let productDetails = [];
  const arr = [
    "./content/images/item1.jpg",
    "./content/images/item2.jpg",
    "./content/images/item3.jpg",
    "./content/images/item1.jpg",
    "./content/images/item2.jpg",
    "./content/images/item3.jpg",
  ];
  let thumbsSwiper = null;

  const setThumbsSwiper = (e) => {
    const [swiper] = e.detail;

    thumbsSwiper = swiper;
  };

  onMount(
    async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("productId");
    const productResponse = await fetch(
      AppConstants.apiBase + "/products/" + productId
      ); 
      product = await productResponse.json();
    // let existingItems = $cart.some((prod) => prod.id == product.id);
    // if (!existingItems) {
    //   const productResponse = await fetch(
    //   AppConstants.apiBase + "/products/" + productId
    //   ); 
    //   product = await productResponse.json();
    // }else{
    //   $cart.forEach(function (prod){
    //     if(prod.id == product.id){
    //       prod = product;
    //     }
    //   }
    // } 
    productDetails = product;
      $cart.forEach(function(prod){
        if(prod.id == productDetails.id){
          productDetails = prod;
        }
        // else{
        //   productDetails = product;
        // }
      })
      // let existingItems = $cart.some((prod) => prod.id == product.id);
      // if (!existingItems){
      //   productDetails = product;
      // }else{}
      productDetails = productDetails;
    console.log(productDetails);
    imgUrl = product.imageUrl;
    initialisingQty();
  });


  function initialisingQty() {
    productDetails["quantity"] = productDetails.hasOwnProperty("quantity")
      ? productDetails["quantity"]
      : 1;
      productQuantity = productDetails["quantity"];
  }

  function addItemToCart() {
    let existingItems = $cart.some((prod) => prod.id == productDetails.id);
    if (!existingItems) {
      $cart = [...$cart, productDetails];
    } else {
      $cart.forEach(function (prod) {
        if (prod.id == productDetails.id) {
          prod["quantity"] = productDetails.quantity;
        }
        // $productQuantity = $productQuantity;
      });
    }
  }

  function minusItem() {
    if (productDetails.quantity != 0) {
      productDetails.quantity -= 1;
      productQuantity = productDetails.quantity;
    }
    // $productQuantity = $productQuantity;
  }

  function plusItem() {
    if (productDetails.quantity < 10) {
      productDetails.quantity += 1;
      productQuantity = productDetails.quantity;
    }

    // $productQuantity = $productQuantity;
  }

  function openThumbnail(imageName) {
    imgUrl = imageName;
  }

  // $: totalPrice = productQuantity * Number(product?.price.replaceAll(",", ""));
</script>

<Row cols={{  md: 1, sm: 1 }}>
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
            Operating System: {productDetails?.features?.operatingSystem}<br />
            Special Feature: {productDetails?.features?.specialFeature}<br />
            Graphics Card: {productDetails?.features?.graphicsCard}
          </CardText>

          <CardText><strong>Price: ₹{productDetails?.price}</strong></CardText>
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


