<template>
  <NavBar></NavBar>
    <div class="login-container">
      <div class="login-box">
        <h2>Sign up</h2>
        <form @submit.prevent="handlesignup">
            <div>
                <label>Email:</label>
                <input type="email" v-model="email" required/>
            </div>
          <div>
            <label>Username:</label>
            <input v-model="username" required />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" v-model="password" required />
          </div>
          <div>
            <label>Confirm Password:</label>
            <input type="password" v-model="confpassword" required />
          </div>
          <button type="submit">Sign up</button>
        </form>
        <p v-if="error" style="color: red">{{ error }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  import NavBar from '../components/NavBar.vue'

  export default {
    data() {
      return {
        email:'',
        username: '',
        password: '',
        confpassword:'',
        error: ''
      }
    },
    components:{
      NavBar
    },
    methods: {
      async handlesignup() {
        try {
          if (this.password===this.confpassword){
          const formData = new FormData()
          formData.append('username', this.username)
          formData.append('email',this.email)
          formData.append('password', this.password)
  
          const response = await axios.post('http://localhost:8000/signup', formData)
          alert('Sign up successful!')
          this.$router.push('/login')
        }
        else{
          this.error = 'Passwords must match'
        }
          
        } catch (err) {
          this.error = 'Signup failed: ' + (err.response?.data?.detail || err.message)
        }
      }
    }
  }
  </script>
  
  <style scoped>
  body{
    overflow: hidden;
    
  }
  .login-container {
    background-color: black;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    
  }
  
  .login-box {
    background-color: #222;
    padding: 2rem;
    border-radius: 8px;
    color: white;
  }
  
  input {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 1rem;
    border-radius: 4px;
    border: none;
  }
  
  button {
    width: 100%;
    padding: 0.5rem;
    background-color: #555;
    color: white;
    border: none;
    border-radius: 4px;
  }
  </style>
  