<template>
  <SideBar />
  <div class="container">
    <h1>Data Structures Exercise 1</h1>
    <p class="instructions">
      Use the available commands to navigate through the array and match the required goal.
      You can move left, move right, check values, and set values at the current position.
    </p>
    <p>{{ goal }}</p>

    <div class="array-container">
      <div
        v-for="(val, index) in array"
        :key="index"
        class="array-cell"
        :class="{ current: index === pointer }"
      >
        {{ val }}
      </div>
    </div>

    <p><strong>Current Value:</strong> {{ array[pointer] }}</p>
    <div class="controls">
      <button @click="moveLeft">moveLeft()</button>
      <button @click="moveRight">moveRight()</button>
      <button @click="checkValue">checkValue()</button>
      <button @click="setValue(1)">setValue(1)</button>
      <button @click="setValue(0)" v-if="currentlevel==2">setValue(0)</button>
      <button @click="reset">Reset</button>
    </div>

    <p>{{ feedback }}</p>
    <p v-if="isComplete" class="success">Level Compelete!</p>
  </div>
<button @click="nextLevel()"  style="color: white;">Next Level</button>
  <button class="next"><router-link to="/datastructures/exercise2" style="color: white;">Next</router-link></button>
  <button class="home"><router-link to="/datastructures" style="color: white;">&larr;</router-link></button>
</template>

<script>
import SideBar from '../../components/SideBar.vue';

export default {
  components: { SideBar },
  data() {
    return {
        maxlevels: 4,
        currentlevel: 1,
      array: [1, 0, 0, 1, 0, 1],
      pointer: 0,
      feedback: '',
      isComplete: false,
        goal: 'Set all values in the array to 1.',
    };
  },
  methods: {
    moveLeft() {
      if (this.pointer > 0) {
        this.pointer--;
        this.feedback = `Pointer moved to index ${this.pointer}`;
      } else {
        this.feedback = 'Already at the beginning of the array!';
      }
    },
    moveRight() {
      if (this.pointer < this.array.length - 1) {
        this.pointer++;
        this.feedback = `Pointer moved to index ${this.pointer}`;
      } else {
        this.feedback = 'Already at the end of the array!';
      }
    },
    checkValue() {
      this.feedback = `Value at index ${this.pointer} is ${this.array[this.pointer]}`;
    },
    setValue(value) {
   
        this.array[this.pointer] = value;
        this.feedback = `Set value at index ${this.pointer} to ${value}.`;
        this.checkCompletion();
      
    },
    checkCompletion() {
        switch(this.currentlevel) {
            case 1:
                this.isComplete = this.array.every(val => val === 1);
                break;
            case 2:
                this.isComplete = this.array.every((val, index) => (index % 2 === 0 && val === 1) || (index % 2 !== 0 && val === 0));
                break;
            case 3:
                this.isComplete = this.array.every(val => val === 1);
                break;
            case 4:
                this.isComplete = this.array.every((val, index) => (index % 2 === 0 && val === 0) || (index % 2 !== 0 && val === 1));
                break;
        }
      
    },
    reset() {
        switch(this.currentlevel) {
            case 1:
                this.array = [1, 0, 0, 1, 0, 1];
                this.goal= 'Set all values in the array to 1.'
                break;
            case 2:
                this.array = [1,1,1, 0,1, 0,0,1, 1, 1];
                this.goal = 'Alternate 1s and 0s in the array with the starting index being one and the final index being 0.';
                break;
            case 3:
                this.array = [1, 1, 1, 1];
                break;
            case 4:
                this.array = [0, 1, 0, 1];
                break;
        }
     
      this.pointer = 0;
      this.feedback = '';
      this.isComplete = false;
    },
    nextLevel() {
        if (this.currentlevel < this.maxlevels) {
            this.currentlevel++;
            this.reset();
        } else {
            this.feedback = 'You have completed all levels!';
        }
        }
  }
};
</script>

<style scoped>
.container {
  padding: 2rem;
  color: white;
  text-align: center;
  max-width: 700px;
  margin: auto;
}

.array-container {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.array-cell {
  width: 40px;
  height: 40px;
  border: 2px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
  background-color: #222;
}

.array-cell.current {
  background-color: dodgerblue;
  color: white;
}

.controls button {
  background-color: #444;
  color: white;
  border: 1px solid white;
  margin: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
}

.success {
  color: lightgreen;
  font-weight: bold;
}
</style>
