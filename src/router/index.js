import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/product/:id',
      name: 'product-detail',
      component: () => import('../views/ProductDetailView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/CartView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('../views/CheckoutView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/order-success',
      name: 'order-success',
      component: () => import('../views/OrderSuccessView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/order-history',
      name: 'order-history',
      component: () => import('../views/OrderHistoryView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/order-tracking/:id',
      name: 'order-tracking',
      component: () => import('../views/OrderTrackingView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/wishlist',
      name: 'wishlist',
      component: () => import('../views/WishlistView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/comparison',
      name: 'comparison',
      component: () => import('../views/ComparisonView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('../views/AccountView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/edit-profile',
      name: 'edit-profile',
      component: () => import('../views/EditProfileView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/admin/orders',
      name: 'admin-orders',
      component: () => import('../views/AdminOrdersView.vue'),
      meta: { requiresAuth: true, adminOnly: true }
    },
    {
      path: '/admin/inventory',
      name: 'admin-inventory',
      component: () => import('../views/AdminInventoryView.vue'),
      meta: { requiresAuth: true, adminOnly: true }
    },
    {
      path: '/admin/inventory/add',
      name: 'admin-add-product',
      component: () => import('../views/AdminAddProductView.vue'),
      meta: { requiresAuth: true, adminOnly: true }
    }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    next({ name: 'login' })
  } else if (to.meta.adminOnly && !auth.isAdmin) {
    next({ name: 'home' })
  } else if (to.name === 'login' && auth.isLoggedIn) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
