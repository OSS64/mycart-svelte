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
  import { navigate, Router, Link } from "svelte-routing";
  import type { Product } from "../../models/types";
  import { Utility } from "../../shared/utilities/utility";
  export let product: Product;
</script>

<Card class="shadow mb-3 card-cls product-card" id="card-cls">
  <CardHeader id="card-head">
    <CardTitle>{product?.features?.brand}</CardTitle>
  </CardHeader>
  <CardBody>
    <Router>
      <Link to={"/details?productId=" + product?._id}>
        <Figure>
          <Image
            fluid
            alt="product-image"
            src={product?.imageUrl}
            class="card-img"
          />
        </Figure>
      </Link>
    </Router>

    <CardSubtitle class="px-card-subtitle"
      >{product?.features?.modelName}</CardSubtitle
    >
    <CardSubtitle class="px-card-subtitle"
      >{Utility.formatNumber.format(+product?.price)}</CardSubtitle
    >
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
