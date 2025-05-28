<template>
    <SideBar></SideBar>
    <div>
      <h2>Data Structures #{{ lessonId }}</h2>
      <h2 v-if="lesson">{{ lesson.title }}</h2>
      <div v-html="renderedContent" class="mainbody"></div>
    </div>

    <button v-if="lessonId !=7" @click="changelesson(1)" class="next">Next</button>
    <button v-if="lessonId !=1" @click="changelesson(-1)" class="prev">Previous</button>
    <button class="home" ><router-link to="/datastructures" style="color: white;">&larr;</router-link></button>
  </template>
  
  <script>
  import axios from 'axios'
  import SideBar from '../components/SideBar.vue';
  import MarkdownIt from 'markdown-it'
  export default {
  methods:{
    changelesson(index){
     const nextpage = parseInt( this.lessonId)  + index
     this.$router.push(`/datastructures/lessons/${nextpage}`)
    },
    async fetchLesson() {
    try {
      const response = await axios.get(`http://localhost:8000/lessons/${this.lessonId}`, {
        params: {
          module: "datastructures"
        }
      })
      this.lesson = response.data
      const username = localStorage.getItem("username")
      if(username){
        const userData = new FormData()
        userData.append('username', username)
        userData.append('lessonid' ,this.lessonId)
        userData.append('module' , "datastructures")

        const lessonupdate = await axios.post("http://localhost:8000/lessons",userData)}

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
h2{
  margin-left: 100px;
}


</style>