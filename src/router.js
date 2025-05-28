import { createRouter, createWebHistory } from 'vue-router'
import LoginView from './views/LoginView.vue'
import MainPage from './views/MainPage.vue'
import SignupView from './views/SignupView.vue'
import LessonsView from './views/LessonsView.vue'
import Datatype from './views/Datatype.vue'
import DataTypeLesson from './views/DataTypeLesson.vue'
import DataTypeExercise1 from './views/Datatypeexcerises/DataTypeExercise1.vue'
import DataTypeExercise2 from './views/Datatypeexcerises/DataTypeExercise2.vue'
import DatatypeExercise3 from './views/Datatypeexcerises/DatatypeExercise3.vue'
import DataTypeExercise4 from './views/Datatypeexcerises/DataTypeExercise4.vue'
import Profile from './views/Profile.vue'
import ControlFlow from './views/ControlFlow.vue'
import ControlFlowLesson from './views/ControlFlowLesson.vue'
import ControlFlowExercise1 from './views/ControlFlowExercises/ControlFlowExercise1.vue'
import ControlFlowExercise2 from './views/ControlFlowExercises/ControlFlowExercise2.vue'
import ControlFlowExercise3 from './views/ControlFlowExercises/ControlFlowExercise3.vue'
import DataStructures from './views/DataStructures.vue'
import DataStructuresLesson from './views/DataStructuresLesson.vue'
import DataStructureExercise2 from './views/DataStructuresExercises/DataStructureExercise2.vue'
import DataStructureExercise3 from './views/DataStructuresExercises/DataStructureExercise3.vue'
import DataStructureExercise4 from './views/DataStructuresExercises/DataStructureExercise4.vue'


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
    path:'/controlflow',
    component: ControlFlow,
    meta:{title:'Control Flow | Code Games'}
    },
    {
      path: '/datastructures',
      component: DataStructures,
      meta: { title: 'Data Structures | Code Games' }
    },
    {
      path: '/datatype/lessons/:id',
      name: 'DataTypeLesson',
      component: DataTypeLesson
    },
     {
      path: '/controlflow/lessons/:id',
      name: 'ControlFlowLesson',
      component: ControlFlowLesson
    },
    {
      path:'/datastructures/lessons/:id',
      name: 'DataStructuresLesson',
      component: DataStructuresLesson
    }
  ,
  {
    path:'/datatype/exercise1',
    component: DataTypeExercise1,
    meta:{title:'Data Types Exercise 1 | Code Games'}
  },
  {
    path:'/datatype/exercise2',
    component: DataTypeExercise2,
    meta:{title:'Data Types Exercise 2 | Code Games'}
  },
   {
    path:'/datatype/exercise3',
    component: DatatypeExercise3,
    meta:{title:'Data Types Exercise 3 | Code Games'}
  }
  ,
   {
    path:'/datatype/exercise4',
    component: DataTypeExercise4,
    meta:{title:'Data Types Exercise 4 | Code Games'}
  },
  {path:'/controlflow/exercise1',
    component: ControlFlowExercise1,
    meta:{title:'Control Flow Exercise 1 | Code Games'}
  }
  ,
  {path:'/controlflow/exercise2',
    component: ControlFlowExercise2,
    meta:{title:'Control Flow Exercise 2 | Code Games'}
  }
  ,
  {
    path:'/controlflow/exercise3',
    component: ControlFlowExercise3,
    meta:{title:'Control Flow Exercise 3 | Code Games'}
  },
  {path:'/datastructures/exercise2',
    component: DataStructureExercise2,
    meta:{title:'Data Structures Exercise 2 | Code Games'}
  }
  
  ,
  {path:'/datastructures/exercise3',
    component: DataStructureExercise3,
    meta:{title:'Data Structures Exercise 3 | Code Games'}
  }
  ,
  {path:'/datastructures/exercise4',
    component: DataStructureExercise4, 
    meta:{title:'Data Structures Exercise 4 | Code Games'}
  }
  ,
  {
    path:'/profile',
    component: Profile,
    meta:{title:'Profile | Code Games'}
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
