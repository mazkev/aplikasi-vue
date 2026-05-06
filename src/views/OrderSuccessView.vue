<script setup>
import { useRouter } from 'vue-router'
import Navbar from '../components/Navbar.vue'

const router = useRouter()
const orderNumber = Math.floor(Math.random() * 1000000).toString().padStart(8, '0')
</script>

<template>
  <div class="min-h-screen">
    <Navbar />
    
    <main class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <div class="premium-card p-12 bg-white flex flex-col items-center">
        <div class="w-24 h-24 bg-green-100 text-green-600 rounded-[2rem] flex items-center justify-center mb-8 animate-bounce shadow-xl shadow-green-100">
           <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" /></svg>
        </div>
        
        <h1 class="text-4xl font-black text-slate-900 mb-4 tracking-tight">Order Successful!</h1>
        <p class="text-lg text-slate-500 mb-8 max-w-md mx-auto">Thank you for your purchase. Your premium order is being processed and will be shipped shortly.</p>
        
        <div class="p-6 bg-slate-50 rounded-3xl border border-slate-100 mb-12 w-full max-w-sm">
           <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Order Number</p>
           <p class="text-2xl font-black text-primary-700">#{{ orderNumber }}</p>
        </div>
        
        <div class="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <router-link :to="{ name: 'home' }" class="premium-btn px-10">Continue Shopping</router-link>
          <button class="px-10 py-4 bg-slate-100 text-slate-700 rounded-2xl font-bold hover:bg-slate-200 transition-all">Track Order</button>
        </div>
      </div>
      
      <p class="mt-8 text-sm font-bold text-slate-400">A confirmation email has been sent to your inbox.</p>
    </main>
  </div>
</template>
