<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import Navbar from '../components/Navbar.vue'

const router = useRouter()
const auth = useAuthStore()

const formData = ref({
  name: auth.userInfo.name,
  email: auth.userInfo.email,
  username: auth.userInfo.username,
  birthday: auth.userInfo.birthday,
  education: auth.userInfo.education
})

const isLoading = ref(false)
const success = ref(false)

function handleSave() {
  isLoading.value = true
  setTimeout(() => {
    auth.updateUserInfo(formData.value)
    isLoading.value = false
    success.value = true
    setTimeout(() => {
      router.push({ name: 'account' })
    }, 1000)
  }, 800)
}
</script>

<template>
  <div class="min-h-screen">
    <Navbar />
    
    <main class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="premium-card p-10">
        <header class="mb-10">
          <h1 class="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Edit Profile</h1>
          <p class="text-slate-500 dark:text-obsidian-400 font-medium">Update your personal identification details.</p>
        </header>

        <form @submit.prevent="handleSave" class="space-y-6">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div class="sm:col-span-2">
              <label class="block text-[10px] font-black text-slate-400 dark:text-obsidian-500 uppercase tracking-widest mb-2">Full Name</label>
              <input v-model="formData.name" type="text" class="premium-input" required />
            </div>
            
            <div class="sm:col-span-2">
              <label class="block text-[10px] font-black text-slate-400 dark:text-obsidian-500 uppercase tracking-widest mb-2">Email Address</label>
              <input v-model="formData.email" type="email" class="premium-input" required />
            </div>

            <div>
              <label class="block text-[10px] font-black text-slate-400 dark:text-obsidian-500 uppercase tracking-widest mb-2">Username</label>
              <input v-model="formData.username" type="text" class="premium-input" required />
            </div>

            <div>
              <label class="block text-[10px] font-black text-slate-400 dark:text-obsidian-500 uppercase tracking-widest mb-2">Birthday</label>
              <input v-model="formData.birthday" type="text" class="premium-input" placeholder="e.g. 28 Apr 1998" required />
            </div>

            <div class="sm:col-span-2">
              <label class="block text-[10px] font-black text-slate-400 dark:text-obsidian-500 uppercase tracking-widest mb-2">Education</label>
              <select v-model="formData.education" class="premium-input appearance-none">
                <option value="Sarjana">Sarjana (S1)</option>
                <option value="Magister">Magister (S2)</option>
                <option value="Doctor">Doctor (S3)</option>
                <option value="Diploma">Diploma</option>
                <option value="SMA">SMA/Sederajat</option>
              </select>
            </div>
          </div>

          <div v-if="success" class="p-4 bg-green-50 dark:bg-green-950/20 text-green-600 dark:text-green-400 rounded-2xl border border-green-100 dark:border-green-900 font-bold text-center animate-bounce">
            Profile updated successfully!
          </div>

          <div class="flex items-center justify-end gap-4 pt-8">
            <button type="button" @click="router.back()" class="text-slate-400 font-bold hover:text-slate-600 px-4 transition-colors">Cancel</button>
            <button type="submit" :disabled="isLoading" class="premium-btn min-w-[160px] flex items-center justify-center gap-2">
               <svg v-if="isLoading" class="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
               {{ isLoading ? 'Saving...' : 'Save Changes' }}
            </button>
          </div>
        </form>
      </div>
    </main>
  </div>
</template>
