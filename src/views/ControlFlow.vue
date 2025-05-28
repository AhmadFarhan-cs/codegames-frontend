<template>
    <SideBar></SideBar>
    <h2>Programming is all about giving instructions, But instructions are meaningless unless sequenced correctly </h2>
    <h2>Thats where Control Flow comes mastery of which will allow you to properly construct instruction sequences thats can adapt if needed </h2>
    <div>
    <h3>Lessons</h3>
    <button v-for="(lesson,index) in lessons" :key="index" class="nodes" @click="gotolesson(lesson.id)" :style="{ color: lesson.read == true ? 'green' : 'white' }">{{ lesson.id }}</button>
</div>
<div>
    <h3>Exercises</h3>
    <button v-for="(exercise,index) in exercies" :key="index" class="nodes" @click="gotoexercise(index+1)" :style="{ color: exercise.read == true ? 'green' : 'white' }">{{ exercise.id }}</button>
    </div>
</template>



<script>
import axios from 'axios';
import SideBar from '../components/SideBar.vue';
    
export default{
    
    components:{
        SideBar
    },
    data(){
        return{
            lessons:[

                {id: 1, read: false},{id : 2,read:false},{id: 3 ,read:false},{id: 4,read:false},{id:5,read:false},{id: 6,read:false},{id: 7 ,read:false}
            ],
            exercies:[{id: 1, read: false},{id : 2,read:false},{id: 3 ,read:false}]

        }
    },
    methods:{
        gotolesson(page){
            this.$router.push(`/controlflow/lessons/${page}`)
        },
        gotoexercise(page){
            this.$router.push(`/controlflow/exercise${page}`)
        }
        
    },
    async mounted(){
        try {
      const username = localStorage.getItem("username");
      if(username){
      const response = await axios.get("http://localhost:8000/hasread", {
        params: {
          username: username,
          module: "controlflow"
        }
      });

      // Update lessons read status using response
      for (let lesson of this.lessons) {
        if (response.data.hasOwnProperty(lesson.id)) {
          lesson.read = response.data[lesson.id];
        }
      }}}
     catch (error) {
      console.error("Failed to load lesson statuses:", error);
    }
   try {
      const username = localStorage.getItem("username");
      if(username){
      const response = await axios.get("http://localhost:8000/datatype/hascompleted", {
        params: {
          username: username
        }
      });

      
      for (let exercise of this.exercies) {
        if (response.data.hasOwnProperty(exercise.id)) {
          exercise.read = response.data[exercise.id];
        }
      }}}
     catch (error) {
      console.error("Failed to load exercise statuses:", error);
    } }
}
</script>

<style scoped>
h2{
  margin-left: 100px;



}

.nodes{
    border-color: white;
}

</style>