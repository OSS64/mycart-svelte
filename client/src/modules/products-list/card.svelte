<script lang="ts">
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
  } from "sveltestrap";
  import { navigate } from "svelte-routing";
  import type { Product } from "./../../app-constants/types";
  export let product: Product;
</script>

<Card class="shadow mb-3 card-cls product-card" id="card-cls">
  <CardHeader id="card-head">
    <CardTitle>{product?.features?.brand}</CardTitle>
  </CardHeader>
  <CardBody>
    <Figure>
      <Image
        fluid
        alt="product-image"
        src={product?.imageUrl}
        class="card-img"
      />
    </Figure>
    <CardSubtitle class="px-card-subtitle"
      >{product?.features?.modelName}</CardSubtitle
    >
    <CardSubtitle class="px-card-subtitle">{"₹" + product?.price}</CardSubtitle>
    <CardText class="card-text">
      {product?.shortDescription}
    </CardText>
    <Button on:click={() => navigate("/details?productId=" + product?._id)}
      >Details</Button
    >
  </CardBody>
</Card>

<style lang="scss">
  @import "./card.scss";
</style>
