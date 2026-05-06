<script setup>
import { useComparisonStore } from '../stores/comparison'
import FrontLayout from '../layouts/FrontLayout.vue'

const comparisonStore = useComparisonStore()

const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(price)
}
</script>

<template>
  <FrontLayout>
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header class="mb-12">
        <div class="flex items-center gap-3 mb-2">
           <router-link :to="{ name: 'home' }" class="text-slate-400 hover:text-primary-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
           </router-link>
           <h1 class="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Product Comparison</h1>
        </div>
        <p class="text-slate-500 dark:text-obsidian-400 font-medium">Side-by-side analysis of your top premium selections.</p>
      </header>

      <div v-if="comparisonStore.items.length === 0" class="text-center py-32 bg-white dark:bg-obsidian-900 rounded-[3rem] shadow-sm border border-slate-100 dark:border-obsidian-800">
        <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">No items to compare</h2>
        <router-link :to="{ name: 'home' }" class="premium-btn">Go back to shop</router-link>
      </div>

      <div v-else class="overflow-x-auto no-scrollbar">
        <div class="inline-flex min-w-full gap-8">
          <!-- Specification Labels Column -->
          <div class="w-48 flex-shrink-0 pt-[340px]">
             <div class="space-y-12">
                <div class="text-[10px] font-black text-slate-400 dark:text-obsidian-600 uppercase tracking-[0.2em] h-6 flex items-center">Category</div>
                <div class="text-[10px] font-black text-slate-400 dark:text-obsidian-600 uppercase tracking-[0.2em] h-6 flex items-center">Price</div>
                <div class="text-[10px] font-black text-slate-400 dark:text-obsidian-600 uppercase tracking-[0.2em] h-6 flex items-center">Rating</div>
                <div class="text-[10px] font-black text-slate-400 dark:text-obsidian-600 uppercase tracking-[0.2em] flex items-start">Description</div>
             </div>
          </div>

          <!-- Product Columns -->
          <div v-for="item in comparisonStore.items" :key="item.id" class="w-72 flex-shrink-0 group">
             <div class="premium-card p-8 mb-12 relative overflow-hidden h-[300px] flex items-center justify-center">
                <button 
                  @click="comparisonStore.removeFromCompare(item.id)"
                  class="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <img :src="item.image" class="max-h-full max-w-full object-contain mix-blend-multiply dark:mix-blend-normal p-4" />
                <div class="absolute bottom-4 left-4 right-4">
                   <h3 class="text-sm font-black text-slate-900 dark:text-white line-clamp-2 text-center">{{ item.title }}</h3>
                </div>
             </div>

             <div class="space-y-12 px-2">
                <div class="h-6 flex items-center font-bold text-slate-700 dark:text-obsidian-200">{{ item.category }}</div>
                <div class="h-6 flex items-center font-black text-primary-700 dark:text-primary-400">{{ formatPrice(item.price) }}</div>
                <div class="h-6 flex items-center gap-1 font-bold text-slate-700 dark:text-obsidian-200">
                   <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                   {{ item.rating.rate }} ({{ item.rating.count }})
                </div>
                <div class="text-xs text-slate-500 dark:text-obsidian-400 leading-relaxed line-clamp-6 italic">"{{ item.description }}"</div>
             </div>
          </div>
        </div>
      </div>
    </main>
  </FrontLayout>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}
.line-clamp-6 {
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}
</style>
