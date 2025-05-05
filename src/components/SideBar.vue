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
            <div v-if="expanded.lesson">
              <p>Data types</p>
              <p>Instruction Flow</p>
            </div>
            <p @click="toggleMenu('exercise')" class="nav-header">Exercises ▾</p>
            <div v-if="expanded.exercise">
              <p>Data types</p>
              <p>Instruction Flow</p>
            </div>
          </div>
        </div>
  
        <div class="dropdown">
          <p @click="toggleMenu('account')" class="nav-header">Account ▾</p>
          <div v-if="expanded.account">
            <router-link to="/profile" class="nav-item">Profile</router-link>
            <router-link v-if="!username" to="/login" class="nav-item">Login</router-link>
            <button v-else @click="logout">Logout</button>
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
          lesson:false,
          exercise : false
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
    width: 200px;
    height: 100vh;
    background-color: #111;
    color: white;
    display: flex;
    flex-direction: column;
    padding: 1rem;
  }
  
  .sidebar-top {
    margin-bottom: 2rem;
  }
  
  .logo {
    font-size: 1.5rem;
    font-weight: bold;

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
  }
  
  .nav-item {
    display: block;
    color: #ccc;
    text-decoration: none;
    margin-left: 1rem;
    margin-bottom: 0.5rem;
  }
  
  .nav-item:hover {
    color: white;
  }
  </style>
  