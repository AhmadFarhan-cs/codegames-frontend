<template>
  <SideBar></SideBar>
  <h1 style="color: white; text-align: center;">Data Structure Exercise 3</h1>
  <p>In this exercies you will have to use the queue and dequeue functions to sort each queue to only have one type of data type</p>
 <p>you can only have one dequeued item at a time</p>
  <div class="queues-container">
    <div v-for="(queue, index) in queues" :key="index" class="queue-wrapper">
      <div class="queue-visual">
        <div
          v-for="(item, i) in [...queue.items]"
          :key="i"
          class="queue-item"
        >
          {{ item }}
        </div>
      </div>
      <div class="controls">
        <button @click="queueItem(index)">queue</button>
        <button @click="dequeueItem(index)">dequeue</button>
      </div>
      
    </div>
    
  </div>
  <p v-if="currentlevel === maxlevels" style="color: white; text-align: center;">this is the final level</p>
  <button v-else @click="nextlevel()">nextlevel</button>
   <p>{{ response }}</p>
  <p>dequeued item: {{ dequeueditem }}</p>
 <button @click="reset()" style="color: white;">Reset</button>
   <button class="next"><router-link to="/datastructures/exercise4" style="color: white;">Next</router-link></button>
      <button class="prev" ><router-link to="/datastructures/exercise2" style="color: white;">Previous</router-link></button>
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
      queues: [
        { name: 'queue 1', items: [1, "I am ", 3], top: 2 },
        { name: 'queue 2', items: ["hello", 2, "A queue"], top: 2 },
        { name: 'queue 3', items: [], top: -1 }
      ],
      dequeueditem: null
    }
  },
  methods: {
    queueItem(index) {
  if (this.dequeueditem != null && this.queues[index].items.length < 5) {
    this.queues[index].items.push(this.dequeueditem);
    this.queues[index].top++;
    this.response = `You queued: ${this.dequeueditem} to ${this.queues[index].name}`;
    this.dequeueditem = null;

    this.checkCompletion(); // ✅ check after a successful push

  } else if (this.queues[index].items.length >= 5) {
    this.response = "You can only have 5 items in a queue";
  } else {
    this.response = "You need to dequeue an item before you can queue it";

  }
}
,dequeueItem(index) {
  if (this.queues[index].items.length > 0 && this.dequeueditem == null) {
    this.dequeueditem = this.queues[index].items.shift(); // FIFO: remove from front
    this.queues[index].top--;
    this.response = `You dequeued: ${this.dequeueditem} from ${this.queues[index].name}`;
  } else {
    if (this.dequeueditem != null) {
      this.response = "You can only dequeue one item at a time";
    } else {
      this.response = "There is no item to dequeue";
    }
  }
},
    checkCompletion() {
  const allqueuesValid = this.queues.every(queue => {
    if (queue.items.length === 0) return true; // Empty queues are valid
    if (queue.items.length === 1) return false; // queues with one item are not valid for this exercise

    const firstType = typeof queue.items[0];
    return queue.items.every(item => typeof item === firstType);
  });

  if (allqueuesValid) {
    this.response = "Exercise complete! Each queue contains only one type of data.";
    this.levelcomplete = true;
  }
}, 
    reset() {

      switch (this.currentlevel) {
        case 1:
          this.queues = [
        { name: 'queue 1', items: [1, "I am ", 3], top: 2 },
        { name: 'queue 2', items: ["hello", 2, "A queue"], top: 2 },
        { name: 'queue 3', items: [], top: -1 }
      ];
          break;
        case 2:
          this.queues = [
        { name: 'queue 1', items: [1, "congrats", 3, " you are", "getting"], top: 4 },
        { name: 'queue 2', items: ["used to", 2, "queues", 4, 5], top: 4 },
        { name: 'queue 3', items: [], top: -1 }
      ];
          break;
        case 3:
          this.queues = [
        { name: 'queue 1', items: [6.6, "I am ", 3], top: 2 },
        { name: 'queue 2', items: ["hello", 2, 3.6], top: 2 },
         { name: 'queue 3', items: [1.5,"A queue",1], top: -1 },
        { name: 'queue 4', items: [], top: -1 }
      ];
          break;
        case 4:
         this.queues= [{ name: 'queue 1', items: [6.6, "congrats ", 3,7.8,5], top: 2 },
        { name: 'queue 2', items: ["you are", 2, 3.6,"used to",1.1], top: 2 },
         { name: 'queue 3', items: [1.5,"queues",1, "getting",4], top: -1 },
        { name: 'queue 4', items: [], top: -1 }]
          break;
        case 5:
          this.response = "Level 5 reset";
          break;
        default:
          this.response = "Unknown level";
      }
      
      this.dequeueditem = null;
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

.queues-container {
  display: block;
  justify-content: center;
  gap: 2rem;
  padding: 2rem;
}

.queue-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
}
.queue-visual {
  width: auto;
  min-height: 60px;
  border: 2px solid white;
  display: flex;

  flex-direction: row; /* horizontal layout */
  justify-content: flex-start;
  align-items: center;
  padding: 5px;
  background-color: black;
  margin-bottom: 1rem;
  margin-top: 1rem;
  gap: 5px;
}

.queue-item {
  min-width: 50px;
  padding: 5px 10px;
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
