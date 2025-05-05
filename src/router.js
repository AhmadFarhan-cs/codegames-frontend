import { createRouter, createWebHistory } from 'vue-router'
import LoginView from './views/LoginView.vue'
import MainPage from './views/MainPage.vue'
import SignupView from './views/SignupView.vue'
import LessonsView from './views/LessonsView.vue'
import Datatype from './views/Datatype.vue'
import DataTypeLesson from './views/DataTypeLesson.vue'

const routes = [
  {
    path: '/login',
    component: LoginView,
    meta: { title: 'Login | Code Games' }
  },
  {
    path:'/',
    component: MainPage,
    meta:{title:'Code Games'}

  },
  {
    path:'/signup',
    component:  SignupView,
    meta: {title: 'Sign up | Code Games'}
  },
  {
    path:'/lessons',
    component: LessonsView,
    meta:{title : 'Lessons | Code Games'}
  },
  {
    path:'/datatype',
    component: Datatype,
    meta:{title:'Data types | Code Games'}
    },
    {
      path: '/datatype/lessons/:id',
      name: 'DataTypeLesson',
      component: DataTypeLesson
    }
  
  
]


const router = createRouter({
  history: createWebHistory(),
  routes
})
router.afterEach((to) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
})

export default router
