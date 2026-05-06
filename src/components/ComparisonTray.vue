<script setup>
import { useComparisonStore } from '../stores/comparison'
import { useRouter } from 'vue-router'

const comparisonStore = useComparisonStore()
const router = useRouter()

function goToComparison() {
  router.push({ name: 'comparison' })
}
</script>

<template>
  <Transition
    enter-active-class="transform transition ease-out duration-500"
    enter-from-class="translate-y-full opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transform transition ease-in duration-300"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="translate-y-full opacity-0"
  >
    <div v-if="comparisonStore.totalItems > 0" class="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] w-full max-w-3xl px-4">
      <div class="bg-white/80 dark:bg-obsidian-900/80 backdrop-blur-2xl border border-white/20 dark:border-obsidian-700/50 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] p-4 flex items-center justify-between gap-6">
        <div class="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
          <div v-for="item in comparisonStore.items" :key="item.id" class="relative group flex-shrink-0">
            <div class="w-16 h-16 bg-white dark:bg-slate-200 rounded-2xl p-2 flex items-center justify-center border border-slate-100 dark:border-obsidian-800 shadow-sm overflow-hidden">
               <img :src="item.image" class="max-h-full max-w-full object-contain mix-blend-multiply" />
            </div>
            <button 
              @click="comparisonStore.removeFromCompare(item.id)"
              class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          
          <div v-if="comparisonStore.totalItems < 4" v-for="i in (4 - comparisonStore.totalItems)" :key="i" class="w-16 h-16 rounded-2xl border-2 border-dashed border-slate-200 dark:border-obsidian-800 flex items-center justify-center text-slate-300 dark:text-obsidian-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
          </div>
        </div>

        <div class="flex items-center gap-4">
          <div class="hidden sm:block text-right">
            <p class="text-[10px] font-black text-slate-400 dark:text-obsidian-500 uppercase tracking-widest leading-none mb-1">Comparing</p>
            <p class="text-sm font-bold text-slate-900 dark:text-white leading-none">{{ comparisonStore.totalItems }} / 4 Items</p>
          </div>
          
          <button 
            @click="goToComparison"
            class="premium-btn px-8 py-4 h-14 rounded-2xl flex items-center gap-2"
          >
            Compare Now
          </button>
          
          <button @click="comparisonStore.clearComparison()" class="p-4 text-slate-400 hover:text-red-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
