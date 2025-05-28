<template>
    <SideBar />
    <div class="exercise-container">
      <h1>Data Types Exercise Two:</h1>
      <p>Place the correct data into the correct bucket:</p>
      <p>get a High Score of 10 to complete the exercise</p>
  
      <div class="items">
  <transition-group name="fade" tag="div" class="items">
    <div
      v-for="(item, index) in items"
      :key="item.id"
      class="draggable-item"
      draggable="true"
      @dragstart="startDrag(item)"
      v-show="item.visbile"
    >
      {{ item.value }}
    </div>
  </transition-group>
</div>

  
      <div class="buckets">
        <div
          v-for="(bucket, index) in buckets"
          :key="index"
          class="bucket"
          :class="bucket.color"
          @dragover.prevent
          @drop="onDrop(bucket)"
        >
          {{ bucket.label }}
        </div>
      </div>
      <p v-if="response">{{ response }}</p>
        <p>Current Score: <strong>{{ score }}</strong></p>
        <p >High Score: <strong>{{ highScore }}</strong></p>
          <p >Attempts: <strong>{{ attempts }}</strong></p>
          <p >Fails: <strong>{{ fails }}</strong></p>
          <p >Accuracy: <strong>{{ accuracy }}%</strong></p>
    </div>
    <button class="next"><router-link to="/datatype/exercise3" style="color: white;">Next</router-link></button>
      <button class="prev" ><router-link to="/datatype/exercise1" style="color: white;">Previous</router-link></button>
      <button class="home" ><router-link to="/datatype" style="color: white;">&larr;</router-link></button>
  </template>
<script>

import SideBar from '../../components/SideBar.vue';

import axios from 'axios';


export default {
    components: { SideBar },
  data() {
    return {
        response: null,
      draggedItem: null,
      placeditems:0,
      highScore: 0,
      score: 0,
      attempts: 0,
      fails: 0,
      accuracy: 0,
      items: [
        { id:1,value: 1, type: 'int',visbile:true },
        { id:2,value: "'a'", type: 'char',visbile:true  },
        {id:3, value: '"Hello"', type: 'string',visbile:true  },
        { id:4,value: "'2'", type: 'char',visbile:true  },
        { id:5,value: true, type: 'bool' ,visbile:true }
      ],
      buckets: [
        { label: 'INT', type: 'int', color: 'red' },
        { label: 'Bool', type: 'bool', color: 'yellow' },
        { label: 'String', type: 'string', color: 'orange' },
        { label: 'Char', type: 'char', color: 'blue' },
        { label: 'Float', type: 'float', color: 'green' }
      ]
    };
  },
  methods: {getRandomChar() {
        const options = [
          () => String.fromCharCode(97 + Math.floor(Math.random() * 26)), // a-z
          () => String.fromCharCode(65 + Math.floor(Math.random() * 26)), // A-Z
          () => String.fromCharCode(48 + Math.floor(Math.random() * 10)), // 0-9
          () => "!@#$%^&*()_+[]{}|;:',.<>?/`~"[Math.floor(Math.random() * 30)]
        ];
        return options[Math.floor(Math.random() * options.length)]();
      },
    newitems(){
        for(let i=0;i<this.items.length;i++){
            const valuechoice = Math.floor(Math.random() * 5);
        if (valuechoice === 0) {
        this.items[i].type = 'int';
        this.items[i].value = Math.floor(Math.random() * 10);
        } else if (valuechoice === 1) {
          this.items[i].type = 'float';
          this.items[i].value = (Math.random() * 10).toFixed(2);
        } else if (valuechoice === 2) {
          this.items[i].type = 'char';
          this.items[i].value = "'" + this.getRandomChar() + "'";
        } else if (valuechoice === 3) {
          this.items[i].type = 'string';
          this.items[i].value = '"' + Math.random().toString(36).substring(2, 7) + '"';
        } else if (valuechoice === 4) {
          this.items[i].type = 'bool';
          this.items[i].value = Math.random() < 0.5;
       
        }
        this.items[i].visbile = true; 
        }

    },
    startDrag(item) {
      this.draggedItem = item;
    },
    onDrop(bucket) {
      this.attempts++;
      if (this.draggedItem.type === bucket.type) {
        this.placeditems++;
        this.items.find(i => i.id === this.draggedItem.id).visbile = false;
        if(this.placeditems === this.items.length){
           
            this.score++;
            this.newitems();
            this.placeditems = 0;
            if (this.score > this.highScore){ this.highScore = this.score;
                this.updatehighScore();
              };
        }

        this.response="Correct!";
      } else {
        this.response="Try again.";
        this.newitems();
        this.placeditems = 0;
        this.score = 0;
        this.fails++;
      }
      this.draggedItem = null;
      this.accuracy = ((this.attempts - this.fails) / this.attempts) * 100;
      this.accuracy = Math.round(this.accuracy);
    }
    ,async updatehighScore(){
        const username = localStorage.getItem("username");
        if(username){
        const userData = new FormData()
        userData.append('username', username);
        userData.append('exerciseid' ,2);
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
          eid: 2
        }
      })
        this.highScore = response.data;
    }
      this.newitems();
    }
    
};
</script>  

<style scoped>
.exercise-container {
  color: white;
  padding: 2rem;
  text-align: center;
}

.items {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.draggable-item {
  padding: 0.5rem 1rem;
  border: 2px solid white;
  background-color: black;
  cursor: grab;
  font-weight: bold;
}

.buckets {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
}

.bucket {
  width: 100px;
  height: 150px;
  border-radius: 20px 20px 10px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: black;
}

.red {
  background-color: red;
}

.yellow {
  background-color: yellow;
}

.orange {
  background-color: orange;
}

.blue {
  background-color: deepskyblue;
}
.green {
  background-color: green;
} 
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}
.fade-leave-from {
  opacity: 1;
  transform: scale(1);
}
.fade-leave-to {
  opacity: 0;
  transform: scale(0.5);
}
.fade-enter-from {
  opacity: 0;
  transform: scale(0.5);
}
.fade-enter-to {
  opacity: 1;
  transform: scale(1);
} 




</style>
