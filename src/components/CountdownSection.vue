<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const timeLeft = ref({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0
})

let timer = null

function updateCountdown() {
  const targetDate = new Date()
  targetDate.setDate(targetDate.getDate() + 3) // 3 days from now
  targetDate.setHours(0, 0, 0, 0)

  const now = new Date().getTime()
  const distance = targetDate.getTime() - now

  timeLeft.value = {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((distance % (1000 * 60)) / 1000)
  }
}

onMounted(() => {
  updateCountdown()
  timer = setInterval(updateCountdown, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<template>
  <section class="relative w-full py-20 overflow-hidden mb-20 rounded-[3rem] bg-obsidian-950 border border-white/5">
    <!-- Background Decor -->
    <div class="absolute -right-20 -top-20 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl"></div>
    <div class="absolute -left-20 -bottom-20 w-80 h-80 bg-primary-600/10 rounded-full blur-3xl"></div>
    
    <div class="relative z-10 max-w-7xl mx-auto px-8 flex flex-col items-center text-center">
      <span class="px-4 py-1.5 bg-primary-600/20 text-primary-400 text-[10px] font-black uppercase tracking-[0.4em] rounded-full mb-8 border border-primary-500/20">Limited Edition Drop</span>
      
      <h2 class="text-6xl md:text-8xl font-black text-white tracking-tighter mb-12">Obsidian Night <span class="text-primary-500">Collection</span></h2>
      
      <div class="flex items-center gap-4 md:gap-12 mb-16">
        <div v-for="(val, unit) in timeLeft" :key="unit" class="flex flex-col items-center">
          <div class="w-20 md:w-32 h-24 md:h-36 bg-white/5 backdrop-blur-xl rounded-[2rem] border border-white/10 flex items-center justify-center mb-4 shadow-2xl">
            <span class="text-4xl md:text-6xl font-black text-white tabular-nums">{{ val.toString().padStart(2, '0') }}</span>
          </div>
          <span class="text-[10px] md:text-xs font-black text-slate-500 uppercase tracking-[0.3em]">{{ unit }}</span>
        </div>
      </div>

      <div class="flex flex-col md:flex-row items-center gap-6">
        <button class="premium-btn px-12 py-5 text-lg shadow-2xl shadow-primary-500/20">Notify Me When Live</button>
        <button class="px-12 py-5 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-black transition-all border border-white/10">View Collection Preview</button>
      </div>
    </div>
    
    <!-- Floating Particles Simulation -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
       <div v-for="i in 10" :key="i" 
            class="absolute bg-white rounded-full blur-sm animate-pulse"
            :style="{ 
              width: Math.random() * 4 + 'px', 
              height: Math.random() * 4 + 'px',
              top: Math.random() * 100 + '%', 
              left: Math.random() * 100 + '%',
              animationDelay: Math.random() * 5 + 's'
            }"
       ></div>
    </div>
  </section>
</template>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}
</style>
