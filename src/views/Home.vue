<template>
    <div id="home">
        <h1>Market Place</h1>
        <products-list-component></products-list-component>
    </div>
</template>

<script>
import ProductsListComponent from './ProductsList';

export default {
    name: 'home-component',
    components: {
        'products-list-component': ProductsListComponent
    }
}
</script>

<style scoped>
    #home {
        background-color: #FFFFFF;
        border: 1px solid #CCCCCC;
        padding: 30px;
    }
</style>