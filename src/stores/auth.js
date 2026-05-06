import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const currentUser = ref(JSON.parse(localStorage.getItem('currentUser') || 'null'))
  const users = ref(JSON.parse(localStorage.getItem('users') || '[]'))

  // Initialize with an admin account if none exists
  if (users.value.length === 0) {
    const adminUser = {
      id: '1',
      name: 'MazKevin Admin',
      email: 'admin@mazmarket.com',
      username: 'admin',
      password: 'adminpassword',
      role: 'admin',
      userInfo: {
        name: 'MazKevin Admin',
        email: 'admin@mazmarket.com',
        username: 'admin',
        birthday: '1 Jan 1990',
        age: 34,
        education: 'Sarjana'
      }
    }
    users.value.push(adminUser)
    localStorage.setItem('users', JSON.stringify(users.value))
  }

  const isLoggedIn = computed(() => !!currentUser.value)
  const isAdmin = computed(() => currentUser.value?.role === 'admin')
  const name = computed(() => currentUser.value?.name || 'Guest')
  const userInfo = computed(() => currentUser.value?.userInfo || {})

  function login(username, password) {
    const user = users.value.find(u => u.username === username && u.password === password)
    if (user) {
      currentUser.value = user
      localStorage.setItem('currentUser', JSON.stringify(user))
      return true
    }
    return false
  }

  function register(userData) {
    const exists = users.value.find(u => u.username === userData.username || u.email === userData.email)
    if (exists) return { success: false, message: 'Username or Email already exists' }

    const newUser = {
      id: Date.now().toString(),
      ...userData,
      role: 'user', // Default role
      userInfo: {
        name: userData.name,
        email: userData.email,
        username: userData.username,
        birthday: 'Not set',
        age: 0,
        education: 'Not set'
      }
    }
    users.value.push(newUser)
    localStorage.setItem('users', JSON.stringify(users.value))
    return { success: true }
  }

  function logout() {
    currentUser.value = null
    localStorage.removeItem('currentUser')
  }

  function updateUserInfo(newInfo) {
    if (currentUser.value) {
      currentUser.value.userInfo = { ...currentUser.value.userInfo, ...newInfo }
      currentUser.value.name = newInfo.name
      currentUser.value.email = newInfo.email
      
      // Sync back to users list
      const idx = users.value.findIndex(u => u.id === currentUser.value.id)
      if (idx !== -1) {
        users.value[idx] = { ...currentUser.value }
        localStorage.setItem('users', JSON.stringify(users.value))
      }
      
      localStorage.setItem('currentUser', JSON.stringify(currentUser.value))
    }
  }

  return { 
    currentUser, 
    isLoggedIn, 
    isAdmin, 
    name, 
    userInfo, 
    login, 
    register, 
    logout, 
    updateUserInfo 
  }
})
