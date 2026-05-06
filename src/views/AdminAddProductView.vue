<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '../stores/products'
import AdminLayout from '../layouts/AdminLayout.vue'

const router = useRouter()
const productStore = useProductStore()

const formData = ref({
  title: '',
  price: '',
  description: '',
  category: 'electronics',
  image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop',
  quantity: 100
})

const isLoading = ref(false)

async function handleSubmit() {
  isLoading.value = true
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800))
  
  productStore.addProduct({
    ...formData.value,
    price: parseFloat(formData.value.price)
  })
  
  router.push({ name: 'admin-inventory' })
}
</script>

<template>
  <AdminLayout>
    <div class="p-8 max-w-4xl">
      <header class="mb-10">
        <div class="flex items-center gap-3 mb-2">
           <router-link :to="{ name: 'admin-inventory' }" class="text-slate-400 hover:text-primary-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
           </router-link>
           <h1 class="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Add New Product</h1>
        </div>
        <p class="text-slate-500 dark:text-obsidian-400 font-medium">Expand the MazMarket catalog with premium selections.</p>
      </header>

      <div class="premium-card p-10">
        <form @submit.prevent="handleSubmit" class="space-y-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="md:col-span-2">
              <label class="block text-[10px] font-black text-slate-400 dark:text-obsidian-500 uppercase tracking-[0.2em] mb-3 ml-1">Product Title</label>
              <input v-model="formData.title" type="text" class="premium-input h-14" placeholder="e.g. Obsidian Elite Smartwatch" required />
            </div>

            <div>
              <label class="block text-[10px] font-black text-slate-400 dark:text-obsidian-500 uppercase tracking-[0.2em] mb-3 ml-1">Category</label>
              <select v-model="formData.category" class="premium-input h-14 appearance-none">
                <option v-for="cat in productStore.categories.filter(c => c !== 'All')" :key="cat" :value="cat">{{ cat }}</option>
              </select>
            </div>

            <div>
              <label class="block text-[10px] font-black text-slate-400 dark:text-obsidian-500 uppercase tracking-[0.2em] mb-3 ml-1">Price (IDR)</label>
              <input v-model="formData.price" type="number" class="premium-input h-14" placeholder="1500000" required />
            </div>

            <div>
              <label class="block text-[10px] font-black text-slate-400 dark:text-obsidian-500 uppercase tracking-[0.2em] mb-3 ml-1">Stock Quantity</label>
              <input v-model="formData.quantity" type="number" class="premium-input h-14" placeholder="100" required />
            </div>

            <div>
              <label class="block text-[10px] font-black text-slate-400 dark:text-obsidian-500 uppercase tracking-[0.2em] mb-3 ml-1">Image URL</label>
              <input v-model="formData.image" type="url" class="premium-input h-14" placeholder="https://..." required />
            </div>

            <div class="md:col-span-2">
              <label class="block text-[10px] font-black text-slate-400 dark:text-obsidian-500 uppercase tracking-[0.2em] mb-3 ml-1">Description</label>
              <textarea v-model="formData.description" class="premium-input min-h-[150px] py-5" placeholder="Tell the story behind this product..." required></textarea>
            </div>
          </div>

          <div class="flex justify-end pt-6">
            <button type="submit" :disabled="isLoading" class="premium-btn px-12 py-5 text-lg flex items-center gap-3">
              <svg v-if="isLoading" class="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              {{ isLoading ? 'Adding Product...' : 'Publish Product' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </AdminLayout>
</template>
