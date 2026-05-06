import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useProductStore = defineStore('products', () => {
  const products = ref(JSON.parse(localStorage.getItem('products') || '[]'))
  const categories = ref(['All', 'electronics', 'jewelery', "men's clothing", "women's clothing"])
  const isLoading = ref(false)
  const searchQuery = ref('')
  const selectedCategory = ref('All')
  const currentProduct = ref(null)

  async function fetchProducts() {
    if (products.value.length > 0) return
    
    isLoading.value = true
    try {
      const response = await fetch('https://fakestoreapi.com/products')
      const data = await response.json()
      // Add quantity and custom rating for e-commerce feel
      products.value = data.map(p => ({
        ...p,
        quantity: Math.floor(Math.random() * 100) + 10,
        rating: p.rating || { rate: 4.5, count: 120 }
      }))
      save()
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      isLoading.value = false
    }
  }

  async function fetchProductById(id) {
    currentProduct.value = null
    const localProduct = products.value.find(p => p.id == id)
    if (localProduct) {
      currentProduct.value = localProduct
      return
    }

    isLoading.value = true
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`)
      const data = await response.json()
      currentProduct.value = {
        ...data,
        quantity: 50,
        rating: data.rating || { rate: 4.5, count: 120 }
      }
    } catch (error) {
      console.error('Error fetching product:', error)
    } finally {
      isLoading.value = false
    }
  }

  function addProduct(product) {
    const newProduct = {
      ...product,
      id: Date.now(),
      rating: { rate: 0, count: 0 }
    }
    products.value.unshift(newProduct)
    save()
  }

  function deleteProduct(id) {
    products.value = products.value.filter(p => p.id !== id)
    save()
  }

  function save() {
    localStorage.setItem('products', JSON.stringify(products.value))
  }

  const filteredProducts = computed(() => {
    return products.value.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.value.toLowerCase())
      const matchesCategory = selectedCategory.value === 'All' || product.category === selectedCategory.value
      return matchesSearch && matchesCategory
    })
  })

  return { 
    products, 
    categories, 
    isLoading, 
    searchQuery, 
    selectedCategory, 
    filteredProducts, 
    currentProduct,
    fetchProducts, 
    fetchProductById,
    addProduct,
    deleteProduct
  }
})
