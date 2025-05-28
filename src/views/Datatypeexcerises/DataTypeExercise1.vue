<template>
    <SideBar />
    <div class="container">
      <h1>Data Types Exercise 1</h1>
      <p class="instructions">
        You will be shown a value. Choose the correct data type
        (<strong>int, float, char, string, bool</strong>) From the options below.
        get a highScore of 10 to complete this exercise
      </p>
  
      <div class="card">
        <div class="value-display">{{ value }}</div>
  
       <div class="options">
  <button
    v-for="option in ['int', 'float', 'char', 'string', 'bool']"
    :key="option"
    @click="check(option)"
    class="option-button"
  >
    {{ option }}
  </button>
</div>
  
        <p v-if="response" class="response">{{ response }}</p>
  
        <div class="scoreboard">
          <p>Current Score: <strong>{{ score }}</strong></p>
          <p >High Score: <strong>{{ highScore }}</strong></p>
          <p >Attempts: <strong>{{ attempts }}</strong></p>
          <p >Fails: <strong>{{ fails }}</strong></p>
          <p >Accuracy: <strong>{{ accuracy }}%</strong></p>
        </div>
        <h2 v-if="highScore>9">Congrats! you have reached a High Score of 10. You may move on to the next exercise or continue playing</h2>
      </div>
      <button class="next"><router-link to="/datatype/exercise2" style="color: white;">Next</router-link></button>
      <button class="prev" ><router-link to="/datatype"  style="color: white;">	&larr;</router-link></button>
    </div>
  </template>
  
  <script>
  import { RouterLink } from 'vue-router';
import SideBar from '../../components/SideBar.vue';
import axios from 'axios';
  
  export default {
    components: { SideBar },
    data() {
      return {
        
        value: null,
        valueType: null,
        score: 0,
        highScore: 0,
        attempts: 0,
        fails: 0,
        accuracy: 0,
        response: null
      };
    },
    methods: {
      getRandomChar() {
        const options = [
          () => String.fromCharCode(97 + Math.floor(Math.random() * 26)), // a-z
          () => String.fromCharCode(65 + Math.floor(Math.random() * 26)), // A-Z
          () => String.fromCharCode(48 + Math.floor(Math.random() * 10)), // 0-9
          () => "!@#$%^&*()_+[]{}|;:',.<>?/`~"[Math.floor(Math.random() * 30)]
        ];
        return options[Math.floor(Math.random() * options.length)]();
      },
      newvalue() {
        const valuechoice = Math.floor(Math.random() * 6);
        if (valuechoice === 0) {
          this.valueType = 'int';
          this.value = Math.floor(Math.random() * 10);
        } else if (valuechoice === 1) {
          this.valueType = 'float';
          this.value = (Math.random() * 10).toFixed(2);
        } else if (valuechoice === 2) {
          this.valueType = 'char';
          this.value = "'" + this.getRandomChar() + "'";
        } else if (valuechoice === 3) {
          this.valueType = 'string';
          this.value = '"' + Math.random().toString(36).substring(2, 7) + '"';
        } else if (valuechoice === 4) {
          this.valueType = 'bool';
          this.value = Math.random() < 0.5;
        }
      },
      check(choice) {
        this.attempts++;
       if (choice === this.valueType) {
          this.response = 'Correct!';
          this.score++;
          if (this.score > this.highScore){ this.highScore = this.score;
            this.updatehighScore();
          };
         
          this.newvalue();
        } else {
          this.response = 'Whoops you messed up';
          this.score = 0;
          this.fails++;
        }
        this.accuracy = ((this.attempts - this.fails) / this.attempts) * 100;
        this.accuracy = Math.round(this.accuracy);
      },
     async updatehighScore(){
        const username = localStorage.getItem("username");
        if(username){
        const userData = new FormData()
        userData.append('username', username);
        userData.append('exerciseid' ,1);
        if(this.highScore >9){
            userData.append('completed',true)
        }
        else{
            userData.append('completed',false)
        }
        userData.append('highScore',this.highScore);

        const exerciseupdate = await axios.post("http://localhost:8000/datatype/exercises",userData)}
      }
    },
    async mounted() {
        const username = localStorage.getItem("username");
        if(username){
        const response = await axios.get("http://localhost:8000/datatype/exercises", {
        params: {
          username: username,
          eid: 1
        }
      })
        this.highScore = response.data;
    }
      this.newvalue();
    }
    ,
   
  };
  </script>
  
  <style scoped>
  .container {
    padding: 2rem;
    max-width: 600px;
    margin: auto;
    color: #fff;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 1rem;
  }
  
  .instructions {
    text-align: center;
    margin-bottom: 2rem;
    font-size: 1.1rem;
  }
  
  .card {
    background-color: #2c2c2c;
    border: 2px solid #ccc;
    border-radius: 10px;
    padding: 2rem;
    text-align: center;
  }
  
  .value-display {
    font-size: 2rem;
    background-color: #444;
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 8px;
    font-weight: bold;
  }
  
  .input {
    padding: 0.5rem;
    width: 60%;
    margin-bottom: 1rem;
    border-radius: 4px;
    border: none;
    font-size: 1rem;
  }
  
  .submit-button {
    background-color: #4caf50;
    color: white;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-left: 0.5rem;
  }
  
  .response {
    margin-top: 1rem;
    font-weight: bold;
  }
  
  .scoreboard {
    margin-top: 1rem;
  }
  
.options {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin: 1rem 0;
}

.option-button {
  background-color: #444;
  color: white;
  border: 2px solid white;
  padding: 0.5rem 1rem;
  font-size: 1.1rem;
  cursor: pointer;
  border-radius: 6px;
  transition: background-color 0.2s;
}

.option-button:hover {
  background-color: #666;
}
  </style>
  