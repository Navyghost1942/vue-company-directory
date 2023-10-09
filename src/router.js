import { createRouter, createWebHistory } from 'vue-router'
import { isAuth } from '@/composables/useAuth'

const { isAuthenticated } = useAuth()

import Main from '@/components/Main.vue'
import Login from '@/components/Login.vue'
import SettingsPage from '@/components/SettingsPage.vue'
import NotFound from '@/components/NotFound.vue'

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: 'login', name: 'Login', component: LoginPage },
  { path: 'settings', name: 'Settings', component: SettingsPage,
    meta: { requiresAuth: true }
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to) => {
  if (to.meta.requiresAuth && !isAuthenticated.value) next({ name: 'Login', query: { redirect: to.fullPath }}) 
    else next()
})

export default router
