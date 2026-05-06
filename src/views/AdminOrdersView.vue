<script setup>
import { useOrderStore } from '../stores/orders'
import AdminLayout from '../layouts/AdminLayout.vue'

const orderStore = useOrderStore()

const statusOptions = ['Processing', 'Shipped', 'Delivered', 'Cancelled']

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
    month: 'short',
    year: 'numeric'
  })
}

function getStatusClass(status) {
  switch (status) {
    case 'Processing': return 'bg-orange-100 text-orange-700 dark:bg-orange-950/30 dark:text-orange-400'
    case 'Shipped': return 'bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400'
    case 'Delivered': return 'bg-green-100 text-green-700 dark:bg-green-950/30 dark:text-green-400'
    case 'Cancelled': return 'bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400'
    default: return 'bg-slate-100 text-slate-700'
  }
}
</script>

<template>
  <AdminLayout>
    <header class="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div>
        <h1 class="text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-2">Order Management</h1>
        <p class="text-slate-500 dark:text-obsidian-400 font-medium">Review and process customer orders in real-time.</p>
      </div>
      
      <div class="flex items-center gap-4 bg-white dark:bg-obsidian-900 p-2 rounded-2xl border border-slate-100 dark:border-obsidian-800 shadow-sm">
         <div class="px-4 py-2 border-r border-slate-50 dark:border-obsidian-800 text-center">
            <p class="text-[10px] font-black text-slate-400 uppercase tracking-tighter leading-none mb-1">Total Orders</p>
            <p class="text-xl font-black text-slate-900 dark:text-white">{{ orderStore.orders.length }}</p>
         </div>
         <div class="px-4 py-2 text-center">
            <p class="text-[10px] font-black text-slate-400 uppercase tracking-tighter leading-none mb-1">Revenue</p>
            <p class="text-xl font-black text-primary-700 dark:text-primary-400">{{ formatPrice(orderStore.orders.reduce((sum, o) => sum + o.total, 0)) }}</p>
         </div>
      </div>
    </header>

    <div class="premium-card p-0 overflow-hidden shadow-2xl">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50 dark:bg-obsidian-950/50 border-b border-slate-100 dark:border-obsidian-800">
              <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Order ID</th>
              <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Customer</th>
              <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Date</th>
              <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Items</th>
              <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Amount</th>
              <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Status</th>
              <th class="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50 dark:divide-obsidian-800">
            <tr v-for="order in orderStore.orders" :key="order.id" class="group hover:bg-slate-50/50 dark:hover:bg-obsidian-800/30 transition-colors">
              <td class="px-8 py-6">
                <span class="font-bold text-slate-900 dark:text-white">#{{ order.id }}</span>
              </td>
              <td class="px-8 py-6">
                <div class="flex flex-col">
                  <span class="font-bold text-slate-900 dark:text-white leading-tight">{{ order.shipping.fullName }}</span>
                  <span class="text-xs text-slate-400 dark:text-obsidian-500 font-medium">{{ order.shipping.email }}</span>
                </div>
              </td>
              <td class="px-8 py-6">
                <span class="text-sm font-medium text-slate-500 dark:text-obsidian-400">{{ formatDate(order.date) }}</span>
              </td>
              <td class="px-8 py-6">
                <div class="flex -space-x-3">
                  <div v-for="item in order.items.slice(0, 3)" :key="item.id" class="w-10 h-10 rounded-xl bg-white p-1 border-2 border-slate-50 dark:border-obsidian-800 shadow-sm flex items-center justify-center">
                    <img :src="item.image" class="max-h-full max-w-full object-contain mix-blend-multiply" />
                  </div>
                  <div v-if="order.items.length > 3" class="w-10 h-10 rounded-xl bg-slate-100 dark:bg-obsidian-800 border-2 border-slate-50 dark:border-obsidian-700 flex items-center justify-center text-[10px] font-black text-slate-500 dark:text-obsidian-400">
                    +{{ order.items.length - 3 }}
                  </div>
                </div>
              </td>
              <td class="px-8 py-6">
                <span class="font-black text-slate-900 dark:text-white">{{ formatPrice(order.total) }}</span>
              </td>
              <td class="px-8 py-6">
                <span class="px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest inline-block shadow-sm" :class="getStatusClass(order.status)">
                  {{ order.status }}
                </span>
              </td>
              <td class="px-8 py-6">
                <select 
                  @change="orderStore.updateOrderStatus(order.id, $event.target.value)"
                  class="bg-slate-100 dark:bg-obsidian-800 border-transparent rounded-xl text-xs font-bold text-slate-700 dark:text-obsidian-200 focus:ring-2 focus:ring-primary-500 outline-none p-2 cursor-pointer"
                >
                  <option v-for="opt in statusOptions" :key="opt" :value="opt" :selected="order.status === opt">{{ opt }}</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
        
        <div v-if="orderStore.orders.length === 0" class="text-center py-20">
           <p class="text-slate-400 font-bold italic">No orders received yet.</p>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>
