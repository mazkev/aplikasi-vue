<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useThemeStore } from '../stores/theme'

const router = useRouter()
const auth = useAuthStore()
const theme = useThemeStore()

function handleLogout() {
  auth.logout()
  router.push({ name: 'login' })
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 dark:bg-obsidian-950 flex transition-colors duration-300">
    <!-- Sidebar -->
    <aside class="w-72 bg-white dark:bg-obsidian-900 border-r border-slate-100 dark:border-obsidian-800 flex flex-col fixed inset-y-0 z-50">
      <div class="p-8">
        <router-link :to="{ name: 'admin-orders' }" class="flex items-center gap-3">
          <div class="bg-primary-600 p-2 rounded-xl shadow-lg shadow-primary-200 dark:shadow-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <span class="text-xl font-black text-slate-900 dark:text-white tracking-tight">MazAdmin</span>
        </router-link>
      </div>

      <nav class="flex-grow px-4 space-y-2">
        <router-link 
          :to="{ name: 'admin-orders' }" 
          class="flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all"
          :class="router.currentRoute.value.name === 'admin-orders' 
            ? 'bg-primary-50 dark:bg-primary-950/20 text-primary-600 dark:text-primary-400' 
            : 'text-slate-500 dark:text-obsidian-400 hover:bg-slate-50 dark:hover:bg-obsidian-800 hover:text-slate-900 dark:hover:text-white'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
          Orders
        </router-link>

        <router-link 
          :to="{ name: 'admin-inventory' }" 
          class="flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all"
          :class="router.currentRoute.value.name === 'admin-inventory' 
            ? 'bg-primary-50 dark:bg-primary-950/20 text-primary-600 dark:text-primary-400' 
            : 'text-slate-500 dark:text-obsidian-400 hover:bg-slate-50 dark:hover:bg-obsidian-800 hover:text-slate-900 dark:hover:text-white'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
          Inventory
        </router-link>
        
        <div class="pt-8 px-4 mb-2">
          <p class="text-[10px] font-black text-slate-400 dark:text-obsidian-600 uppercase tracking-widest">Storefront</p>
        </div>
        
        <router-link 
          :to="{ name: 'home' }" 
          class="flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-sm text-slate-500 dark:text-obsidian-400 hover:bg-slate-50 dark:hover:bg-obsidian-800 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
          Go to Store
        </router-link>
      </nav>

      <div class="p-6 border-t border-slate-100 dark:border-obsidian-800">
        <div class="flex items-center gap-3 p-3 bg-slate-50 dark:bg-obsidian-950 rounded-2xl mb-4">
          <div class="w-10 h-10 rounded-xl bg-primary-600 text-white flex items-center justify-center font-bold">
            {{ auth.name.charAt(0) }}
          </div>
          <div class="flex-grow overflow-hidden">
            <p class="text-xs font-bold text-slate-900 dark:text-white truncate">{{ auth.name }}</p>
            <p class="text-[10px] font-medium text-slate-400 truncate">{{ auth.userInfo.email }}</p>
          </div>
        </div>
        
        <button 
          @click="handleLogout"
          class="w-full flex items-center justify-center gap-2 py-3 text-xs font-black text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          Logout
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-grow ml-72">
      <header class="h-20 bg-white/80 dark:bg-obsidian-900/80 backdrop-blur-xl border-b border-slate-100 dark:border-obsidian-800 sticky top-0 z-40 flex items-center justify-between px-8">
        <h2 class="text-sm font-black text-slate-400 dark:text-obsidian-500 uppercase tracking-widest">Dashboard</h2>
        
        <div class="flex items-center gap-4">
           <!-- Theme Toggle -->
          <button 
            @click="theme.toggleDark()" 
            class="p-2.5 text-slate-500 dark:text-obsidian-400 hover:bg-slate-100 dark:hover:bg-obsidian-800 rounded-xl transition-all"
          >
            <svg v-if="theme.isDark" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" /></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
          </button>
        </div>
      </header>
      
      <div class="p-8">
        <slot />
      </div>
    </main>
  </div>
</template>
