<template>
  <SideBar />
  <div class="container">
    <h1>Control Flow Exercise 2</h1>
    <p class="instructions">
      You will be shown a grid. The goal is to lead the blue sqaure to the green square.
    this time however you cannot choose the sequence of movement and instead have to rely on the differently colored squares
    you have to ability to change the direction of the blue sqaure</p>
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
            blue: cell === 3,
            orange: cell === 4,
            yellow: cell === 5,
            red: cell === 6,
            purple: cell === 7,
          }"
        ></div>
      </div>
      <p>{{ response }}</p>
      <p v-if="level === no_of_levels && levelcompleted">Congratulations! You have completed all levels!</p>
      <p v-else-if ="levelcompleted" @click="nextlevel()">Click here to go to the next level</p>
      <div class="functions">
        
  
</div>
<div>

<p>Initial Direction: <strong>{{ intialDirection  }}</strong></p>

<button @click="reset()" class="function-button">Reset</button>
<button @click="execute()" class="function-button">Execute</button>
<div v-for="dir in directions" :key="dir.id" class="direction-block">
  <p>if (<span :class="getColorClass(dir.id)">{{ getColorName(dir.id) }}</span>) {</p>

  <div class="direction-toggle">
    <span @click="cycleDirection(dir.id, -1)" class="arrow">&#10094;</span>
    <span class="current-dir">{{ dir.name || 'None' }}</span>
    <span @click="cycleDirection(dir.id, 1)" class="arrow">&#10095;</span>
  </div>

  <p>}</p>
</div>
  
</div>
<p>Attempts: {{ attempts}}</p>
    </div>
<button class="next"><router-link to="/controlflow/exercise3" style="color: white;">Next</router-link></button>
      <button class="prev" ><router-link to="/controlflow/exercise1" style="color: white;">Previous</router-link></button>
      <button class="home" ><router-link to="/controlflow" style="color: white;">&larr;</router-link></button>
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
        intialDirection: "up()",
        directions: [
      { id: 4, name: "up()" },
      { id: 5, name: "up()" },
      { id: 6, name: "up()" },
      { id: 7, name: "up()" }
    ],
    directionOptions: ["up()", "down()", "left()", "right()"],
        levelcompleted: false,
        level: 1,
      no_of_levels:4,
      response:"",
        attempts: 0,
        grid: [
        [1, 1, 2,1,1,1,1,1],
        [1, 0, 0,0,6,5,0,1],
        [1, 0, 4,0,7,0,0,1],
        [1, 0, 0,0,0,0,0,1],
        [1, 0, 0,0,0,3,0,1],
        [1, 1, 1,1,1,1,1,1],
      ]
    ,
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
    cycleDirection(id, step) {
    const dir = this.directions.find(d => d.id === id);
    if (!dir) return;

    const currentIndex = this.directionOptions.indexOf(dir.name);
    const nextIndex = (currentIndex + step + this.directionOptions.length) % this.directionOptions.length;
    dir.name = this.directionOptions[nextIndex];
  },
  getColorName(id) {
    return { 4: "orange", 5: "yellow", 6: "red", 7: "purple" }[id] || "unknown";
  },
  getColorClass(id) {
    return { 4: "orange", 5: "yellow", 6: "red", 7: "purple" }[id] || "";
  }
  ,delay(ms) {
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
          const square = this.grid[this.currentrow-1][this.currentcol]
          this.currentrow--;
          this.grid[this.currentrow][this.currentcol] = 3;
          await this.delay(300);
          if (this.currentrow === this.goalrow && this.currentcol === this.goalcol) {
            break;
          }
          if(square !==0){
           await this.changeDirection(square)
            return
          }
        }
      },
    async  moveDown() {
        while (this.grid[this.currentrow + 1][this.currentcol] !== 1 && this.currentrow < this.grid.length - 1) {
          this.grid[this.currentrow][this.currentcol] = 0;
            const square = this.grid[this.currentrow+1][this.currentcol]
          this.currentrow++;
          this.grid[this.currentrow][this.currentcol] = 3;
          await this.delay(300);
           if (this.currentrow === this.goalrow && this.currentcol === this.goalcol) {
            break;
          }
          if(square !==0){
          await this.changeDirection(square)
            return
          }
        }
      },
    async  moveLeft() {
        while (this.grid[this.currentrow][this.currentcol - 1] !== 1 && this.currentcol > 0) {
          this.grid[this.currentrow][this.currentcol] = 0;
            const square = this.grid[this.currentrow][this.currentcol-1]
          this.currentcol--;
          this.grid[this.currentrow][this.currentcol] = 3;
          await this.delay(300);
           if (this.currentrow === this.goalrow && this.currentcol === this.goalcol) {
            break;
          }
            if(square !==0){
           await  this.changeDirection(square)
                return
            }
        }
      },
   async   moveRight() {
        while (this.grid[this.currentrow][this.currentcol + 1] !== 1 && this.currentcol < this.grid[0].length - 1) {
          this.grid[this.currentrow][this.currentcol] = 0;
            const square = this.grid[this.currentrow][this.currentcol+1]
          this.currentcol++;
          this.grid[this.currentrow][this.currentcol] = 3;
          await this.delay(300);
           if (this.currentrow === this.goalrow && this.currentcol === this.goalcol) {
            break;
          }
            if(square !==0){
           await  this.changeDirection(square)
                return
            }
        }
      },

      async changeDirection(square){
    const item = this.directions.find(obj => obj.id === square);
  if (!item) {
    console.log("No item found with id:", id);
    return;
  }

  switch (item.name) {
    case "up()":
      await this.moveUp();
      break;
    case "down()":
        await this.moveDown();
      break;
    case "left()":
        await this.moveLeft();
        break;
    case "right()":
        await this.moveRight();
      break;
  }
      },


      reset() {
        if(!this.executing){
       
       
       
        this.currentrow = this.startingrow;
        this.currentcol = this.startingcol;
        switch (this.level) {
          case 1:
            this.grid = [
              [1, 1, 2,1,1,1,1,1],
              [1, 0, 0,0,6,5,0,1],
              [1, 0, 4,0,7,0,0,1],
              [1, 0, 0,0,0,0,0,1],
              [1, 0, 0,0,0,3,0,1],
              [1, 1, 1,1,1,1,1,1]
              
            ];
            break;
          case 2:
            this.grid = [
              [1, 1, 1,1,1,1,1,1],
              [1, 0, 6,0,5,1,0,1],
              [1, 3, 4,0,0,0,6,1],
              [1, 1, 0,0,0,0,1,1],
              [2, 0, 0,0,7,0,0,1],
              [1, 1, 1,1,1,1,1,1]
            ];
            break;
          case 3:
            this.grid = [
              [1, 1, 1,1,1,1,1,1],
              [1, 7, 5,0,0,0,0,1],
              [1, 0, 0,0,0,0,0,1],
              [1, 0, 4,0,0,0,0,1],
              [1, 6, 0,0,3,0,0,1],
              [1, 1, 2,1,1,1,1,1]
              
            ];
            break;
          case 4:
            this.grid = [
              [1, 1, 1,1,1,1,1,1],
              [1, 0, 0,0,0,0,0,1],
              [1, 6, 0,5,0,0,4,1],
              [1, 0, 0,0,0,0,0,1],
              [2, 4, 1,3,0,0,7,1],
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
        
        this.attempts++;
          
        await this.move(this.intialDirection);
          
          
          if (this.currentrow === this.goalrow && this.currentcol === this.goalcol) {
            this.response = "You reached the goal!";
            this.levelcompleted = true;
          } else {
            this.response = "You didn't reach the goal.";
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
              [1, 1, 1,1,1,1,1,1],
              [1, 0, 6,0,5,1,0,1],
              [1, 3, 4,0,0,0,6,1],
              [1, 1, 0,0,0,0,1,1],
              [2, 0, 0,0,7,0,0,1],
              [1, 1, 1,1,1,1,1,1]
              
            ];
            this.goalrow = 4
              this.goalcol = 0
              this.startingrow = 2
              this.startingcol = 1
              this.currentcol = this.startingcol
              this.currentrow = this.startingrow
              this.intialDirection="right()"
              
            break;
          case 3:
           this.grid = [
              [1, 1, 1,1,1,1,1,1],
              [1, 7, 5,0,0,0,0,1],
              [1, 0, 0,0,0,0,0,1],
              [1, 0, 4,0,0,0,0,1],
              [1, 6, 0,0,3,0,0,1],
              [1, 1, 2,1,1,1,1,1]
              
            ];
            this.goalrow = 5
              this.goalcol = 2
              this.startingrow = 4
              this.startingcol = 4
              this.currentcol = this.startingcol
              this.currentrow = this.startingrow
              this.intialDirection="left()"
            break;
            break;
          case 4:
           this.grid = [
              [1, 1, 1,1,1,1,1,1],
              [1, 0, 0,0,0,0,0,1],
              [1, 6, 0,5,0,0,4,1],
              [1, 0, 0,0,0,0,0,1],
              [2, 4, 1,3,0,0,7,1],
              [1, 1, 1,1,1,1,1,1]
              
            ];
            this.goalrow = 4
              this.goalcol = 0
              this.startingrow = 4
              this.startingcol = 3
              this.currentcol = this.startingcol
              this.currentrow = this.startingrow
              this.intialDirection="right()"
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
.orange {
  background-color: orange;
}
.yellow {
  background-color: yellow;
}
.red {
  background-color: red;
}
.purple {
  background-color: purple;
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
.direction-block {
  margin-bottom: 1.5rem;
  text-align: center;
}

.direction-toggle {
  background-color: grey;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin: 0.5rem 0;
}

.arrow {
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  user-select: none;
  color: white;
}

.current-dir {
  font-weight: bold;
  font-size: 1.2rem;
  color: white;
}

  
  </style>
  