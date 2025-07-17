import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AdministracionView from '@/views/AdministracionView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import useAuthStore from '@/stores/auth'
import i18n from '@/plugins/i18n'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requireAuth: false,
      },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: {
        requireAuth: false,
      },
    },
    {
      path: '/superadministrador',
      name: 'superadministrador',
      component: () => import('../views/SuperadministradorView.vue'),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/usuarios',
      name: 'usuarios',
      component: () => import('../views/UsuariosView.vue'),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/unidades',
      name: 'unidades',
      component: () => import('../views/UnidadesView.vue'),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/armas',
      name: 'armas',
      component: () => import('../views/ArmasView.vue'),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/categoriasFichero',
      name: 'categoriasFichero',
      component: () => import('../views/CategoriasFicheroView.vue'),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/tiposFormulario',
      name: 'tiposFormulario',
      component: () => import('../views/TiposFormularioView.vue'),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/clientes',
      name: 'clientes',
      component: () => import('../views/ClientesView.vue'),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/mascotas',
      name: 'mascotas',
      component: () => import('../views/MascotasView.vue'),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/prestaciones',
      name: 'prestaciones',
      component: () => import('../views/PrestacionesView.vue'),
      meta: {
        requireAuth: true,
      },
    },
    {
      path: '/administracion',
      name: 'administracion',
      component: AdministracionView,
      meta: {
        requireAuth: true,
        rol: 'ADMIN',
      },
    },
    {
      path: '/auth/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue'),
      meta: {
        requireAuth: false,
      },
    },
    {
      path: '/auth/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
      meta: {
        requireAuth: false,
      },
    },
    {
      path: '/not-found',
      name: 'not-found',
      component: NotFoundView,
      meta: {
        requireAuth: false,
      },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: 'not-found',
    },
  ],
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  const isAuth = auth.token != null
  const isAdmin = auth.isAdmin
  const needAuth = to.meta.requireAuth
  const needAdmin = to.meta.rol == 'Superadministrador'

  if (needAuth && !isAuth) {
    next({ name: 'login' })
    alert(i18n.global.t('comun.debeLog'))
  } else if (!isAdmin && needAdmin) {
    next(from)
    alert(i18n.global.t('comun.debeAdmin'))
  } else {
    next()
  }
})

export default router
