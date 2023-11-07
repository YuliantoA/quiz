import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import QuizzHome from '../components/quiz/QuizzHome.vue'
import QuizzScore from '../components/quiz/QuizzScore.vue'
import { kajianStore } from '@/stores/counter'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: { path: "/kajian/main" },
      component: HomeView
    },
    {
      path: '/trillio',
      name: 'trillio',
      component: () => import('@/views/TrillioPage.vue')
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: () => import('@/views/QuizzPage.vue'),
      children: [
        {
        path: 'home',
        name: 'Home',
        component: QuizzHome,
      },
        {
          path: 'question',
          component: () => import('@/views/QuizzQuestionView.vue'),
          children: [
            {
        path: 'form',
        name: 'Form',
        component: () => import('@/components/quiz/QuizzForm.vue'),
      },
            {
        path: 'detail',
        name: 'Detail',
              component: () => import('@/components/quiz/QuizzQuestion.vue'),
         props: true
      },
          ]
        },
        {
          path: 'score',
          name: 'Score',
          component:QuizzScore
        }
      ]
    },
    {
      path: '/kajian',
      name: 'kajian',
      redirect: { path: "/kajian/main" },
      meta: {
      requiresAuth: true,
    },
      component: () => import('@/views/KajianView.vue'),
      children: [
        {
          path: 'main',
          name: 'kajianMain',
          component: () => import('@/components/kajian/KajianMain.vue')
        },
        {
          path: 'createPost',
          name: 'createPost',
          component: () => import('@/components/kajian/createPost/CreatePost.vue')
        },
      ]
    },
    {
      path: '/KajianLanding',
      name: 'landing',
      redirect: { path: "/KajianLanding/login" },
      component: () => import('@/views/KajianLandingView.vue'),
      meta: {
      guestOnly: true,
    },
      children: [
        {
          path: 'login',
          name: 'kajianLogin',
          component: ()=> import('@/components/kajian/landing/KajianLogin.vue')
        },
        {
          path: 'regis',
          name: 'kajianRegis',
          component: ()=> import('@/components/kajian/landing/KajianRegis.vue')
        }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  // Redirect to login view if destination view requires auth
  // Add current route to query params so user could be redirected after logged in
  const userStore = kajianStore()

  if (
    to.matched.some(
      (route) => {
        return route.meta.requiresAuth && !userStore.isLogin
      }
      )
  ) {
        return next({
          name: "kajianLogin",
      query: {
        next: to.fullPath,
      },
    });
  } else if (to.matched.some((route) => route.meta.needTask)) {
    // await store.dispatch('getTask');
  }
  
  // If user try to access login view even after authenticated,
  // automatically redirect to home view
  if (
    to.matched.some((route) => route.meta.guestOnly && userStore.isLogin)
    ) {
      return next({
      name: "kajian",
    });
  }

  next();
});

export default router
