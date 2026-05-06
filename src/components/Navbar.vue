<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useCartStore } from '../stores/cart'
import { useWishlistStore } from '../stores/wishlist'
import { useProductStore } from '../stores/products'
import { useThemeStore } from '../stores/theme'

const router = useRouter()
const auth = useAuthStore()
const cart = useCartStore()
const wishlist = useWishlistStore()
const productStore = useProductStore()
const theme = useThemeStore()

function handleLogout() {
  auth.logout()
  router.push({ name: 'login' })
}

function focusSearch() {
  if (router.currentRoute.value.name !== 'home') {
    router.push({ name: 'home' })
  }
}
</script>

<template>
  <nav class="sticky top-0 z-50 glass">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-20 gap-4">
        <!-- Logo -->
        <div class="flex items-center flex-shrink-0">
          <router-link :to="{ name: 'home' }" class="flex items-center gap-2">
            <div class="bg-primary-600 p-2 rounded-xl shadow-lg shadow-primary-200 dark:shadow-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <span class="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-900 dark:from-primary-400 dark:to-primary-600 tracking-tight hidden lg:block">MazMarket</span>
          </router-link>
        </div>

        <!-- Search Bar -->
        <div class="flex-grow max-w-xl flex items-center">
          <div class="relative w-full">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-slate-400 dark:text-obsidian-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
              </svg>
            </div>
            <input 
              v-model="productStore.searchQuery"
              @focus="focusSearch"
              type="text" 
              placeholder="Search premium products..." 
              class="w-full pl-11 pr-4 py-3 bg-slate-100 dark:bg-obsidian-900 border-transparent rounded-2xl focus:bg-white dark:focus:bg-obsidian-800 focus:ring-2 focus:ring-primary-500/20 transition-all outline-none text-sm font-medium dark:text-obsidian-100"
            />
          </div>
        </div>
        
        <!-- Actions -->
        <div class="flex items-center gap-1 sm:gap-4">
          <!-- Theme Toggle -->
          <button 
            @click="theme.toggleDark()" 
            class="p-2.5 text-slate-500 dark:text-obsidian-400 hover:bg-slate-100 dark:hover:bg-obsidian-900 rounded-xl transition-all"
          >
            <svg v-if="theme.isDark" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" /></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
          </button>

          <router-link :to="{ name: 'wishlist' }" class="hidden sm:flex relative p-2.5 text-slate-500 dark:text-obsidian-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span v-if="wishlist.items.length" class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-obsidian-950"></span>
          </router-link>

          <router-link :to="{ name: 'cart' }" class="relative p-2.5 bg-slate-100 dark:bg-obsidian-900 text-slate-700 dark:text-obsidian-100 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-950/20 hover:text-primary-600 dark:hover:text-primary-400 transition-all group">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span v-if="cart.totalItems" class="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-primary-600 rounded-full border-2 border-white dark:border-obsidian-950 group-hover:scale-110 transition-transform">
              {{ cart.totalItems }}
            </span>
          </router-link>

          <div class="relative group">
            <button class="flex items-center gap-2 p-1.5 bg-slate-50 dark:bg-obsidian-900 border border-slate-100 dark:border-obsidian-800 rounded-2xl hover:bg-white dark:hover:bg-obsidian-800 hover:shadow-md transition-all">
              <div class="w-10 h-10 rounded-xl bg-primary-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                {{ auth.name.charAt(0) }}
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-400 dark:text-obsidian-500 mr-1 group-hover:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <div class="absolute right-0 w-64 mt-2 py-3 bg-white dark:bg-obsidian-900 rounded-[2rem] shadow-2xl border border-slate-100 dark:border-obsidian-800 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-top-right translate-y-2 group-hover:translate-y-0 z-50 overflow-hidden">
              <div class="px-5 py-3 border-b border-slate-50 dark:border-obsidian-800 mb-2">
                 <p class="text-[10px] font-black text-slate-400 dark:text-obsidian-500 uppercase tracking-widest mb-1">Authenticated</p>
                 <p class="text-sm font-bold text-slate-900 dark:text-obsidian-100 truncate">{{ auth.userInfo.email }}</p>
              </div>
              <router-link :to="{ name: 'account' }" class="flex items-center gap-3 px-5 py-3 text-sm font-bold text-slate-700 dark:text-obsidian-300 hover:bg-primary-50 dark:hover:bg-primary-950/20 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                My Profile
              </router-link>
              <router-link :to="{ name: 'order-history' }" class="flex items-center gap-3 px-5 py-3 text-sm font-bold text-slate-700 dark:text-obsidian-300 hover:bg-primary-50 dark:hover:bg-primary-950/20 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                Order History
              </router-link>
              <router-link v-if="auth.isAdmin" :to="{ name: 'admin-orders' }" class="flex items-center gap-3 px-5 py-3 text-sm font-bold text-slate-700 dark:text-obsidian-300 hover:bg-primary-50 dark:hover:bg-primary-950/20 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                Back Office
              </router-link>
              <div class="h-px bg-slate-100 dark:bg-obsidian-800 my-2"></div>
              <button @click="handleLogout" class="w-full flex items-center gap-3 px-5 py-3 text-sm font-black text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
