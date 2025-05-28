<template>
  <SideBar />
  <div class="container">
    <h1>Data Structures Exercise 4</h1>
    <p class="instructions">
      Quiz round: You will be given 5 questions related to Data Structures. Answer all 5 to complete this exercise.
    </p>

    <div v-if="quizFinished">
      <h2>Quiz Completed!</h2>
      <p>You got {{ correctAnswers }} out of 5 correct.</p>
      <p v-if="correctAnswers >= 5" style="color: green;"><strong>You passed! </strong></p>
      <p v-else style="color: red;"><strong>You didn't pass. Try again.</strong></p>
      <button @click="restartQuiz">Try Again</button>
    </div>

   <div v-else v-if="currentQuestion && currentQuestion.question">
  <h3>Question {{ currentQuestionNumber + 1 }}/5</h3>
  <p>{{ currentQuestion.question }}</p>
  <div>
    <button
      v-for="option in currentQuestion.options"
      :key="option"
      @click="checkAnswer(option)"
      class="option-button"
    >
      {{ option }}
    </button>
  </div>
</div>
  </div>

  <button class="prev"><router-link to="/datastructures/exercise2" style="color: white;">Previous</router-link></button>
  <button class="home"><router-link to="/datastructures" style="color: white;">&larr;</router-link></button>
</template>

<script>
import SideBar from '../../components/SideBar.vue';
import axios from 'axios';
export default {
  components: { SideBar },
  data() {
    return {
      fullQuestionPool:[
  {
    "question": "What is a data structure?",
    "options": ["A way to style websites", "A way to store and organize data", "A programming language", "A math formula"],
    "answer": "A way to store and organize data"
  },
  {
    "question": "What does an array store?",
    "options": ["Only strings", "Only numbers", "Elements of different types", "Elements of the same type in order"],
    "answer": "Elements of the same type in order"
  },
  {
    "question": "What is the index of the first element in an array?",
    "options": ["1", "0", "-1", "Depends on the language"],
    "answer": "0"
  },
  {
    "question": "Which array method adds an item to the end in JavaScript?",
    "options": ["pop()", "shift()", "push()", "unshift()"],
    "answer": "push()"
  },
  {
    "question": "Which array method removes the last item in JavaScript?",
    "options": ["pop()", "push()", "shift()", "splice()"],
    "answer": "pop()"
  },
  {
    "question": "What does FIFO stand for?",
    "options": ["First In First Out", "First Inside First Outside", "Fast Input Fast Output", "Fetch In Fetch Out"],
    "answer": "First In First Out"
  },
  {
    "question": "Which data structure uses the FIFO principle?",
    "options": ["Stack", "Queue", "Array", "Set"],
    "answer": "Queue"
  },
  {
    "question": "Which operation removes the first element from a queue?",
    "options": ["dequeue", "push", "pop", "peek"],
    "answer": "dequeue"
  },
  {
    "question": "What is LIFO?",
    "options": ["Last In First Out", "Loop Inside Function Output", "Logic In First Order", "Latest Inside First Outside"],
    "answer": "Last In First Out"
  },
  {
    "question": "Which data structure follows LIFO?",
    "options": ["Queue", "Stack", "Array", "Graph"],
    "answer": "Stack"
  },
  {
    "question": "Which operation adds to a stack?",
    "options": ["push()", "pop()", "insert()", "shift()"],
    "answer": "push()"
  },
  {
    "question": "Which operation removes the top element from a stack?",
    "options": ["push()", "dequeue()", "pop()", "shift()"],
    "answer": "pop()"
  },
  {
    "question": "What does the peek() function typically do in a stack?",
    "options": ["Removes the top item", "Returns the top item without removing it", "Adds a new item", "Sorts the stack"],
    "answer": "Returns the top item without removing it"
  },
  {
    "question": "Which is best for implementing a back button feature?",
    "options": ["Queue", "Array", "Stack", "Set"],
    "answer": "Stack"
  },
  {
    "question": "Which is best for a print job queue?",
    "options": ["Stack", "Queue", "Map", "List"],
    "answer": "Queue"
  },
  {
    "question": "What’s the correct way to access the 3rd element of array `let a = [5, 10, 15]`?",
    "options": ["a[3]", "a(2)", "a[2]", "a{2}"],
    "answer": "a[2]"
  },
  {
    "question": "What happens when you pop from an empty stack?",
    "options": ["Adds a null", "Returns undefined or error", "Adds zero", "Does nothing"],
    "answer": "Returns undefined or error"
  },
  {
    "question": "What’s the purpose of a queue in programming?",
    "options": ["To reverse items", "To store items in memory", "To process items in order", "To sort numbers"],
    "answer": "To process items in order"
  },
  {
    "question": "In a queue, where are new elements added?",
    "options": ["At the start", "At the middle", "At the end", "Randomly"],
    "answer": "At the end"
  },
  {
    "question": "In a stack, where are new elements added?",
    "options": ["Bottom", "Middle", "Top", "Anywhere"],
    "answer": "Top"
  }
]

,
      quizQuestions: [],
      currentQuestionNumber: 0,
      correctAnswers: 0,
      quizFinished: false,
    };
  },
  computed: {
  currentQuestion() {
    return this.quizQuestions[this.currentQuestionNumber] || {};
  }
}
,
  methods: {
    shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },
  checkAnswer(selected) {
  // Defensive check: Don't proceed if questions aren't ready
  if (this.quizQuestions.length === 0) return;

  const current = this.quizQuestions[this.currentQuestionNumber];
  if (selected === current.answer) {
    this.correctAnswers++;
  }

  this.currentQuestionNumber++;

  if (this.currentQuestionNumber >= 5) {
    this.quizFinished = true;
    if(this.correctAnswers >=5
    ){this.recordQuizCompletion()}
  }
}
,async recordQuizCompletion(){
        const username = localStorage.getItem("username");
        if(username){
        const userData = new FormData()
        userData.append('username', username);
        userData.append('exerciseid' ,4);

            userData.append('completed',true)
        
        
        userData.append('highScore',5);
        
        const exerciseupdate = await axios.post("http://localhost:8000/datatype/exercises",userData)}
      }, 
    restartQuiz() {
      this.quizFinished = false;
      this.correctAnswers = 0;
      this.currentQuestionNumber = 0;
      this.quizQuestions = this.shuffle([...this.fullQuestionPool]).slice(0, 5);
    }
  },
  mounted() {
    this.quizQuestions = this.shuffle([...this.fullQuestionPool]).slice(0, 5);
  }
};
</script>

  <style scoped>
  
  
  h1 {
    text-align: center;
    margin-bottom: 1rem;
  }
  
  .instructions {
    text-align: center;
    margin-bottom: 2rem;
    font-size: 1.1rem;
  }
  
  
  

  

  </style>
  