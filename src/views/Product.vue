<template>
    <div>
        <img class="card-img-top" src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
        <div class="card-content">
            <div class="media">
                <h4 class="title is-4">{{ product.title }}</h4>
            </div>
            <div class="content is-clearfix">
                <p>Stok: {{ product.quantity }}</p>
                <p class="is-pulled-right">
                <span class="title is-4"><strong>Rp.{{ product.price }} ea.</strong></span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'product-component',
    props: ['product']
}
</script>

<style>
.card-content  {
    padding-left: 15px;
    padding-top: 15px;
}
</style>