import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import QuizzHome from '../components/quiz/QuizzHome.vue'
// import QuizzQuestion from '../components/quiz/QuizzQuestion.vue'
import QuizzScore from '../components/quiz/QuizzScore.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: { path: "/kajian" },
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
      component: () => import('@/views/KajianView.vue'),
      children: [
        {
          path: 'main',
          name: 'kajianMain',
          component:()=> import('@/components/kajian/KajianMain.vue')
        }
      ]
    }
  ]
})

export default router
