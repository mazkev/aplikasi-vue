<script setup>
import { useCartStore } from '../stores/cart'
import FrontLayout from '../layouts/FrontLayout.vue'

const cartStore = useCartStore()

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
        <h1 class="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Shopping Bag</h1>
        <p v-if="cartStore.items.length" class="text-slate-500 dark:text-obsidian-400 font-medium">You have {{ cartStore.totalItems }} items in your bag.</p>
      </header>

      <div v-if="cartStore.items.length === 0" class="text-center py-32 bg-white dark:bg-obsidian-900 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-obsidian-800">
        <div class="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-slate-50 dark:bg-obsidian-800 text-slate-300 dark:text-obsidian-700 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
        </div>
        <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-2">Your bag is empty</h2>
        <p class="text-slate-500 dark:text-obsidian-400 mb-8">Looks like you haven't added anything to your bag yet.</p>
        <router-link :to="{ name: 'home' }" class="premium-btn inline-block">Start Shopping</router-link>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        <!-- Items List -->
        <div class="lg:col-span-2 space-y-6">
          <div v-for="item in cartStore.items" :key="item.id" class="premium-card flex flex-col sm:flex-row items-center gap-8 p-8 hover:translate-y-0 shadow-lg">
            <div class="w-32 h-32 flex-shrink-0 bg-white dark:bg-slate-200 p-4 rounded-2xl flex items-center justify-center border border-slate-50 dark:border-obsidian-800">
              <img :src="item.image" :alt="item.title" class="max-h-full max-w-full object-contain mix-blend-multiply" />
            </div>
            
            <div class="flex-grow text-center sm:text-left">
              <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-1 leading-tight">{{ item.title }}</h3>
              <p class="text-sm font-bold text-slate-400 dark:text-obsidian-500 uppercase tracking-widest mb-4">{{ item.category }}</p>
              
              <div class="flex items-center justify-center sm:justify-start gap-6">
                <div class="flex items-center bg-slate-100 dark:bg-obsidian-950 rounded-xl p-1">
                  <button @click="cartStore.updateQuantity(item.id, item.quantity - 1)" class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white dark:hover:bg-obsidian-800 transition-colors text-slate-600 dark:text-obsidian-400 font-bold">-</button>
                  <span class="w-10 text-center font-bold text-slate-900 dark:text-white">{{ item.quantity }}</span>
                  <button @click="cartStore.updateQuantity(item.id, item.quantity + 1)" class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white dark:hover:bg-obsidian-800 transition-colors text-slate-600 dark:text-obsidian-400 font-bold">+</button>
                </div>
                
                <div class="h-8 w-px bg-slate-200 dark:bg-obsidian-800"></div>
                
                <span class="text-xl font-black text-primary-700 dark:text-primary-400">{{ formatPrice(item.price * item.quantity) }}</span>
              </div>
            </div>

            <button @click="cartStore.removeFromCart(item.id)" class="p-4 text-slate-300 dark:text-obsidian-700 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-2xl transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
          </div>
        </div>

        <!-- Summary -->
        <div class="premium-card p-8 bg-white dark:bg-obsidian-900 border-2 border-primary-50 dark:border-primary-900/20 shadow-xl">
          <h2 class="text-2xl font-black text-slate-900 dark:text-white mb-8 tracking-tight">Order Summary</h2>
          
          <div class="space-y-4 mb-8">
            <div class="flex justify-between text-slate-600 dark:text-obsidian-400">
              <span class="font-medium">Subtotal</span>
              <span class="font-bold">{{ formatPrice(cartStore.totalPrice) }}</span>
            </div>
            <div class="flex justify-between text-slate-600 dark:text-obsidian-400">
              <span class="font-medium">Shipping</span>
              <span class="font-bold text-green-600 dark:text-green-400 uppercase tracking-widest text-[10px] bg-green-50 dark:bg-green-950/30 px-2 py-1 rounded-md">Free</span>
            </div>
          </div>
          
          <div class="h-px bg-slate-100 dark:bg-obsidian-800 mb-6"></div>
          
          <div class="flex justify-between items-end mb-10">
            <span class="text-slate-900 dark:text-white font-bold uppercase tracking-widest text-xs">Total Amount</span>
            <span class="text-3xl font-black text-primary-700 dark:text-primary-400 leading-none">{{ formatPrice(cartStore.totalPrice) }}</span>
          </div>

          <router-link :to="{ name: 'checkout' }" class="w-full premium-btn h-16 text-lg shadow-xl shadow-primary-200 dark:shadow-none flex items-center justify-center">
            Proceed to Checkout
          </router-link>
        </div>
      </div>
    </main>
  </FrontLayout>
</template>
