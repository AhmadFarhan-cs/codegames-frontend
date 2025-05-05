<template>
    <SideBar></SideBar>
    <h2>Data types are one of the fundamental building blocks of programming </h2>
    <h2>Mastering data types leads alows you manipulate information in ways you have never could have imagined </h2>
    <div>
    <h3>Lessons</h3>
    <button v-for="(lesson,index) in lessons" :key="index" class="nodes" @click="goto(lesson.id)" :style="{ color: lesson.read == true ? 'red' : 'white' }">{{ lesson.id }}</button>
</div>
<div>
    <h3>Exercises</h3>
    <button v-for="(exercise,index) in exercies" :key="index" class="nodes">{{ exercise }}</button>
    </div>
</template>



<script>
import axios from 'axios';
import SideBar from './components/SideBar.vue';
    
export default{
    
    components:{
        SideBar
    },
    data(){
        return{
            lessons:[

                {id: 1, read: false},{id : 2,read:false},{id: 3 ,read:false},{id: 4,read:false},{id:5,read:false}
            ],
            exercies:[1,2,3,4,5]

        }
    },
    methods:{
        goto(page){
            this.$router.push(`/datatype/lessons/${page}`)
        }
        
    },
    async mounted(){
        try {
      const username = localStorage.getItem("username");
      const response = await axios.get("http://localhost:8000/datatype/hasread", {
        params: {
          username: username
        }
      });

      // Update lessons read status using response
      for (let lesson of this.lessons) {
        if (response.data.hasOwnProperty(lesson.id)) {
          lesson.read = response.data[lesson.id];
        }
      }
    } catch (error) {
      console.error("Failed to load lesson statuses:", error);
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