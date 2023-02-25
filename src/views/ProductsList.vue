<template>
    <div class="card-deck is-centered is-multiline">
        <div class="card column is-one-quarter" v-for="product in products" :key="product.id">
            <product-component :product="product"></product-component>
        </div>
        <div class="section" v-if="products.length === 0">
            <p>{{ noProductLabel }}</p>
        </div>
    </div>
</template>

<script>
import ProductComponent from './Product';


export default {
    name: 'products-list-component',
    data() {
        return {
            noProductLabel: 'No products'
        }
    },
    components: {
        'product-component': ProductComponent
    },
    computed: {
        products() {
            return this.$store.state.products;
        }
    }
}
</script>

<style>
  .card {
    margin: 10px;
  }
</style>