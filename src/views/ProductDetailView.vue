<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '../stores/products'
import { useCartStore } from '../stores/cart'
import { useWishlistStore } from '../stores/wishlist'
import FrontLayout from '../layouts/FrontLayout.vue'

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()

const quantity = ref(1)

onMounted(() => {
  productStore.fetchProductById(route.params.id)
})

const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(price)
}

function handleAddToCart() {
  for (let i = 0; i < quantity.value; i++) {
    cartStore.addToCart(productStore.currentProduct)
  }
}
</script>

<template>
  <FrontLayout>
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Loading Skeleton -->
      <div v-if="productStore.isLoading" class="animate-pulse">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div class="aspect-square bg-slate-200 dark:bg-obsidian-800 rounded-3xl"></div>
          <div class="space-y-6">
            <div class="h-10 bg-slate-200 dark:bg-obsidian-800 rounded w-3/4"></div>
            <div class="h-6 bg-slate-200 dark:bg-obsidian-800 rounded w-1/4"></div>
            <div class="space-y-2">
              <div class="h-4 bg-slate-200 dark:bg-obsidian-800 rounded w-full"></div>
              <div class="h-4 bg-slate-200 dark:bg-obsidian-800 rounded w-full"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Content -->
      <div v-else-if="productStore.currentProduct" class="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <!-- Product Image -->
        <div class="premium-card p-12 flex items-center justify-center bg-white dark:bg-slate-200 aspect-square">
          <img 
            :src="productStore.currentProduct.image" 
            :alt="productStore.currentProduct.title" 
            class="max-h-full max-w-full object-contain mix-blend-multiply"
          />
        </div>

        <!-- Product Details -->
        <div class="flex flex-col h-full">
          <nav class="flex mb-4" aria-label="Breadcrumb">
            <ol class="flex items-center space-x-2 text-sm text-slate-400 dark:text-obsidian-500 font-bold uppercase tracking-wider">
              <li><router-link :to="{ name: 'home' }" class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Shop</router-link></li>
              <li><svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" /></svg></li>
              <li class="text-primary-600 dark:text-primary-400 truncate max-w-[200px]">{{ productStore.currentProduct.category }}</li>
            </ol>
          </nav>

          <h1 class="text-4xl font-black text-slate-900 dark:text-white mb-4">{{ productStore.currentProduct.title }}</h1>
          
          <div class="flex items-center gap-4 mb-8">
            <div class="flex items-center gap-1">
               <svg v-for="i in 5" :key="i" class="h-5 w-5" :class="i <= Math.round(productStore.currentProduct.rating.rate) ? 'text-yellow-400' : 'text-slate-200 dark:text-obsidian-800'" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
               <span class="text-sm font-bold text-slate-500 dark:text-obsidian-400 ml-2">{{ productStore.currentProduct.rating.rate }} ({{ productStore.currentProduct.rating.count }} reviews)</span>
            </div>
            <div class="h-4 w-px bg-slate-200 dark:bg-obsidian-800"></div>
            <span class="text-sm font-bold text-green-600 dark:text-green-400">Available Stock: {{ productStore.currentProduct.quantity }}</span>
          </div>

          <div class="text-3xl font-black text-primary-700 dark:text-primary-400 mb-8">
            {{ formatPrice(productStore.currentProduct.price) }}
          </div>

          <div class="prose prose-slate dark:prose-invert mb-12">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2">Description</h3>
            <p class="text-slate-600 dark:text-obsidian-400 leading-relaxed">{{ productStore.currentProduct.description }}</p>
          </div>

          <div class="mt-auto space-y-4">
            <div class="flex items-center gap-4">
              <div class="flex items-center bg-slate-100 dark:bg-obsidian-900 rounded-2xl p-1">
                <button @click="quantity = Math.max(1, quantity - 1)" class="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white dark:hover:bg-obsidian-800 transition-colors text-slate-600 dark:text-obsidian-300 font-bold">-</button>
                <input v-model="quantity" type="number" class="w-12 bg-transparent text-center font-bold text-slate-900 dark:text-white focus:outline-none" readonly />
                <button @click="quantity++" class="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white dark:hover:bg-obsidian-800 transition-colors text-slate-600 dark:text-obsidian-300 font-bold">+</button>
              </div>
              
              <button 
                @click="handleAddToCart"
                class="flex-grow premium-btn h-14 text-lg flex items-center justify-center gap-3"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                Add to Cart
              </button>

              <button 
                @click="wishlistStore.toggleWishlist(productStore.currentProduct)"
                class="w-14 h-14 flex items-center justify-center rounded-2xl border-2 border-slate-100 dark:border-obsidian-800 text-slate-400 dark:text-obsidian-500 hover:text-red-500 hover:border-red-100 dark:hover:border-red-900 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all shadow-sm"
                :class="{ 'text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-950/20 border-red-100 dark:border-red-900': wishlistStore.isInWishlist(productStore.currentProduct.id) }"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" :fill="wishlistStore.isInWishlist(productStore.currentProduct.id) ? 'currentColor' : 'none'" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              </button>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div class="flex items-center gap-3 p-4 bg-slate-50 dark:bg-obsidian-950/50 rounded-2xl border border-slate-100 dark:border-obsidian-800">
                <div class="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-950/20 flex items-center justify-center text-primary-600 dark:text-primary-400">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                </div>
                <div>
                  <p class="text-xs font-bold text-slate-400 dark:text-obsidian-500 uppercase tracking-tighter leading-none">Security</p>
                  <p class="text-sm font-bold text-slate-700 dark:text-obsidian-200">Guaranteed</p>
                </div>
              </div>
              <div class="flex items-center gap-3 p-4 bg-slate-50 dark:bg-obsidian-950/50 rounded-2xl border border-slate-100 dark:border-obsidian-800">
                <div class="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-950/20 flex items-center justify-center text-primary-600 dark:text-primary-400">
                   <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <p class="text-xs font-bold text-slate-400 dark:text-obsidian-500 uppercase tracking-tighter leading-none">Delivery</p>
                  <p class="text-sm font-bold text-slate-700 dark:text-obsidian-200">Same Day</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-20">
        <h2 class="text-2xl font-bold text-slate-900 dark:text-white">Product not found</h2>
        <router-link :to="{ name: 'home' }" class="mt-4 text-primary-600 dark:text-primary-400 font-bold hover:underline">Back to shop</router-link>
      </div>
    </main>
  </FrontLayout>
</template>
