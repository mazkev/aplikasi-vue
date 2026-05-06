<script setup>
import { useAuthStore } from '../stores/auth'
import FrontLayout from '../layouts/FrontLayout.vue'

const auth = useAuthStore()
</script>

<template>
  <FrontLayout>
    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header class="mb-12 text-center">
        <div class="relative inline-block mb-6">
          <div class="w-32 h-32 rounded-[2.5rem] bg-primary-600 flex items-center justify-center text-white text-5xl font-black shadow-2xl shadow-primary-200 dark:shadow-none animate-in zoom-in duration-700">
            {{ auth.name.charAt(0) }}
          </div>
          <div class="absolute -bottom-2 -right-2 bg-white dark:bg-obsidian-800 p-3 rounded-2xl shadow-xl border border-slate-100 dark:border-obsidian-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-600 dark:text-primary-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </div>
        </div>
        <h1 class="text-4xl font-black text-slate-900 dark:text-white mb-1">{{ auth.name }}</h1>
        <p class="text-slate-500 dark:text-obsidian-400 font-medium">{{ auth.userInfo.email }}</p>
        
        <div class="mt-8 flex justify-center gap-4">
          <router-link :to="{ name: 'edit-profile' }" class="premium-btn px-8">Edit Profile</router-link>
          <router-link :to="{ name: 'order-history' }" class="px-8 py-2.5 bg-slate-100 dark:bg-obsidian-900 text-slate-700 dark:text-obsidian-200 rounded-2xl font-bold hover:bg-slate-200 dark:hover:bg-obsidian-800 transition-all">My Orders</router-link>
        </div>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Personal Details -->
        <div class="premium-card">
          <h2 class="text-xl font-black text-slate-900 dark:text-white flex items-center gap-3 mb-8">
            <div class="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-950/20 flex items-center justify-center text-primary-600 dark:text-primary-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            Profile Details
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
            <div>
              <label class="text-[10px] font-black text-slate-400 dark:text-obsidian-500 uppercase tracking-widest block mb-1">Username</label>
              <p class="font-bold text-slate-800 dark:text-obsidian-100">@{{ auth.userInfo.username }}</p>
            </div>
            <div>
              <label class="text-[10px] font-black text-slate-400 dark:text-obsidian-500 uppercase tracking-widest block mb-1">Birthday</label>
              <p class="font-bold text-slate-800 dark:text-obsidian-100">{{ auth.userInfo.birthday }}</p>
            </div>
            <div>
              <label class="text-[10px] font-black text-slate-400 dark:text-obsidian-500 uppercase tracking-widest block mb-1">Age</label>
              <p class="font-bold text-slate-800 dark:text-obsidian-100">{{ auth.userInfo.age }} years</p>
            </div>
            <div>
              <label class="text-[10px] font-black text-slate-400 dark:text-obsidian-500 uppercase tracking-widest block mb-1">Education</label>
              <p class="font-bold text-slate-800 dark:text-obsidian-100">{{ auth.userInfo.education }}</p>
            </div>
          </div>
        </div>

        <!-- Security -->
        <div class="premium-card flex flex-col">
          <h2 class="text-xl font-black text-slate-900 dark:text-white flex items-center gap-3 mb-8">
            <div class="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/20 flex items-center justify-center text-orange-600 dark:text-orange-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.042 12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            Security
          </h2>
          <p class="text-slate-500 dark:text-obsidian-400 text-sm mb-auto">Your account is protected by industry-standard encryption. Keep your password fresh to maintain maximum security.</p>
          <div class="mt-8 pt-8 border-t border-slate-50 dark:border-obsidian-800">
            <router-link :to="{ name: 'changepassword' }" class="flex items-center justify-between group">
              <span class="font-bold text-slate-700 dark:text-obsidian-200 group-hover:text-primary-600 transition-colors">Update Password</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-400 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
            </router-link>
          </div>
        </div>
      </div>
    </main>
  </FrontLayout>
</template>
