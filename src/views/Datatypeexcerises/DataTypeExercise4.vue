<template>
  <SideBar />
  <div class="container">
    <h1>Data Types Exercise 4</h1>
    <p class="instructions">
      Quiz round: You will be given 5 questions related to data types. Answer all 5 to complete this exercise.
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

  <button class="prev"><router-link to="/datatype/exercise3" style="color: white;">Previous</router-link></button>
  <button class="home"><router-link to="/datatype" style="color: white;">&larr;</router-link></button>
</template>

<script>
import SideBar from '../../components/SideBar.vue';
import axios from 'axios';
export default {
  components: { SideBar },
  data() {
    return {
      fullQuestionPool: [
        {
          question: "What data type is the value: 42?",
          options: ["int", "float", "string", "char"],
          answer: "int"
        },
        {
          question: 'What data type is the value: "hello"?',
          options: ["char", "bool", "string", "int"],
          answer: "string"
        },
        {
          question: "What data type is the value: true?",
          options: ["bool", "string", "float", "char"],
          answer: "bool"
        },
        {
          question: "What data type is the value: 3.14?",
          options: ["float", "int", "char", "bool"],
          answer: "float"
        },
        {
          question: "What data type is the value: 'A'?",
          options: ["char", "string", "bool", "int"],
          answer: "char"
        },
        {
          question: "Which of these is a valid boolean value?",
          options: ["'true'", "True", "'1'", "yes"],
          answer: "True"
        },
        {
          question: 'Which of these represents a string in most programming languages?',
          options: ['"hello"', "123", "'a'", "true"],
          answer: '"hello"'
        },
        {
          question: "What would the data type of 5 / 2 be in most programming languages?",
          options: ["int", "float", "bool", "string"],
          answer: "float"
        },
        {
          question: "Which of these is **not** a valid data type?",
          options: ["int", "float", "number", "bool"],
          answer: "number"
        },
        {
          question: "Which of these is typically stored using one character?",
          options: ["string", "char", "bool", "int"],
          answer: "char"
        },
        {
          question: "What is the result type of: 10 == 10?",
          options: ["bool", "int", "float", "string"],
          answer: "bool"
        },
        {
          question: "Which data type would be most appropriate to store someone's age?",
          options: ["int", "string", "float", "bool"],
          answer: "int"
        },
        {
          question: "What data type is best for storing a price like 19.99?",
          options: ["int", "string", "float", "bool"],
          answer: "float"
        },
        {
          question: "What is the data type of the value: '9'?",
          options: ["int", "char", "string", "bool"],
          answer: "char"
        },
        {
          question: "What type of value is typically used in conditional checks?",
          options: ["int", "char", "string", "bool"],
          answer: "bool"
        },
        {
          question: "Which of the following is a string?",
          options: ['"123"', "123", "true", "'a'"],
          answer: '"123"'
        },
        {
          question: "Which data type does NOT store text?",
          options: ["string", "char", "bool", "None of the above"],
          answer: "bool"
        },
        {
          question: "What data type is best for storing a single word?",
          options: ["string", "char", "bool", "int"],
          answer: "string"
        },
        {
          question: "Which of these is considered a numeric data type?",
          options: ["int", "bool", "char", "string"],
          answer: "int"
        },
        {
          question: "Which data type should you use to store yes/no type answers?",
          options: ["string", "bool", "int", "char"],
          answer: "bool"
        }
      ],
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
  