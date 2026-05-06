import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useWishlistStore = defineStore('wishlist', () => {
  const items = ref([])

  function toggleWishlist(product) {
    const index = items.value.findIndex(item => item.id === product.id)
    if (index > -1) {
      items.value.splice(index, 1)
      return false // Removed
    } else {
      items.value.push(product)
      return true // Added
    }
  }

  function isInWishlist(productId) {
    return items.value.some(item => item.id === productId)
  }

  return { items, toggleWishlist, isInWishlist }
})
