<template>
  <div class="profile-container">
    <SideBar />

    <div class="main-content"> 
      <h1 class="username">{{ username }}</h1>
        
      <div class="tabs">
        <button :class="{ active: activeTab === 'progress' }" @click="activeTab = 'progress'">Progress</button>
        <button :class="{ active: activeTab === 'achievements' }" @click="activeTab = 'achievements'">Achievements</button>
      </div>

      <div v-if="activeTab === 'progress'" class="progress-section">
        <h2>Modules progress</h2>
        <div class="module-box">
          <h3>Data Types</h3>
          <p>Lessons: {{ Math.round((datatypeprogress.completed_lessons / datatypeprogress.totalLessons) * 100) }}%</p>
          <p>Exercises: {{Math.round((datatypeprogress.completed_exercises/ datatypeprogress.totalExercises)*100 )}}%</p>
          <p>High Scores: {{ datatypeprogress.highScores.join(', ') }}</p>
        </div>
      </div>

      <div v-if="activeTab === 'achievements'" class="achievements-section">
        <h2>Achievements</h2>
        <p>🏆 Feature coming soon...</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import SideBar from '../components/SideBar.vue';

export default {
  components: { SideBar },
  data() {
    return {
      username: '',
      activeTab: 'progress',
      datatypeprogress: {
        totalLessons: 5,
        totalExercises: 4,
        completed_lessons: 0,  
        completed_exercises: 0,
        highScores: [0, 0, 0, 0],
      },
    };
  },
  async mounted() {
    const name = localStorage.getItem('username');
    if (name) {
      this.username = name;
      try {
        const response = await axios.get(`http://localhost:8000/progress`, {
          params: { username: this.username },
        });
        const data = response.data;

        this.datatypeprogress.completed_lessons = data.completed_lessons;
        this.datatypeprogress.completed_exercises = data.completed_exercises;
        this.datatypeprogress.highScores = data.highScores;

      } catch (error) {
        console.error('Failed to fetch progress:', error);
      }
    }
  }
};

</script>
<style scoped>
 

.profile-container {
  display: flex;
  color: white;
  height: 100vh;
  background-color: black;
}

.main-content {
  margin-left: 220px; /* enough space for sidebar */
  padding: 2rem;
  width: 100%;
}

.username {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.tabs button {
  background: none;
  border: 2px solid white;
  color: white;
  padding: 0.5rem 1rem;
  font-weight: bold;
  cursor: pointer;
}

.tabs button.active {
  background-color: white;
  color: black;
}

.module-box {
  border: 2px solid white;
  padding: 1rem;
  width: fit-content;
  margin-top: 1rem;
}

.module-box h3 {
  margin-bottom: 0.5rem;
}

.achievements-section {
  margin-top: 1rem;
}
</style>
