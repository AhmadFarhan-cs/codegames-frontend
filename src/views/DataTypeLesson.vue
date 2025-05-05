<template>
    <SideBar></SideBar>
    <div>
      <h2>Data Type Lesson #{{ lessonId }}</h2>
      <h2 v-if="lesson">{{ lesson.title }}</h2>
      <div v-html="renderedContent" class="mainbody"></div>
    </div>

    <button v-if="lessonId !=5" @click="changelesson(1)" class="next">Next</button>
    <button v-if="lessonId !=1" @click="changelesson(-1)" class="prev">Previous</button>
  </template>
  
  <script>
  import axios from 'axios'
  import SideBar from '../components/SideBar.vue';
  import MarkdownIt from 'markdown-it'
  export default {
  methods:{
    changelesson(index){
     const nextpage = parseInt( this.lessonId)  + index
     this.$router.push(`/datatype/lessons/${nextpage}`)
    },
    async fetchLesson() {
    try {
      const response = await axios.get(`codegames-backend-production.up.railway.app/datatype/lessons/${this.lessonId}`)
      this.lesson = response.data
      const username = localStorage.getItem("username")
      if(username){
        const userData = new FormData()
        userData.append('username', username)
        userData.append('lessonid' ,this.lessonId)

        const lessonupdate = await axios.post("http://localhost:8000/datatype/lessons",userData)}

    } catch (error) {
      console.error("Lesson not found")
    }
  }},
    components:{
        SideBar
    },
    data(){
        return{
            lesson:null,
            md: new MarkdownIt()
        }
    },
    computed: {
      lessonId() {
        return this.$route.params.id
      },
      renderedContent() {
      return this.lesson ? this.md.render(this.lesson.content) : ''
    }
    },
    mounted() {
  this.fetchLesson()
},
watch: {
  '$route.params.id': function () {
    this.fetchLesson()
  }
}
  }
  </script>

  <style scoped>
.mainbody{
    margin-left: 150px;
}
.next {
  position: fixed;         /* stays in the same spot even when scrolling */
  bottom: 20px;            /* 20px from the bottom */
  right: 20px;             /* 20px from the right */
  padding: 0.75rem 1.5rem; /* padding for a nicer button */
  background-color: #555;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0,0,0,0.3);
  font-size: 1rem;
}

.next:hover,.prev:hover {
  background-color: #777;
}

.prev{
  position: fixed;         /* stays in the same spot even when scrolling */
  bottom: 20px;            /* 20px from the bottom */
  left: 250px;             /* 20px from the right */
  padding: 0.75rem 1.5rem; /* padding for a nicer button */
  background-color: #555;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0,0,0,0.3);
  font-size: 1rem;
}
h2{
  margin-left: 100px;
}

</style>