<template>
  <NavBar/>
    <img src="D:\Web project\code-games\src\assets\codegameslogo.png" class ="logo">
    <p>Code games is an online learning platform intended to teach you the</p>
    <p>fundamentals of programming and coding with puzzles and challenges</p>
    <p>         Challeng yourself today!!!!</p>
    <button @click="goTolesson">Get Started</button>
    <p v-if="!username">To save your progress sign in! <router-link to="/login" class="link">Sign in</router-link></p>
    <p v-else>Good Luck {{ username }}!!!</p>
   

</template>

<script>

import NavBar from './components/NavBar.vue';


export default {
  data(){
    return{
      username: null
    }
  },
  components:{
    NavBar
  }
    ,
    methods:{
    goTolesson(){
      this.$router.push("/lessons")
    }
  },
  mounted(){
    const name = localStorage.getItem("username")
    if(name){
      this.username= name
    }

  }


  }


</script>





<style scoped>
.logo{
  
   width: 400px;
   height: 400px;
  object-fit: contain;
}
p{
    margin: auto;
    
}
.link {
  color: darkgray;
  text-decoration: underline;
  cursor: pointer;
}
.link:hover{
    color: white;
}


</style>