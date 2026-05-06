import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useOrderStore = defineStore('orders', () => {
  const orders = ref(JSON.parse(localStorage.getItem('orders') || '[]'))

  function addOrder(order) {
    const newOrder = {
      ...order,
      id: Math.floor(Math.random() * 1000000).toString().padStart(8, '0'),
      date: new Date().toISOString(),
      status: 'Processing'
    }
    orders.value.unshift(newOrder)
    save()
    return newOrder
  }

  function updateOrderStatus(orderId, status) {
    const order = orders.value.find(o => o.id === orderId)
    if (order) {
      order.status = status
      save()
    }
  }

  function save() {
    localStorage.setItem('orders', JSON.stringify(orders.value))
  }

  return { orders, addOrder, updateOrderStatus }
})
