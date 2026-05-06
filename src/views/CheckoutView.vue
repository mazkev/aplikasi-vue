<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'
import { useOrderStore } from '../stores/orders'
import FrontLayout from '../layouts/FrontLayout.vue'

const router = useRouter()
const cartStore = useCartStore()
const orderStore = useOrderStore()

const step = ref(1)
const isLoading = ref(false)

const shippingInfo = ref({
  fullName: '',
  email: '',
  address: '',
  city: '',
  zip: ''
})

const paymentInfo = ref({
  cardNumber: '',
  expiry: '',
  cvv: ''
})

const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(price)
}

async function nextStep() {
  if (step.value === 3) {
    isLoading.value = true
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Save order
    orderStore.addOrder({
      items: JSON.parse(JSON.stringify(cartStore.items)),
      total: cartStore.totalPrice,
      shipping: shippingInfo.value,
      payment: {
        method: 'Card',
        last4: paymentInfo.value.cardNumber.slice(-4)
      }
    })

    cartStore.clearCart()
    router.push({ name: 'order-success' })
  } else {
    step.value++
  }
}
</script>

<template>
  <FrontLayout>
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <!-- Main Checkout Form -->
        <div class="lg:col-span-2">
          <!-- Stepper -->
          <div class="flex items-center justify-between mb-12 px-4 max-w-md mx-auto">
            <div v-for="i in 3" :key="i" class="flex items-center">
              <div 
                class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all"
                :class="step >= i ? 'bg-primary-600 text-white shadow-lg shadow-primary-100 dark:shadow-none' : 'bg-slate-200 dark:bg-obsidian-800 text-slate-400 dark:text-obsidian-500'"
              >
                {{ i }}
              </div>
              <div v-if="i < 3" class="w-16 sm:w-24 h-1 mx-2 rounded-full transition-all" :class="step > i ? 'bg-primary-600' : 'bg-slate-200 dark:bg-obsidian-800'"></div>
            </div>
          </div>

          <div class="premium-card p-10">
            <!-- Step 1: Shipping -->
            <div v-if="step === 1" class="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 class="text-2xl font-black text-slate-900 dark:text-white mb-8 tracking-tight">Shipping Information</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="md:col-span-2">
                  <label class="block text-sm font-bold text-slate-400 dark:text-obsidian-500 uppercase tracking-widest mb-2">Full Name</label>
                  <input v-model="shippingInfo.fullName" type="text" placeholder="John Doe" class="premium-input" />
                </div>
                <div class="md:col-span-2">
                  <label class="block text-sm font-bold text-slate-400 dark:text-obsidian-500 uppercase tracking-widest mb-2">Email Address</label>
                  <input v-model="shippingInfo.email" type="email" placeholder="john@example.com" class="premium-input" />
                </div>
                <div class="md:col-span-2">
                  <label class="block text-sm font-bold text-slate-400 dark:text-obsidian-500 uppercase tracking-widest mb-2">Street Address</label>
                  <input v-model="shippingInfo.address" type="text" placeholder="123 Luxury Ave" class="premium-input" />
                </div>
                <div>
                  <label class="block text-sm font-bold text-slate-400 dark:text-obsidian-500 uppercase tracking-widest mb-2">City</label>
                  <input v-model="shippingInfo.city" type="text" placeholder="Jakarta" class="premium-input" />
                </div>
                <div>
                  <label class="block text-sm font-bold text-slate-400 dark:text-obsidian-500 uppercase tracking-widest mb-2">ZIP Code</label>
                  <input v-model="shippingInfo.zip" type="text" placeholder="10110" class="premium-input" />
                </div>
              </div>
            </div>

            <!-- Step 2: Payment -->
            <div v-if="step === 2" class="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <h2 class="text-2xl font-black text-slate-900 dark:text-white mb-8 tracking-tight">Payment Details</h2>
              <div class="p-10 bg-gradient-to-br from-obsidian-900 to-black rounded-[2rem] text-white mb-10 shadow-2xl relative overflow-hidden border border-white/5">
                <div class="relative z-10">
                   <div class="flex justify-between items-start mb-16">
                     <!-- Card Chip -->
                     <div class="w-14 h-10 bg-gradient-to-br from-slate-300 to-slate-500 rounded-xl relative shadow-inner overflow-hidden">
                        <div class="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-black via-transparent to-transparent"></div>
                        <div class="absolute inset-2 border border-black/10 rounded-md"></div>
                        <div class="absolute inset-y-0 left-1/2 w-px bg-black/10"></div>
                        <div class="absolute inset-x-0 top-1/2 h-px bg-black/10"></div>
                     </div>
                     <div class="text-right">
                        <span class="block text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-1 leading-none">MazMarket</span>
                        <span class="block text-[12px] font-black uppercase tracking-[0.2em] text-white leading-none">Obsidian Centurion</span>
                     </div>
                   </div>
                   
                   <div class="text-3xl font-bold tracking-[0.25em] mb-12 drop-shadow-xl font-mono text-slate-100">
                     {{ paymentInfo.cardNumber || '•••• •••• •••• ••••' }}
                   </div>
                   
                   <div class="flex justify-between items-end">
                      <div>
                        <p class="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">Card Member</p>
                        <p class="text-lg font-black uppercase tracking-tight text-white">{{ shippingInfo.fullName || 'ELITE MEMBER' }}</p>
                      </div>
                      <div class="text-right">
                        <p class="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">Valid Thru</p>
                        <p class="text-lg font-black tracking-tight text-white">{{ paymentInfo.expiry || 'MM/YY' }}</p>
                      </div>
                   </div>
                </div>
                
                <!-- Luxury Refraction Effects -->
                <div class="absolute -right-20 -top-20 w-96 h-96 bg-white/[0.03] rounded-full blur-3xl"></div>
                <div class="absolute -left-20 -bottom-20 w-80 h-80 bg-primary-500/[0.02] rounded-full blur-3xl"></div>
                <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none"></div>
              </div>
              <div class="space-y-6">
                <div>
                  <label class="block text-sm font-bold text-slate-400 dark:text-obsidian-500 uppercase tracking-widest mb-2">Card Number</label>
                  <input v-model="paymentInfo.cardNumber" type="text" placeholder="XXXX XXXX XXXX XXXX" class="premium-input" />
                </div>
                <div class="grid grid-cols-2 gap-6">
                  <div>
                    <label class="block text-sm font-bold text-slate-400 dark:text-obsidian-500 uppercase tracking-widest mb-2">Expiry Date</label>
                    <input v-model="paymentInfo.expiry" type="text" placeholder="MM/YY" class="premium-input" />
                  </div>
                  <div>
                    <label class="block text-sm font-bold text-slate-400 dark:text-obsidian-500 uppercase tracking-widest mb-2">CVV</label>
                    <input v-model="paymentInfo.cvv" type="text" placeholder="123" class="premium-input" />
                  </div>
                </div>
              </div>
            </div>

            <!-- Step 3: Review -->
            <div v-if="step === 3" class="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
               <h2 class="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Review Order</h2>
               <div class="space-y-4">
                  <div class="p-6 bg-slate-50 dark:bg-obsidian-950/50 rounded-2xl border border-slate-100 dark:border-obsidian-800">
                    <p class="text-xs font-black text-slate-400 dark:text-obsidian-500 uppercase tracking-widest mb-2">Shipping to</p>
                    <p class="font-bold text-slate-900 dark:text-white">{{ shippingInfo.fullName }}</p>
                    <p class="text-sm text-slate-600 dark:text-obsidian-400">{{ shippingInfo.address }}, {{ shippingInfo.city }} {{ shippingInfo.zip }}</p>
                  </div>
                  <div class="p-6 bg-slate-50 dark:bg-obsidian-950/50 rounded-2xl border border-slate-100 dark:border-obsidian-800">
                    <p class="text-xs font-black text-slate-400 dark:text-obsidian-500 uppercase tracking-widest mb-2">Payment via</p>
                    <p class="font-bold text-slate-900 dark:text-white">Card ending in {{ paymentInfo.cardNumber.slice(-4) }}</p>
                  </div>
               </div>
            </div>

            <div class="flex items-center justify-between mt-12 pt-8 border-t border-slate-50 dark:border-obsidian-800">
              <button 
                v-if="step > 1" 
                @click="step--"
                class="text-slate-400 dark:text-obsidian-500 font-bold hover:text-slate-600 dark:hover:text-obsidian-300 transition-colors px-6"
              >
                Back
              </button>
              <div v-else></div>
              
              <button 
                @click="nextStep"
                :disabled="isLoading"
                class="premium-btn min-w-[200px] flex items-center justify-center gap-2"
              >
                <svg v-if="isLoading" class="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                {{ step === 3 ? (isLoading ? 'Processing...' : 'Complete Purchase') : 'Next Step' }}
              </button>
            </div>
          </div>
        </div>

        <!-- Summary Sidebar -->
        <div class="space-y-6">
          <div class="premium-card p-8 shadow-xl">
            <h2 class="text-xl font-black text-slate-900 dark:text-white mb-6">Order Details</h2>
            <div class="space-y-4 mb-6 max-h-64 overflow-y-auto no-scrollbar">
              <div v-for="item in cartStore.items" :key="item.id" class="flex gap-4 items-center">
                 <div class="w-12 h-12 bg-white rounded-lg flex-shrink-0 p-1 border border-slate-50 dark:border-obsidian-800">
                   <img :src="item.image" class="w-full h-full object-contain mix-blend-multiply" />
                 </div>
                 <div class="flex-grow">
                   <p class="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">{{ item.title }}</p>
                   <p class="text-[10px] text-slate-400 dark:text-obsidian-500 font-bold">Qty: {{ item.quantity }}</p>
                 </div>
                 <p class="text-sm font-black text-slate-900 dark:text-white">{{ formatPrice(item.price * item.quantity) }}</p>
              </div>
            </div>
            <div class="h-px bg-slate-50 dark:bg-obsidian-800 mb-6"></div>
            <div class="space-y-3 mb-8">
              <div class="flex justify-between text-slate-500 dark:text-obsidian-400 text-sm font-medium">
                <span>Subtotal</span>
                <span>{{ formatPrice(cartStore.totalPrice) }}</span>
              </div>
              <div class="flex justify-between text-slate-500 dark:text-obsidian-400 text-sm font-medium">
                <span>Shipping</span>
                <span class="text-green-600 dark:text-green-400 font-bold">Free</span>
              </div>
            </div>
            <div class="flex justify-between items-end">
              <span class="text-xs font-black text-slate-400 dark:text-obsidian-500 uppercase tracking-widest">Total</span>
              <span class="text-2xl font-black text-primary-700 dark:text-primary-400">{{ formatPrice(cartStore.totalPrice) }}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  </FrontLayout>
</template>

<style scoped>
.animate-in {
  animation: animate-in 0.5s ease-out;
}
@keyframes animate-in {
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
}
.no-scrollbar::-webkit-scrollbar { display: none; }
</style>
