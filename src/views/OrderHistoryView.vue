<script setup>
import { useOrderStore } from '../stores/orders'
import FrontLayout from '../layouts/FrontLayout.vue'

const orderStore = useOrderStore()

const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(price)
}

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<template>
  <FrontLayout>
    <main class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header class="mb-12">
        <h1 class="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Order History</h1>
        <p class="text-slate-500 dark:text-obsidian-400 font-medium">Track and manage your past premium purchases.</p>
      </header>

      <div v-if="orderStore.orders.length === 0" class="text-center py-32 bg-white dark:bg-obsidian-900 rounded-[3rem] shadow-sm border border-slate-100 dark:border-obsidian-800">
        <div class="w-20 h-20 bg-slate-50 dark:bg-obsidian-800 rounded-3xl flex items-center justify-center mx-auto mb-6 text-slate-300 dark:text-obsidian-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
        </div>
        <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-2">No orders found</h2>
        <p class="text-slate-500 dark:text-obsidian-400 mb-8">You haven't placed any orders yet.</p>
        <router-link :to="{ name: 'home' }" class="premium-btn">Start Shopping</router-link>
      </div>

      <div v-else class="space-y-8">
        <div v-for="order in orderStore.orders" :key="order.id" class="premium-card p-0 overflow-hidden shadow-xl">
           <div class="p-6 sm:p-8 bg-slate-50 dark:bg-obsidian-950/50 border-b border-slate-100 dark:border-obsidian-800 flex flex-wrap items-center justify-between gap-6">
              <div class="flex gap-8">
                 <div>
                    <p class="text-[10px] font-black text-slate-400 dark:text-obsidian-500 uppercase tracking-widest mb-1">Order Date</p>
                    <p class="text-sm font-bold text-slate-700 dark:text-obsidian-200">{{ formatDate(order.date) }}</p>
                 </div>
                 <div>
                    <p class="text-[10px] font-black text-slate-400 dark:text-obsidian-500 uppercase tracking-widest mb-1">Total Amount</p>
                    <p class="text-sm font-black text-primary-700 dark:text-primary-400">{{ formatPrice(order.total) }}</p>
                 </div>
              </div>
              <div class="flex items-center gap-4">
                 <div class="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest" :class="order.status === 'Processing' ? 'bg-orange-50 text-orange-600 dark:bg-orange-950/20 dark:text-orange-400' : 'bg-green-50 text-green-600 dark:bg-green-950/20 dark:text-green-400'">
                    {{ order.status }}
                 </div>
                 <p class="text-xs font-bold text-slate-400 dark:text-obsidian-500">#{{ order.id }}</p>
              </div>
           </div>
           
           <div class="p-8">
              <div class="space-y-6">
                 <div v-for="item in order.items" :key="item.id" class="flex items-center gap-6">
                    <div class="w-16 h-16 bg-white rounded-xl p-2 flex-shrink-0 shadow-sm border border-slate-50 dark:border-obsidian-800">
                       <img :src="item.image" :alt="item.title" class="w-full h-full object-contain mix-blend-multiply" />
                    </div>
                    <div class="flex-grow">
                       <h4 class="font-bold text-slate-900 dark:text-white line-clamp-1">{{ item.title }}</h4>
                       <p class="text-xs text-slate-500 font-medium">Qty: {{ item.quantity }} × {{ formatPrice(item.price) }}</p>
                    </div>
                    <router-link :to="{ name: 'product-detail', params: { id: item.id } }" class="text-xs font-bold text-primary-600 dark:text-primary-400 hover:underline">Buy Again</router-link>
                 </div>
              </div>
           </div>
           
           <div class="p-6 bg-slate-50 dark:bg-obsidian-950/30 flex items-center gap-3">
              <router-link 
                :to="{ name: 'order-tracking', params: { id: order.id } }"
                class="px-4 py-2 bg-primary-50 dark:bg-primary-950/30 text-primary-600 dark:text-primary-400 rounded-xl text-xs font-bold hover:bg-primary-600 hover:text-white transition-all"
              >
                Track Order
              </router-link>
              <button class="px-4 py-2 bg-slate-100 dark:bg-obsidian-800 text-slate-600 dark:text-obsidian-300 rounded-xl text-xs font-bold hover:bg-slate-200 dark:hover:bg-obsidian-700 transition-all">
                View Invoice
              </button>
           </div>
        </div>
      </div>
    </main>
  </FrontLayout>
</template>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;  
  overflow: hidden;
}
</style>
