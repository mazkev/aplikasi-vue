<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '../stores/products'
import { useWishlistStore } from '../stores/wishlist'
import { useCartStore } from '../stores/cart'
import { useComparisonStore } from '../stores/comparison'
import FrontLayout from '../layouts/FrontLayout.vue'
import CountdownSection from '../components/CountdownSection.vue'

const router = useRouter()
const productStore = useProductStore()
const wishlistStore = useWishlistStore()
const cartStore = useCartStore()
const comparisonStore = useComparisonStore()

onMounted(() => {
  if (productStore.products.length === 0) {
    productStore.fetchProducts()
  }
})

const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(price)
}

function goToDetail(id) {
  router.push({ name: 'product-detail', params: { id } })
}
</script>

<template>
  <FrontLayout>
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Feature 5: Flash Drop Countdown -->
      <CountdownSection />

      <header class="mb-12">
        <h1 class="text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-6">Discover Quality</h1>
        
        <!-- Categories -->
        <div class="flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar">
          <button 
            v-for="cat in productStore.categories" 
            :key="cat"
            @click="productStore.selectedCategory = cat"
            class="px-6 py-2.5 rounded-2xl text-sm font-bold whitespace-nowrap transition-all border-2"
            :class="productStore.selectedCategory === cat 
              ? 'bg-primary-600 border-primary-600 text-white shadow-lg shadow-primary-200 dark:shadow-none' 
              : 'bg-white dark:bg-obsidian-900 border-slate-100 dark:border-obsidian-800 text-slate-500 dark:text-obsidian-400 hover:border-primary-200 dark:hover:border-primary-800 hover:text-primary-600 dark:hover:text-primary-400'"
          >
            {{ cat }}
          </button>
        </div>
      </header>

      <!-- Loading State -->
      <div v-if="productStore.isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div v-for="i in 8" :key="i" class="premium-card animate-pulse">
          <div class="aspect-square bg-slate-100 dark:bg-obsidian-800 rounded-t-[2.5rem]"></div>
          <div class="p-8 space-y-4">
            <div class="h-6 bg-slate-100 dark:bg-obsidian-800 rounded-xl w-3/4"></div>
            <div class="h-4 bg-slate-100 dark:bg-obsidian-800 rounded-lg w-1/2"></div>
            <div class="flex justify-between items-center pt-4">
              <div class="h-8 bg-slate-100 dark:bg-obsidian-800 rounded-xl w-1/3"></div>
              <div class="h-12 bg-slate-100 dark:bg-obsidian-800 rounded-2xl w-12"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Product Grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div v-for="product in productStore.filteredProducts" :key="product.id" class="premium-card group cursor-pointer" @click="goToDetail(product.id)">
          <div class="aspect-square w-full overflow-hidden bg-white dark:bg-slate-200 p-12 relative">
            <img 
              :src="product.image" 
              :alt="product.title" 
              class="h-full w-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700 ease-out"
            />
            
            <div class="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
               <span class="bg-white/90 dark:bg-obsidian-900/90 backdrop-blur px-4 py-2 rounded-xl font-bold text-slate-900 dark:text-white shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">Details</span>
               
               <!-- Feature 4: Add to Compare -->
               <button 
                @click.stop="comparisonStore.addToCompare(product)"
                class="bg-white/90 dark:bg-obsidian-900/90 backdrop-blur p-2 rounded-xl text-slate-900 dark:text-white shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75 hover:bg-primary-600 hover:text-white"
                :class="{ 'bg-primary-600 text-white': comparisonStore.isInComparison(product.id) }"
               >
                 <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
               </button>
            </div>

            <button 
              @click.stop="wishlistStore.toggleWishlist(product)"
              class="absolute top-6 right-6 w-12 h-12 flex items-center justify-center rounded-2xl bg-white/80 dark:bg-obsidian-900/80 backdrop-blur text-slate-400 dark:text-obsidian-500 hover:text-red-500 dark:hover:text-red-400 shadow-sm border border-slate-100 dark:border-obsidian-800 transition-all z-10"
              :class="{ 'text-red-500 dark:text-red-400 bg-white dark:bg-obsidian-800': wishlistStore.isInWishlist(product.id) }"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" :fill="wishlistStore.isInWishlist(product.id) ? 'currentColor' : 'none'" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            </button>
          </div>

          <div class="p-8 flex flex-col flex-grow">
            <h3 class="text-xl font-bold text-slate-900 dark:text-white leading-tight mb-2 line-clamp-2">{{ product.title }}</h3>
            <p class="text-xs font-bold text-slate-400 dark:text-obsidian-500 uppercase tracking-widest mb-6">{{ product.category }}</p>
            
            <div class="mt-auto">
              <div class="flex items-center justify-between">
                <div class="flex flex-col">
                  <span class="text-2xl font-black text-primary-700 dark:text-primary-400 tracking-tight">{{ formatPrice(product.price) }}</span>
                </div>
                <button 
                  @click.stop="cartStore.addToCart(product)"
                  class="w-14 h-14 bg-slate-100 dark:bg-obsidian-800 text-slate-900 dark:text-obsidian-200 rounded-2xl hover:bg-primary-600 dark:hover:bg-primary-600 hover:text-white transition-all shadow-sm group-hover:shadow-primary-100 dark:group-hover:shadow-none group-hover:shadow-2xl flex items-center justify-center active:scale-90"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </FrontLayout>
</template>

<style scoped>
.line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.no-scrollbar::-webkit-scrollbar { display: none; }
</style>
