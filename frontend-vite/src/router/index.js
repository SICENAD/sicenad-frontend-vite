import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
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
      path: '/superadministrador',
      name: 'superadministrador',
      component: () => import('../views/SuperadministradorView.vue'),
      meta: {
        requireAuth: true,
        roles: ['Superadministrador'],
      },
      children: [
        {
          path: '',
          redirect: '/superadministrador/cenads',
        },
        {
          path: 'armas',
          name: 'armas',
          component: () => import('../views/ArmasView.vue'),
          meta: {
            requireAuth: true,
            roles: ['Superadministrador'],
          },
        },
        {
          path: 'categoriasFichero',
          name: 'categoriasFichero',
          component: () => import('../views/CategoriasFicheroView.vue'),
          meta: {
            requireAuth: true,
            roles: ['Superadministrador'],
          },
        },
        {
          path: 'tiposFormulario',
          name: 'tiposFormulario',
          component: () => import('../views/TiposFormularioView.vue'),
          meta: {
            requireAuth: true,
            roles: ['Superadministrador'],
          },
        },
        {
          path: 'cenads',
          name: 'cenads',
          component: () => import('../views/CenadsView.vue'),
          meta: {
            requireAuth: true,
            roles: ['Superadministrador'],
          },
        },
        {
          path: 'usuarios',
          name: 'usuarios-super',
          component: () => import('../views/UsuariosView.vue'),
          meta: {
            requireAuth: true,
            roles: ['Superadministrador'],
          },
        },
        {
          path: 'unidades',
          name: 'unidades-super',
          component: () => import('../views/UnidadesView.vue'),
          meta: {
            requireAuth: true,
            roles: ['Superadministrador'],
          },
        },
      ],
    },
    {
      path: '/cenad/:id',
      name: 'cenad',
      component: () => import('../views/CenadView.vue'),
      meta: {
        requireAuth: true,
      },
      children: [
        {
          path: '',
          name: 'cenad-home',
          component: () => import('../components/CenadHomeComponent.vue'),
          meta: {
            requireAuth: true,
          },
        },
        {
          path: 'infocenad',
          name: 'infocenad',
          component: () => import('../components/InfoCenadComponent.vue'),
          meta: {
            requireAuth: true,
          },
        },
        {
          path: 'normativas',
          name: 'normativas',
          component: () => import('../views/NormativasView.vue'),
          meta: {
            requireAuth: true,
          },
        },
        {
          path: 'cartografias',
          name: 'cartografias',
          component: () => import('../views/CartografiasView.vue'),
          meta: {
            requireAuth: true,
          },
        },
        {
          path: 'categorias',
          name: 'categorias',
          component: () => import('../views/CategoriasView.vue'),
          meta: {
            requireAuth: true,
            roles: ['Administrador'],
          },
        },
        {
          path: 'recursos',
          name: 'recursos',
          component: () => import('../views/RecursosView.vue'),
          meta: {
            requireAuth: true,
          },
        },
        {
          path: 'recursos/:idRecurso',
          name: 'recurso',
          component: () => import('../components/RecursoDetalleComponent.vue'),
          meta: {
            requireAuth: true,
          },
        },
        {
          path: 'solicitudes',
          name: 'solicitudes',
          component: () => import('../views/SolicitudesView.vue'),
          meta: {
            requireAuth: true,
          },
        },
        {
          path: 'solicitudes/:estado',
          name: 'solicitudes-estado',
          component: () => import('../components/SolicitudesEstadoComponent.vue'),
          meta: {
            requireAuth: true,
          },
        },
        {
          path: 'solicitudes/:idSolicitud',
          name: 'solicitudDetalle',
          component: () => import('../components/SolicitudDetalleComponent.vue'),
          meta: {
            requireAuth: true,
          },
        },
        {
          path: 'usuarios',
          name: 'usuarios-cenad',
          component: () => import('../views/UsuariosView.vue'),
          meta: {
            requireAuth: true,
            roles: ['Administrador'],
          },
        },
        {
          path: 'unidades',
          name: 'unidades-cenad',
          component: () => import('../views/UnidadesView.vue'),
          meta: {
            requireAuth: true,
            roles: ['Administrador'],
          },
        },
      ],
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

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore()
  const isAuth = auth.token != null
  const needAuth = to.meta.requireAuth

  // Inicializar si aún no lo hiciste
  if (auth.token && !auth.username) {
    const res = await auth.init() // Validar token y obtener datos si falta
    if (!res.ok || !res) {
      auth.logout()
      next({ name: 'login' })
      alert('Tu sesión ha caducado y debes volver a iniciar sesión')
    }
  }
  if (needAuth && !isAuth) {
    next({ name: 'login' })
    alert(i18n.global.t('comun.debeLog'))
  } else if (to.meta.roles && !to.meta.roles.includes(auth.rol)) {
    next(from)
    alert(i18n.global.t('comun.debeAdmin'))
  } else {
    next()
  }
})
export default router
