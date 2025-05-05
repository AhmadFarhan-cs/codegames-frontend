<template>
    <nav class="navbar">
      <div class="nav-left">
        <router-link to="/" class="logo">Code Games</router-link>
      </div>
      <div class="nav-right">
        <router-link to="/lessons" class="nav-link">Lessons</router-link>
        <router-link v-if="!username" to="/login" class="nav-link">Login</router-link>
        <router-link  v-if="!username" to="/signup" class="nav-link">Sign Up</router-link>
        <span v-else>Welcome,{{ username }}  <button @click ="logout">Logout</button></span>
       
      </div>
    </nav>
  </template>


<script>
export default{
  data() {return{
    username: null
    
  }},
  mounted(){
    const name = localStorage.getItem("username")
    if(name){
      this.username= name
    }
  },
  methods:{
    logout(){
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      this.username = null
      
    }
  }


}



</script>
  
  <style scoped>
  
  button{
    border-color: white;
  }
  .navbar {
    top: 0;
  left: 0;
  right: 0;
  z-index: 1000;             /* ensure it's on top of everything */
  width: 96%;   
  background-color: #111;

    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #111;
    color: white;
    padding: 0.75rem 1.5rem;
    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    border-color: white;
    border-radius: 100px;
    border-style: double;  
  }
  
  .nav-left .logo {
    font-size: 1.25rem;
    font-weight: bold;
    color: white;
    text-decoration: none;
  }
  
  .nav-right {
    display: flex;
    gap: 1rem;
  }
  
  .nav-link {
    color: #ccc;
    text-decoration: none;
    font-weight: 500;
    margin-top: 9px;
  }
  
  .nav-link:hover {
    color: white;
  }
  </style>
  