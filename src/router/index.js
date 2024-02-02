import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
// import QuizzHome from '../components/quiz/QuizzHome.vue'
// import QuizzScore from '../components/quiz/QuizzScore.vue'

export const routesNames = {
  HOME: 'Home',
  FORM: 'Form',
  DETAIL: 'Detail'
}

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: { path: '/quiz/home' },
    component: () => import('@/views/HomeView.vue')
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
        name: routesNames.HOME,
        component: () => import('@/components/quiz/QuizzHome.vue')
      },
      {
        path: 'question',
        name: 'Question',
        component: () => import('@/views/QuizzQuestionView.vue'),
        children: [
          {
            path: 'form',
            name: routesNames.FORM,
            component: () => import('@/components/quiz/QuizzForm.vue')
          },
          {
            path: 'detail',
            name: routesNames.DETAIL,
            component: () => import('@/components/quiz/QuizzQuestion.vue'),
            props: true
          }
        ]
      },
      {
        path: 'score',
        name: 'Score',
        component: () => import('@/components/quiz/QuizzScore.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router
