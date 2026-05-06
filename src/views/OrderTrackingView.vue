<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useOrderStore } from '../stores/orders'
import FrontLayout from '../layouts/FrontLayout.vue'

const route = useRoute()
const orderStore = useOrderStore()

const order = computed(() => orderStore.orders.find(o => o.id == route.params.id))

const steps = [
  { id: 'Processing', label: 'Order Processing', description: 'We are preparing your premium items.', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
  { id: 'Quality', label: 'Quality Inspection', description: 'Ensuring your selection meets our standards.', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
  { id: 'Shipped', label: 'Out for Delivery', description: 'Your order is on its way to your doorstep.', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
  { id: 'Delivered', label: 'Delivered', description: 'Your premium selection has arrived.', icon: 'M5 13l4 4L19 7' }
]

const currentStepIndex = computed(() => {
  if (!order.value) return 0
  const status = order.value.status
  if (status === 'Processing') return 0
  if (status === 'Shipped') return 2
  if (status === 'Delivered') return 3
  if (status === 'Cancelled') return -1
  return 1 // Quality Inspection for anything else
})

const isCompleted = (index) => index <= currentStepIndex.value
const isCurrent = (index) => index === currentStepIndex.value
</script>

<template>
  <FrontLayout>
    <main class="max-w-4xl mx-auto px-4 py-12">
      <header class="mb-12">
        <div class="flex items-center gap-3 mb-2">
           <router-link :to="{ name: 'order-history' }" class="text-slate-400 hover:text-primary-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
           </router-link>
           <h1 class="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Track Your Journey</h1>
        </div>
        <p v-if="order" class="text-slate-500 dark:text-obsidian-400 font-medium">Order #{{ order.id }} • Placed on {{ order.date }}</p>
      </header>

      <div v-if="!order" class="premium-card p-20 text-center">
         <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">Order not found</h2>
         <router-link :to="{ name: 'order-history' }" class="premium-btn">Back to History</router-link>
      </div>

      <div v-else class="space-y-12">
        <!-- Progress Map -->
        <div class="premium-card p-10 bg-white/50 dark:bg-obsidian-900/50 backdrop-blur-xl relative">
          <div v-if="order.status === 'Cancelled'" class="text-center py-10">
             <div class="w-20 h-20 bg-red-100 dark:bg-red-950/30 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
             </div>
             <h3 class="text-2xl font-black text-red-500 mb-2">Order Cancelled</h3>
             <p class="text-slate-500 dark:text-obsidian-400">This order has been cancelled and is no longer being tracked.</p>
          </div>

          <div v-else class="relative">
            <!-- Timeline Line -->
            <div class="absolute left-8 top-0 bottom-0 w-1 bg-slate-100 dark:bg-obsidian-800"></div>
            <div class="absolute left-8 top-0 w-1 bg-primary-600 transition-all duration-1000" :style="{ height: (currentStepIndex / (steps.length - 1) * 100) + '%' }"></div>

            <div class="space-y-16 relative z-10">
              <div v-for="(step, index) in steps" :key="step.id" class="flex gap-10">
                <div class="w-16 h-16 rounded-full flex-shrink-0 flex items-center justify-center border-4 transition-all duration-500"
                  :class="[
                    isCompleted(index) 
                      ? 'bg-primary-600 border-primary-100 dark:border-primary-950 text-white shadow-xl shadow-primary-500/20' 
                      : 'bg-white dark:bg-obsidian-900 border-slate-100 dark:border-obsidian-800 text-slate-300 dark:text-obsidian-700'
                  ]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="step.icon" /></svg>
                </div>
                <div class="pt-2 flex-grow">
                   <h4 class="text-xl font-black mb-1 transition-colors" :class="isCompleted(index) ? 'text-slate-900 dark:text-white' : 'text-slate-300 dark:text-obsidian-700'">{{ step.label }}</h4>
                   <p class="text-sm font-medium transition-colors" :class="isCompleted(index) ? 'text-slate-500 dark:text-obsidian-400' : 'text-slate-300 dark:text-obsidian-800'">{{ step.description }}</p>
                   
                   <div v-if="isCurrent(index)" class="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-primary-50 dark:bg-primary-950/30 text-primary-600 dark:text-primary-400 rounded-full text-[10px] font-black uppercase tracking-widest animate-pulse">
                      <span class="w-1.5 h-1.5 bg-primary-600 rounded-full"></span>
                      Current Status
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary for context -->
        <div class="premium-card p-10">
           <h4 class="text-[10px] font-black text-slate-400 dark:text-obsidian-500 uppercase tracking-[0.2em] mb-6">Delivery Items</h4>
           <div class="space-y-6">
              <div v-for="item in order.items" :key="item.id" class="flex items-center gap-6">
                 <div class="w-16 h-16 bg-white dark:bg-slate-200 rounded-xl p-2 border border-slate-100 dark:border-obsidian-800">
                    <img :src="item.image" class="w-full h-full object-contain mix-blend-multiply" />
                 </div>
                 <div>
                    <p class="font-bold text-slate-900 dark:text-white">{{ item.title }}</p>
                    <p class="text-sm text-slate-500">{{ item.quantity }} units • {{ item.category }}</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </main>
  </FrontLayout>
</template>
