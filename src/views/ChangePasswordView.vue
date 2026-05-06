<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import Navbar from '../components/Navbar.vue'

const router = useRouter()
const auth = useAuthStore()

const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const error = ref('')
const success = ref('')
const isLoading = ref(false)

async function handleChangePassword() {
  if (currentPassword.value !== auth.userInfo.password) {
    error.value = 'Incorrect current password'
    return
  }
  if (newPassword.value !== confirmPassword.value) {
    error.value = 'Passwords do not match'
    return
  }
  if (newPassword.value.length < 4) {
    error.value = 'Password must be at least 4 characters'
    return
  }

  isLoading.value = true
  error.value = ''
  
  // Simulate delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  auth.setPassword(newPassword.value)
  success.value = 'Password changed successfully!'
  isLoading.value = false

  setTimeout(() => {
    router.push({ name: 'account' })
  }, 1500)
}
</script>

<template>
  <div class="min-h-screen">
    <Navbar />
    
    <main class="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="premium-card">
        <header class="mb-8">
          <h1 class="text-2xl font-bold text-slate-900">Security Settings</h1>
          <p class="text-slate-500">Update your password to keep your account secure.</p>
        </header>

        <form @submit.prevent="handleChangePassword" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">Current Password</label>
            <input 
              v-model="currentPassword" 
              type="password" 
              required 
              class="premium-input" 
              placeholder="••••••••"
            />
          </div>

          <div class="h-px bg-slate-100 my-2"></div>

          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">New Password</label>
            <input 
              v-model="newPassword" 
              type="password" 
              required 
              class="premium-input" 
              placeholder="••••••••"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700 mb-1">Confirm New Password</label>
            <input 
              v-model="confirmPassword" 
              type="password" 
              required 
              class="premium-input" 
              placeholder="••••••••"
            />
          </div>

          <div v-if="error" class="p-3 text-sm text-red-600 bg-red-50 rounded-xl border border-red-100">
            {{ error }}
          </div>

          <div v-if="success" class="p-3 text-sm text-green-600 bg-green-50 rounded-xl border border-green-100">
            {{ success }}
          </div>

          <div class="flex items-center justify-end gap-4 pt-4">
            <router-link :to="{ name: 'account' }" class="text-slate-500 font-semibold hover:text-slate-700 transition-colors">Cancel</router-link>
            <button 
              type="submit" 
              :disabled="isLoading"
              class="premium-btn flex items-center justify-center min-w-[140px]"
            >
              <svg v-if="isLoading" class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ isLoading ? 'Updating...' : 'Save Changes' }}
            </button>
          </div>
        </form>
      </div>
    </main>
  </div>
</template>
