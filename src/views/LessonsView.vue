<template>
    <SideBar/>
    <h2>Select one of the modules below to get started </h2>
    <button @click="goto('datatype')" class="module">Data types</button>
    <button class="module">Instruction flow</button>
    <br>
    <button class="module">Controlling loops</button>
    <button class="module">Data Structures</button>
</template>

<script>
import SideBar from '../components/SideBar.vue';

export default{
    components:{
        SideBar
    },
    methods: {
  goto(page) {
    if (page === "datatype"){
    this.$router.push("/datatype")}
  }
}

}
</script>

<style scoped>
.module {
  width: 300px;           /* wider */
  height: 150px;          /* taller */
  margin: 1rem;
  font-size: 1.5rem;      /* bigger text */
  font-weight: bold;
  color: white;           /* text color */
  
  background-size: cover; /* make the image fill the button */
  background-position: center;
  border: none;
  border-radius: 12px;    /* rounded corners */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.module:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.5);
}
</style>
