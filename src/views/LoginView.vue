<template>
  <NavBar></NavBar>
  <div class="login-container">
    <div class="login-box">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div>
          <label>Username:</label>
          <input v-model="username" required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" v-model="password" required />
        </div>
        <button type="submit">Log In</button>
      </form>
      <p v-if="error" style="color: red">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import NavBar from './components/NavBar.vue'

export default {
  data() {
    return {
      username: '',
      password: '',
      error: ''
    }
  },
  components:{
    NavBar
  },
  methods: {
    async handleLogin() {
      try {
        const formData = new FormData()
        formData.append('username', this.username)
        formData.append('password', this.password)

        const response = await axios.post('http://localhost:8000/login', formData)
        const { access_token } = response.data
        localStorage.setItem('token', access_token)
        const payload = JSON.parse(atob(access_token.split('.')[1]))
    const username = payload.sub
    localStorage.setItem('username', username)
        alert('Login successful!')
        this.$router.push('/')
        
      } catch (err) {
        this.error = 'Login failed: ' + (err.response?.data?.detail || err.message)
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
