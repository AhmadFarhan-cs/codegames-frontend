<template>
  <SideBar />
  <div class="container">
    <h1>Control Flow Exercise 1</h1>
    <p class="instructions">
      You will be shown a grid. The goal is to lead the blue sqaure to the green sqaure by using the directional functions
      <strong>up(), down(), left(), right()</strong>. 
      the number of function calls you have is limited so think carefully about the sequnce of calls. 
      once a function is called the blue square will move in that direction untill it can't anymore after which the next function in sequnce will execute .</p>
    <div class="grid">
      <div 
        v-for="(row, rowIndex) in grid" 
        :key="rowIndex" 
        class="row"
      >
        <div 
          v-for="(cell, colIndex) in row" 
          :key="colIndex"
          class="cell"
          :class="{
            black: cell === 0,
            grey: cell === 1,
            green: cell === 2,
            blue: cell === 3
          }"
        ></div>
      </div>
      <p>{{ response }}</p>
      <p v-if="level === no_of_levels && levelcompleted">Congratulations! You have completed all levels!</p>
      <p v-else-if ="levelcompleted" @click="nextlevel()">Click here to go to the next level</p>
      <div class="functions">
        
  <button
    v-for="func in ['up()', 'down()', 'left()', 'right()']"
    :key="func"
    @click="addToSequence(func)"
    class="function-button"
  >
    {{ func }}
  </button>
</div>
<div>
<p>Remaining calls {{ max_calls - current_calls }}</p>
<p>Current Sequence: <strong>{{ sequence.join(' -> ') }}</strong></p>
<button @click="reset()" class="function-button">Reset</button>
<button @click="execute()" class="function-button">Execute</button>

</div>
<p>Attempts: {{ attempts}}</p>
    </div>

    <button class="next"><router-link to="/controlflow/exercise2" style="color: white;">Next</router-link></button>
    <button class="prev"><router-link to="/controlflow" style="color: white;">&larr;</router-link></button>
  </div>
</template>
  
  <script>
  import { RouterLink } from 'vue-router';
import SideBar from '../../components/SideBar.vue';
import axios from 'axios';
  
  export default {
    components: { SideBar },
    data() {
    
      return {
        levelcompleted: false,
        level: 1,
      no_of_levels:4,
      response:"",
        attempts: 0,
        grid: [
        [1, 1, 2,1,1,1,1,1],
        [1, 0, 0,0,0,0,0,1],
        [1, 1, 0,0,0,0,0,1],
        [1, 1, 0,1,0,0,1,1],
        [1, 0, 0,0,0,3,1,1],
        [1, 1, 1,1,1,1,1,1],
      ]
    ,
     max_calls:5,
     current_calls: 0,
     sequence: [],
     startingrow: 4,
      startingcol: 5,
      currentrow: 4,
      currentcol: 5,
      goalrow: 0,
      goalcol: 2,
      executing: false,
      };
    },
    methods: {
      addToSequence(func) {
        if (this.current_calls < this.max_calls) {
          this.sequence.push(func);
          this.current_calls++;
          
        }
        
      },delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
,
    async  move(func) {
        if(func === 'up()') {
         await this.moveUp();
        } else if (func === 'down()') {
          await this.moveDown();
        } else if (func === 'left()') {
         await this.moveLeft();
        } else if (func === 'right()') {
         await this.moveRight();
        }
      },
     async moveUp() {
       while (this.grid[this.currentrow - 1][this.currentcol] !== 1 && this.currentrow > 0) {
          this.grid[this.currentrow][this.currentcol] = 0;
          this.currentrow--;
          this.grid[this.currentrow][this.currentcol] = 3;
          await this.delay(300);
          if (this.currentrow === this.goalrow && this.currentcol === this.goalcol) {
            break;
          }
        }
      },
    async  moveDown() {
        while (this.grid[this.currentrow + 1][this.currentcol] !== 1 && this.currentrow < this.grid.length - 1) {
          this.grid[this.currentrow][this.currentcol] = 0;
          this.currentrow++;
          this.grid[this.currentrow][this.currentcol] = 3;
          await this.delay(300);
           if (this.currentrow === this.goalrow && this.currentcol === this.goalcol) {
            break;
          }
        }
      },
    async  moveLeft() {
        while (this.grid[this.currentrow][this.currentcol - 1] !== 1 && this.currentcol > 0) {
          this.grid[this.currentrow][this.currentcol] = 0;
          this.currentcol--;
          this.grid[this.currentrow][this.currentcol] = 3;
          await this.delay(300);
           if (this.currentrow === this.goalrow && this.currentcol === this.goalcol) {
            break;
          }
        }
      },
   async   moveRight() {
        while (this.grid[this.currentrow][this.currentcol + 1] !== 1 && this.currentcol < this.grid[0].length - 1) {
          this.grid[this.currentrow][this.currentcol] = 0;
          this.currentcol++;
          this.grid[this.currentrow][this.currentcol] = 3;
          await this.delay(300);
           if (this.currentrow === this.goalrow && this.currentcol === this.goalcol) {
            break;
          }
        }
      },


      reset() {
        if(!this.executing){
        this.sequence = [];
        this.current_calls = 0;
        this.response = "Sequence reset";
        this.currentrow = this.startingrow;
        this.currentcol = this.startingcol;
        switch (this.level) {
          case 1:
            this.grid = [
              [1, 1, 2,1,1,1,1,1],
              [1, 0, 0,0,0,0,0,1],
              [1, 1, 0,0,0,0,0,1],
              [1, 1, 0,1,0,0,1,1],
              [1, 0, 0,0,0,3,1,1],
              [1, 1, 1,1,1,1,1,1]
              
            ];
            break;
          case 2:
            this.grid = [
              [1, 2, 1,1,1,1,1,1],
              [1, 0, 0,0,0,0,0,1],
              [1, 0, 1,0,1,0,1,1],
              [1, 1, 0,0,1,0,0,1],
              [1, 3, 0,0,0,0,0,1],
              [1, 1, 1,1,1,1,1,1]
              
            ];
            break;
          case 3:
            this.grid = [
              [1, 1, 1,1,1,2,1,1],
              [1, 0, 0,0,0,0,1,1],
              [1, 0, 0,1,0,0,0,1],
              [1, 1, 0,0,0,0,0,1],
              [1, 0, 0,3,0,0,0,1],
              [1, 1, 1,1,1,1,1,1]
              
            ];
            break;
          case 4:
            this.grid = [
              [1, 1, 1,1,2,1,1,1],
              [1, 1, 0,0,0,0,0,1],
              [1, 0, 0,0,0,0,0,1],
              [1, 0, 0,1,0,0,0,1],
              [1, 0, 0,3,0,0,1,1],
              [1, 1, 1,1,1,1,1,1]
              
            ];
            break;
        }

      }},
    async  execute() {
      if(this.levelcompleted){
        return;
      }
        this.response = "Executing sequence...";
      this.executing = true;
        this.currentrow = this.startingrow;
        this.currentcol = this.startingcol;
        if (this.current_calls === this.max_calls) {
        this.attempts++;
          for (let func of this.sequence) {
            await this.move(func);
          
          }
          if (this.currentrow === this.goalrow && this.currentcol === this.goalcol) {
            this.response = "You reached the goal!";
            this.levelcompleted = true;
          } else {
            this.response = "You didn't reach the goal.";
          }
        } else {
          this.response="You need to use all your function calls before executing.";
        }
        this.executing = false;
      },
      nextlevel() {
        this.reset();
        this.level++;
        this.levelcompleted = false;
        this.current_calls = 0;
        this.response = "";
        this.attempts = 0;
        switch (this.level) {
          case 2:
            this.grid = [
              [1, 2, 1,1,1,1,1,1],
              [1, 0, 0,0,0,0,0,1],
              [1, 0, 1,0,1,0,1,1],
              [1, 1, 0,0,1,0,0,1],
              [1, 3, 0,0,0,0,0,1],
              [1, 1, 1,1,1,1,1,1]
              
            ];
            this.goalrow = 0
              this.goalcol = 1
              this.startingrow = 4
              this.startingcol = 1
              this.currentcol = this.startingcol
              this.currentrow = this.startingrow
              this.max_calls = 6
            break;
          case 3:
           this.grid = [
              [1, 1, 1,1,1,2,1,1],
              [1, 0, 0,0,0,0,1,1],
              [1, 0, 0,1,0,0,0,1],
              [1, 1, 0,0,0,0,0,1],
              [1, 0, 0,3,0,0,0,1],
              [1, 1, 1,1,1,1,1,1]
              
            ];
            this.goalrow = 0
              this.goalcol = 5
              this.startingrow = 4
              this.startingcol = 3
              this.currentcol = this.startingcol
              this.currentrow = this.startingrow
              this.max_calls = 5
            break;
            break;
          case 4:
           this.grid = [
              [1, 1, 1,1,2,1,1,1],
              [1, 1, 0,0,0,0,0,1],
              [1, 0, 0,0,0,0,0,1],
              [1, 0, 0,1,0,0,0,1],
              [1, 0, 0,3,0,0,1,1],
              [1, 1, 1,1,1,1,1,1]
              
            ];
            this.goalrow = 0
              this.goalcol = 4
              this.startingrow = 4
              this.startingcol = 3
              this.currentcol = this.startingcol
              this.currentrow = this.startingrow
              this.max_calls = 6
            break;
        
        }
      }
    }
    
   
  };
  </script>
  
  <style scoped>
  .container {
    padding: 2rem;
    max-width: 600px;
    margin: auto;
    color: #fff;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 1rem;
  }
  
  .instructions {
    text-align: center;
    margin-bottom: 2rem;
    font-size: 1.1rem;
  }

  .grid {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin: 2rem auto;
  width: fit-content;
}

.row {
  display: flex;
  gap: 4px;
}

.cell {
  width: 30px;
  height: 30px;
  border-radius: 4px;
}

.black {
  background-color: black;
}

.grey {
  background-color: grey;
}

.green {
  background-color: green;
}

.blue {
  background-color: blue;
}
.functions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin: 1rem 0;
}

.function-button {
  background-color: #444;
  color: white;
  border: 2px solid white;
  padding: 0.5rem 1rem;
  font-size: 1.1rem;
  cursor: pointer;
  border-radius: 6px;
  transition: background-color 0.2s;
}

.function-button:hover {
  background-color: #666;
}
  
  </style>
  