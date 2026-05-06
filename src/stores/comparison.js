import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useComparisonStore = defineStore('comparison', () => {
  const items = ref([])

  const totalItems = computed(() => items.value.length)

  function addToCompare(product) {
    if (items.value.length >= 4) {
      alert('You can compare up to 4 items at once.')
      return
    }
    if (!items.value.find(i => i.id === product.id)) {
      items.value.push(product)
    }
  }

  function removeFromCompare(productId) {
    items.value = items.value.filter(i => i.id !== productId)
  }

  function clearComparison() {
    items.value = []
  }

  function isInComparison(productId) {
    return items.value.some(i => i.id === productId)
  }

  return { 
    items, 
    totalItems, 
    addToCompare, 
    removeFromCompare, 
    clearComparison, 
    isInComparison 
  }
})
