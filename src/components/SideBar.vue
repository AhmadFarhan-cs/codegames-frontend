<template>
    <div class="sidebar">
      <div class="sidebar-top">
        <h2 class="logo"><router-link to="/" class="nav-item">Code Games</router-link></h2>
      </div>
  
      <div class="sidebar-links">
        <div class="dropdown">
          <p @click="toggleMenu('learn')" class="nav-header">Learn ▾</p>
          <div v-if="expanded.learn">
            <p @click="toggleMenu('lesson')" class="nav-header">Lessons ▾</p>
            <div v-if="expanded.lesson" class="nested">
              <p @click="toggleMenu('datatypeLesson')">Data types ▾</p>
              <div v-if="expanded.datatypeLesson" class="nested">
                <router-link to="/datatype/lessons/1" class="nav-item">Lesson 1</router-link>
                <router-link to="/datatype/lessons/2" class="nav-item">Lesson 2</router-link>
                <router-link to="/datatype/lessons/3" class="nav-item">Lesson 3</router-link>
                <router-link to="/datatype/lessons/4" class="nav-item">Lesson 4</router-link>
                <router-link to="/datatype/lessons/5" class="nav-item">Lesson 5</router-link>
              </div>
              <p @click="toggleMenu('controlflowLesson')">Control Flow ▾</p>
              <div v-if="expanded.controlflowLesson" class="nested">
                <router-link to="/controlflow/lessons/1" class="nav-item">Lesson 1</router-link>
                <router-link to="/controlflow/lessons/2" class="nav-item">Lesson 2</router-link>
                <router-link to="/controlflow/lessons/3" class="nav-item">Lesson 3</router-link>
                <router-link to="/controlflow/lessons/4" class="nav-item">Lesson 4</router-link>
                <router-link to="/controlflow/lessons/5" class="nav-item">Lesson 5</router-link>
                <router-link to="/controlflow/lessons/6" class="nav-item">Lesson 6</router-link>
                <router-link to="/controlflow/lessons/7" class="nav-item">Lesson 7</router-link>
              </div>
            </div>
            <p @click="toggleMenu('exercise')" class="nav-header">Exercises ▾</p>
            <div v-if="expanded.exercise" class="nested">
              <p @click="toggleMenu('datatypeExercise')" class="nav-header">Data types ▾</p>
              <div v-if="expanded.datatypeExercise" class="nested">
                <router-link to="/datatype/exercise1" class="nav-item">Exercise 1</router-link>
                <router-link to="/datatype/exercise2" class="nav-item">Exercise 2</router-link>
                <router-link to="/datatype/exercise3" class="nav-item">Exercise 3</router-link>
                <router-link to="/datatype/exercise4" class="nav-item">Exercise 4</router-link>
              </div>
              <p @click="toggleMenu('controlflowExercise')" class="nav-header">Control Flow ▾</p>
              <div v-if="expanded.controlflowExercise" class="nested">
                <router-link to="/controlflow/exercise1" class="nav-item">Exercise 1</router-link>
                <router-link to="/controlflow/exercise2" class="nav-item">Exercise 2</router-link>
                <router-link to="/controlflow/exercise3" class="nav-item">Exercise 3</router-link>
              </div>
            </div>
          </div>
        </div>
  
        <div class="dropdown">
          <p @click="toggleMenu('account')" class="nav-header">Account ▾</p>
          <div v-if="expanded.account">
            
            <router-link v-if="!username" to="/login" class="nav-item">Login</router-link>
            <div v-else>
            <button @click="goToprofile" >Profile</button>
            <button  @click="logout" style="display: block; margin-left: 65px;">Logout</button>
            
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        expanded: {
          learn: false,
          account: false,
          lesson: false,
          exercise: false,
          datatypeLesson: false,
          datatypeExercise: false,
          controlflowLesson: false,
          controlflowExercise: false
        },
        username:null
      }
    },
    methods: {
      toggleMenu(section) {
        this.expanded[section] = !this.expanded[section]
        
      },
      logout(){
        localStorage.removeItem('token')
      localStorage.removeItem('username')
      this.username = null
      },
      goToprofile(){
        this.$router.push('/profile')
      }
    },
    mounted(){
      const name = localStorage.getItem("username")
    if(name){
      this.username= name}
    }
  }
  </script>
  
  <style scoped>
 .sidebar {
  border-style: double;
  border-radius: 10px;
  border-color: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 220px;
  height: 100vh;
  background-color: #111;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  font-family: sans-serif;
}

.sidebar-top {
  margin-bottom: 2rem;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
}

.sidebar-links {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.nav-header {
  font-weight: bold;
  cursor: pointer;
  color: #ccc;
  margin-bottom: 0.5rem;
  margin-left: 0.25rem;
}

.nav-header:hover {
  color: white;
}

.nav-item {
  display: block;
  color: #ccc;
  text-decoration: none;
  margin-bottom: 0.5rem;
  padding-left: 1rem;
}

.nav-item:hover {
  color: white;
}

/* Nested submenu styling */
.nested {
  padding-left: 1rem;
  border-left: 1px solid #444;
  margin-left: 0.5rem;
  margin-top: 0.25rem;
  margin-bottom: 0.5rem;
}

.nested .nav-item {
  padding-left: 1.5rem;
}
  </style>
