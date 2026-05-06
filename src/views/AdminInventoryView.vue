<script setup>
import { onMounted } from 'vue'
import { useProductStore } from '../stores/products'
import AdminLayout from '../layouts/AdminLayout.vue'

const productStore = useProductStore()

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

function handleDelete(id) {
  if (confirm('Are you sure you want to delete this product?')) {
    productStore.deleteProduct(id)
  }
}
</script>

<template>
  <AdminLayout>
    <div class="p-8">
      <div class="flex justify-between items-center mb-10">
        <div>
          <h1 class="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Inventory Control</h1>
          <p class="text-slate-500 dark:text-obsidian-400 font-medium">Manage your product catalog and stock levels.</p>
        </div>
        <router-link :to="{ name: 'admin-add-product' }" class="premium-btn flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
          Add Product
        </router-link>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
         <!-- Total Products -->
         <div class="stat-card bg-white dark:bg-obsidian-900 flex flex-col items-center justify-center text-center min-h-[180px] px-12">
            <p class="text-[10px] font-black text-slate-400 dark:text-obsidian-500 uppercase tracking-[0.4em] mb-3">Total Products</p>
            <p class="text-5xl font-black text-slate-900 dark:text-white tracking-tighter">{{ productStore.products.length }}</p>
         </div>
         
         <!-- Out of Stock -->
         <div class="stat-card bg-white dark:bg-obsidian-900 flex flex-col items-center justify-center text-center min-h-[180px] px-12">
            <p class="text-[10px] font-black text-slate-400 dark:text-obsidian-500 uppercase tracking-[0.4em] mb-3">Out of Stock</p>
            <p class="text-5xl font-black text-slate-900 dark:text-white tracking-tighter">0</p>
         </div>
         
         <!-- Categories -->
         <div class="stat-card bg-white dark:bg-obsidian-900 flex flex-col items-center justify-center text-center min-h-[180px] px-12">
            <p class="text-[10px] font-black text-slate-400 dark:text-obsidian-500 uppercase tracking-[0.4em] mb-3">Categories</p>
            <p class="text-5xl font-black text-slate-900 dark:text-white tracking-tighter">{{ productStore.categories.length - 1 }}</p>
         </div>
      </div>

      <div class="premium-card p-0 overflow-hidden border-slate-100 dark:border-obsidian-800 shadow-2xl">
        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead>
              <tr class="bg-slate-50 dark:bg-obsidian-950 border-b border-slate-100 dark:border-obsidian-800">
                <th class="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-obsidian-600 uppercase tracking-widest">Product</th>
                <th class="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-obsidian-600 uppercase tracking-widest">Category</th>
                <th class="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-obsidian-600 uppercase tracking-widest">Price</th>
                <th class="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-obsidian-600 uppercase tracking-widest">Stock</th>
                <th class="px-8 py-5 text-[10px] font-black text-slate-400 dark:text-obsidian-600 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-obsidian-800">
              <tr v-for="product in productStore.products" :key="product.id" class="hover:bg-slate-50 dark:hover:bg-obsidian-800/30 transition-colors">
                <td class="px-8 py-6">
                  <div class="flex items-center gap-4">
                    <div class="w-12 h-12 bg-white dark:bg-slate-200 rounded-xl p-2 border border-slate-100 dark:border-obsidian-800 flex-shrink-0">
                      <img :src="product.image" class="w-full h-full object-contain mix-blend-multiply" />
                    </div>
                    <span class="font-bold text-slate-900 dark:text-white line-clamp-1">{{ product.title }}</span>
                  </div>
                </td>
                <td class="px-8 py-6">
                  <span class="px-3 py-1 bg-slate-100 dark:bg-obsidian-800 rounded-lg text-xs font-bold text-slate-600 dark:text-obsidian-300 uppercase">{{ product.category }}</span>
                </td>
                <td class="px-8 py-6 font-black text-slate-900 dark:text-white">
                  {{ formatPrice(product.price) }}
                </td>
                <td class="px-8 py-6">
                  <div class="flex items-center gap-2">
                     <div class="w-2 h-2 rounded-full" :class="product.quantity > 20 ? 'bg-green-500' : 'bg-yellow-500'"></div>
                     <span class="font-bold text-slate-700 dark:text-obsidian-200">{{ product.quantity || 50 }} pcs</span>
                  </div>
                </td>
                <td class="px-8 py-6">
                  <div class="flex items-center gap-3">
                    <button @click="handleDelete(product.id)" class="p-2 text-slate-400 hover:text-red-500 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>
