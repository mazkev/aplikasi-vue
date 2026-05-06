<script setup>
import { useWishlistStore } from '../stores/wishlist'
import { useCartStore } from '../stores/cart'
import Navbar from '../components/Navbar.vue'

const wishlistStore = useWishlistStore()
const cartStore = useCartStore()

const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(price)
}

function moveToCart(product) {
  cartStore.addToCart(product)
  wishlistStore.toggleWishlist(product)
}
</script>

<template>
  <div class="min-h-screen">
    <Navbar />
    
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header class="mb-12">
        <h1 class="text-4xl font-black text-slate-900 tracking-tight">Your Wishlist</h1>
        <p v-if="wishlistStore.items.length" class="text-slate-500 font-medium">Keep track of items you love.</p>
      </header>

      <div v-if="wishlistStore.items.length === 0" class="text-center py-32 bg-white rounded-[2.5rem] shadow-sm border border-slate-100">
        <div class="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-slate-50 text-slate-300 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
        </div>
        <h2 class="text-2xl font-bold text-slate-900 mb-2">Your wishlist is empty</h2>
        <p class="text-slate-500 mb-8">Save items you like to see them here later.</p>
        <router-link :to="{ name: 'home' }" class="premium-btn inline-block">Explore Collections</router-link>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div v-for="product in wishlistStore.items" :key="product.id" class="premium-card group cursor-pointer overflow-hidden p-0 flex flex-col hover:-translate-y-1">
          <div class="aspect-square w-full overflow-hidden bg-white p-12 rounded-t-2xl relative">
            <img :src="product.image" :alt="product.title" class="h-full w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform" />
            <button 
              @click.stop="wishlistStore.toggleWishlist(product)"
              class="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-xl bg-white/80 backdrop-blur text-red-500 shadow-sm border border-slate-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            </button>
          </div>
          
          <div class="p-6 flex flex-col flex-grow">
            <h3 class="text-lg font-bold text-slate-900 leading-tight mb-2 line-clamp-2">{{ product.title }}</h3>
            <div class="text-xl font-black text-primary-700 mb-6">{{ formatPrice(product.price) }}</div>
            
            <div class="mt-auto space-y-2">
              <button @click="moveToCart(product)" class="w-full premium-btn text-sm py-3">Add to Bag</button>
              <router-link :to="{ name: 'product-detail', params: { id: product.id } }" class="w-full text-center block text-sm font-bold text-slate-400 hover:text-primary-600 transition-colors">View Details</router-link>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
