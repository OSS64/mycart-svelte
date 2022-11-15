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
  import { productQuantity } from "../../store/details.store";
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
  // let productQuantity = 0;
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

  onMount(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("productId");
    const productResponse = await fetch(
      "http://localhost:3000/products/" + productId
    );
    product = await productResponse.json();
    console.log(product);
    imgUrl = product.imageUrl;
    initialisingQty();
  });

  function initialisingQty() {
    product["quantity"] = product.hasOwnProperty("quantity")
      ? product["quantity"]
      : 1;
    // $productQuantity = product["quantity"];
  }

  function addItemToCart() {
    let existingItems = $cart.some((prod) => prod.id == product.id);
    if (!existingItems) {
      $cart = [...$cart, product];
    } else {
      $cart.forEach(function (prod) {
        if (prod.id == product.id) {
          prod["quantity"] = $productQuantity;
        }
        $productQuantity = $productQuantity;
      });
    }
  }

  function minusItem() {
    if (product.quantity != 0) {
      product.quantity -= 1;
      $productQuantity = product.quantity;
    }
    $productQuantity = $productQuantity;
  }

  function plusItem() {
    if (product.quantity < 10) {
      product.quantity += 1;
      $productQuantity = product.quantity;
    }

    $productQuantity = $productQuantity;
  }

  function openThumbnail(imageName) {
    imgUrl = imageName;
  }

  // $: totalPrice = productQuantity * Number(product?.price.replaceAll(",", ""));
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
          {$productQuantity}
          <Button on:click={() => minusItem()}>-</Button>
        </CardBody>
        <CardFooter
          ><Button on:click={() => addItemToCart()}>Add to Cart</Button>
        </CardFooter>
      </Card>
    </div>
  </Col>
</Row>


