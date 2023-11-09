import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import QuizzHome from '../components/quiz/QuizzHome.vue'
import QuizzScore from '../components/quiz/QuizzScore.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: { path: "/quiz/home" },
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
  ]
})


export default router
