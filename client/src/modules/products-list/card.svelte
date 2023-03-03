<script lang="ts">
  import {
    Card,
    CardBody,
    CardHeader,
    CardSubtitle,
    CardText,
    CardTitle,
    Figure,
    Image,
  } from 'sveltestrap';
  import { Router, Link } from 'svelte-routing';
  import type { Product } from '../../models/types';
  import { Utility } from '../../shared/utilities/utility';
  export let product: Product;
  import NoImage from './../../shared/utilities/noImage.svelte';
  const hasNoImage = product?.imageUrl.indexOf('placeholder') >= 0;
</script>

<Card class="shadow mb-3 card-cls product-card" id="card-cls">
  <CardHeader id="card-head">
    <CardTitle>{product?.features?.brand}</CardTitle>
  </CardHeader>
  <CardBody>
    <Router>
      <Link
        to="{'/details?productId=' + product?._id}"
        class="{hasNoImage ? 'noimage' : ''}"
      >
        {#if hasNoImage}
          <NoImage height="{100}" margin="{'0 0 20px'}" />
        {:else}
          <Figure>
            <Image
              fluid
              alt="product-image"
              src="{product?.imageUrl}"
              class="card-img"
            />
          </Figure>
        {/if}
      </Link>
    </Router>

    <CardSubtitle class="px-card-subtitle">
      <Router>
        <Link to="{'/details?productId=' + product?._id}">
          {product?.features?.modelName}
        </Link>
      </Router></CardSubtitle
    >
    <CardSubtitle class="px-card-subtitle"
      >{Utility.formatNumber.format(+product?.price)}</CardSubtitle
    >
    <CardText class="card-text">
      {product?.shortDescription}
    </CardText>
  </CardBody>
</Card>
