<template>
  <SideBar></SideBar>
  <h1 style="color: white; text-align: center;">Data Structure Exercise 2</h1>
  <p>In this exercies you will have to use the push and pop functions to sort each stack to only have one type of data type</p>
 <p>you can only have one popped item at a time</p>
  <div class="stacks-container">
    <div v-for="(stack, index) in stacks" :key="index" class="stack-wrapper">
      <div class="stack-visual">
        <div
          v-for="(item, i) in [...stack.items]"
          :key="i"
          class="stack-item"
        >
          {{ item }}
        </div>
      </div>
      <div class="controls">
        <button @click="pushItem(index)">push</button>
        <button @click="popItem(index)">pop</button>
      </div>
      
    </div>
    
  </div>
  <p v-if="currentlevel === maxlevels" style="color: white; text-align: center;">this is the final level</p>
  <button v-else @click="nextlevel()">nextlevel</button>
   <p>{{ response }}</p>
  <p>Popped item: {{ poppeditem }}</p>
 <button @click="reset()" style="color: white;">Reset</button>
   <button class="next"><router-link to="/datastructures/exercise3" style="color: white;">Next</router-link></button>
      <button class="prev" ><router-link to="/datastructures/exercise1" style="color: white;">Previous</router-link></button>
      <button class="home" ><router-link to="/datastructures" style="color: white;">&larr;</router-link></button>
</template>

<script>
import SideBar from '../../components/SideBar.vue';

export default {
  components: {
    SideBar
  },
  data() {


    return {
       levelcomplete: false,
       maxlevels:4,
      currentlevel: 1,

        response: null,
      stacks: [
        { name: 'Stack 1', items: [1, "I am ", 3], top: 2 },
        { name: 'Stack 2', items: ["hello", 2, "A stack"], top: 2 },
        { name: 'Stack 3', items: [], top: -1 }
      ],
      poppeditem: null
    }
  },
  methods: {
    pushItem(index) {
  if (this.poppeditem != null && this.stacks[index].items.length < 5) {
    this.stacks[index].items.push(this.poppeditem);
    this.stacks[index].top++;
    this.response = `You pushed: ${this.poppeditem} to ${this.stacks[index].name}`;
    this.poppeditem = null;

    this.checkCompletion(); // ✅ check after a successful push

  } else if (this.stacks[index].items.length >= 5) {
    this.response = "You can only have 5 items in a stack";
  } else {
    this.response = "You need to pop an item before you can push it";
  }
}
,
    popItem(index) {
      if (this.stacks[index].items.length > 0 && this.poppeditem == null) {
        
       this.poppeditem= this.stacks[index].items.pop();
        this.stacks[index].top--;
        this.response = `You popped: ${this.poppeditem}`;
      }
      else{
        if(this.poppeditem != null){
          this.response = "You can only pop one item at a time"
        }
        else{
          this.response = "There is no item to pop"
        }
      }
    },
    checkCompletion() {
  const allStacksValid = this.stacks.every(stack => {
    if (stack.items.length === 0) return true; // Empty stacks are valid
    if (stack.items.length === 1) return false; // Stacks with one item are not valid for this exercise

    const firstType = typeof stack.items[0];
    return stack.items.every(item => typeof item === firstType);
  });

  if (allStacksValid) {
    this.response = "Exercise complete! Each stack contains only one type of data.";
    this.levelcomplete = true;
  }
}, 
    reset() {

      switch (this.currentlevel) {
        case 1:
          this.stacks = [
        { name: 'Stack 1', items: [1, "I am ", 3], top: 2 },
        { name: 'Stack 2', items: ["hello", 2, "A stack"], top: 2 },
        { name: 'Stack 3', items: [], top: -1 }
      ];
          break;
        case 2:
          this.stacks = [
        { name: 'Stack 1', items: [1, "congrats", 3, " you are", "getting"], top: 4 },
        { name: 'Stack 2', items: ["used to", 2, "stacks", 4, 5], top: 4 },
        { name: 'Stack 3', items: [], top: -1 }
      ];
          break;
        case 3:
          this.stacks = [
        { name: 'Stack 1', items: [6.6, "I am ", 3], top: 2 },
        { name: 'Stack 2', items: ["hello", 2, 3.6], top: 2 },
         { name: 'Stack 3', items: [1.5,"A stack",1], top: -1 },
        { name: 'Stack 4', items: [], top: -1 }
      ];
          break;
        case 4:
         this.stacks= [{ name: 'Stack 1', items: [6.6, "congrats ", 3,7.8,5], top: 2 },
        { name: 'Stack 2', items: ["you are", 2, 3.6,"used to",1.1], top: 2 },
         { name: 'Stack 3', items: [1.5,"stacks",1, "getting",4], top: -1 },
        { name: 'Stack 4', items: [], top: -1 }]
          break;
        case 5:
          this.response = "Level 5 reset";
          break;
        default:
          this.response = "Unknown level";
      }
      
      this.poppeditem = null;
      this.response = null;
      this.levelcomplete = false;
    },
    nextlevel() {
      if (this.currentlevel < this.maxlevels) {
        this.currentlevel++;
        this.reset();
      }
    }

  }
}
</script>

<style scoped>
body {
  background-color: black;
}

.stacks-container {
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding: 2rem;
}

.stack-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
}

.stack-visual {
  width: 100px;
  height: 200px;
  border: 2px solid white;
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-start;
  align-items: center;
  padding: 5px;
  background-color: black;
  margin-bottom: 1rem;
}

.stack-item {
  width: 90%;
  padding: 5px;
  margin: 2px 0;
  background-color: white;
  color: black;
  text-align: center;
  border-radius: 4px;
}

.controls button {
  margin: 0 5px;
  padding: 5px 10px;
  background: none;
  border: 2px solid white;
  color: white;
  cursor: pointer;
  font-weight: bold;
}
</style>
