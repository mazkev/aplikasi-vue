<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useThemeStore } from '../stores/theme'

const router = useRouter()
const auth = useAuthStore()
const theme = useThemeStore()

const username = ref('string')
const password = ref('string')
const error = ref('')
const isLoading = ref(false)

async function handleLogin() {
  isLoading.value = true
  error.value = ''
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800))
  
  const success = auth.login(username.value, password.value)
  if (success) {
    router.push({ name: 'home' })
  } else {
    error.value = 'Invalid username or password'
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-obsidian-950 p-4 transition-colors duration-500">
    <!-- Theme Toggle Fixed -->
    <button @click="theme.toggleDark()" class="fixed top-8 right-8 p-3 bg-white dark:bg-obsidian-900 rounded-2xl shadow-xl border border-slate-100 dark:border-obsidian-800 text-slate-500 dark:text-obsidian-400 hover:scale-110 transition-all">
       <svg v-if="theme.isDark" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" /></svg>
       <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
    </button>

    <div class="w-full max-w-md animate-in fade-in zoom-in duration-700">
      <div class="text-center mb-10">
        <div class="inline-flex items-center justify-center w-20 h-20 bg-primary-600 rounded-[2rem] shadow-2xl shadow-primary-200 dark:shadow-none mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h1 class="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">Welcome Back</h1>
        <p class="text-slate-500 dark:text-obsidian-400 font-medium mt-2">Login to your premium account</p>
      </div>

      <div class="premium-card p-10 bg-white/70 dark:bg-obsidian-900/50 backdrop-blur-xl border-white dark:border-obsidian-800 shadow-2xl">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label class="block text-[10px] font-black text-slate-400 dark:text-obsidian-500 uppercase tracking-[0.2em] mb-2 ml-1">Username</label>
            <input 
              v-model="username" 
              type="text" 
              class="premium-input" 
              placeholder="Enter your username"
              required
            />
          </div>
          
          <div>
            <label class="block text-[10px] font-black text-slate-400 dark:text-obsidian-500 uppercase tracking-[0.2em] mb-2 ml-1">Password</label>
            <input 
              v-model="password" 
              type="password" 
              class="premium-input" 
              placeholder="••••••••"
              required
            />
          </div>

          <div v-if="error" class="text-sm font-bold text-red-500 bg-red-50 dark:bg-red-950/20 p-4 rounded-2xl border border-red-100 dark:border-red-900 text-center animate-shake">
            {{ error }}
          </div>

          <button 
            type="submit" 
            :disabled="isLoading"
            class="w-full premium-btn h-14 text-lg flex items-center justify-center gap-2 mt-4"
          >
            <svg v-if="isLoading" class="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            {{ isLoading ? 'Authenticating...' : 'Sign In' }}
          </button>
        </form>

        <div class="mt-10 text-center">
          <p class="text-sm text-slate-400 font-bold">Don't have an account? 
            <router-link :to="{ name: 'register' }" class="text-primary-600 hover:underline">Sign Up</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-shake {
  animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
}
@keyframes shake {
  10%, 90% { transform: translate3d(-1px, 0, 0); }
  20%, 80% { transform: translate3d(2px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
  40%, 60% { transform: translate3d(4px, 0, 0); }
}
</style>
