<script>
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
    export let product;
</script>


<Card class="shadow mb-3 card-cls product-card" id="card-cls">
    <CardHeader class="card-head">
        <CardTitle>{product.features.brand}</CardTitle>
    </CardHeader>
    <CardBody>
        <Figure>
            <Image
                fluid
                alt="product-image"
                src={product.imageUrl}
                class="card-img"
            />
        </Figure>
        <CardSubtitle class="px-card-subtitle">{product.features.modelName}</CardSubtitle>
        <CardSubtitle class="px-card-subtitle">{"₹" + product.price}</CardSubtitle>
        <CardText class="card-text">
            {product.shortDescription}
        </CardText>
        <Button on:click={() => navigate("/details?productId="+product.id)}>Details</Button>
    </CardBody>
</Card>

<style lang="scss">
	:global(.px-card-subtitle) {
        margin-bottom: 10px;;
	}
    :global(.card-img){
        height:120px;width:120px;
    }
    :global(.product-card .card-text){
        padding-top:10px;
        height:190px;
        font-size: medium;
    }
    :global(.card-cls){
        width:300px; margin-left: 50px;
    }
    :global(.card-head){
        width: 299px;
        transform: translate(-4%);
        text-align: center;
    }
</style>
