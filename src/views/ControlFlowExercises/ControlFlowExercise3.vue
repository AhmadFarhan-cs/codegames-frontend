<template>
  <SideBar />
  <div class="container">
    <h1>Control Flow Exercise 3</h1>
    <p class="instructions">
      Quiz round: You will be given 5 questions related to Control flow. Answer all 5 to complete this exercise.
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

  <button class="prev"><router-link to="/controlflow/exercise2" style="color: white;">Previous</router-link></button>
  <button class="home"><router-link to="/controlflow" style="color: white;">&larr;</router-link></button>
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
    "question": "What is control flow in programming?",
    "options": ["The order in which code runs", "A method for debugging", "A way to style text", "How variables are named"],
    "answer": "The order in which code runs"
  },
  {
    "question": "Which keyword is used to make a decision in code?",
    "options": ["loop", "if", "define", "return"],
    "answer": "if"
  },
  {
    "question": "What will this output?\nif (5 > 3) {\n  console.log('Yes');\n} else {\n  console.log('No');\n}",
    "options": ["Yes", "No", "Nothing", "Error"],
    "answer": "Yes"
  },
  {
    "question": "What does the 'else' keyword do?",
    "options": ["Stops code", "Runs code if the 'if' is false", "Defines a variable", "Repeats code"],
    "answer": "Runs code if the 'if' is false"
  },
  {
    "question": "What happens if a 'return' is called inside a function?",
    "options": ["It exits the function", "It starts a loop", "It prints to console", "It stops the whole program"],
    "answer": "It exits the function"
  },
  {
    "question": "Which of these is a valid if statement?",
    "options": ["if x > 5", "if (x > 5)", "if x > 5:", "if {x > 5}"],
    "answer": "if (x > 5)"
  },
  {
    "question": "Which structure is used to repeat code?",
    "options": ["if", "else", "loop", "function"],
    "answer": "loop"
  },
  {
    "question": "What does 'break' do in a loop?",
    "options": ["Restarts the loop", "Exits the loop early", "Skips one loop iteration", "Returns a value"],
    "answer": "Exits the loop early"
  },
  {
    "question": "What is the result of:\nfunction greet() { return 'Hi'; }\nconsole.log(greet());",
    "options": ["greet", "undefined", "Hi", "null"],
    "answer": "Hi"
  },
  {
    "question": "Which of the following changes the flow of execution?",
    "options": ["A variable", "A loop", "A function call", "A print statement"],
    "answer": "A function call"
  },
  {
    "question": "What will this print?\nif (false) { console.log('Yes'); } else { console.log('No'); }",
    "options": ["Yes", "No", "undefined", "Error"],
    "answer": "No"
  },
  {
    "question": "Which of the following runs **only** when the `if` condition is false?",
    "options": ["if", "while", "else", "return"],
    "answer": "else"
  },
  {
    "question": "Where does a program start executing?",
    "options": ["The last function", "The first line", "After all loops", "Only after all variables are declared"],
    "answer": "The first line"
  },
  {
    "question": "Which symbol is used to group code in an if or function block?",
    "options": ["()", "{}", "[]", "<>"],
    "answer": "{}"
  },
  {
    "question": "Which of these conditions is **false**?",
    "options": ["5 > 2", "3 == 3", "10 < 5", "7 != 8"],
    "answer": "10 < 5"
  },
  {
    "question": "What does `else if` allow you to do?",
    "options": ["Create a loop", "Nest a function", "Add extra conditions", "Exit a function"],
    "answer": "Add extra conditions"
  },
  {
    "question": "How many times will this run?\nfor (let i = 0; i < 3; i++) {...}",
    "options": ["1", "2", "3", "4"],
    "answer": "3"
  },
  {
    "question": "Which keyword skips to the next loop iteration?",
    "options": ["return", "skip", "continue", "exit"],
    "answer": "continue"
  },
  {
    "question": "What is the primary purpose of a function?",
    "options": ["Print values", "Loop over data", "Reuse a block of code", "Check conditions"],
    "answer": "Reuse a block of code"
  },
  {
    "question": "What happens when code reaches a return statement inside a function?",
    "options": ["The rest of the function still runs", "It throws an error", "It exits the function immediately", "It runs the code again"],
    "answer": "It exits the function immediately"
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
  