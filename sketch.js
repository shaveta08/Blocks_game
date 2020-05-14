

var grid = [];
var positions = [[0,100] , [101,200], [201,300]];
var positionx,positiony;
var pick;
var stop= false;


function setup() {
  createCanvas(300,300);
  // creating the grid.
  grid =[
    [0,0,0],
    [0,0,0],
    [0,0,0]
  ];
  console.table(grid);
  //randomly adding number to the grid.
  addNumbers();
  console.table(grid);
}

function contains(grid,pick){
  //return true if the number is in the grid else false.
  for(var i =0;i<3;i++){
    for(var j=0;j<3;j++){
      if(grid[i][j] === pick){
        return true;
      }    
    }  
  }
return false;
}

function addNumbers(){
  //looping through the array of array.
  for(i= 0;i<grid.length;i++){
    for(j= 0;j<grid.length;j++){
      // If there is empty space lets fill it
      if(grid[i][j] === 0){
        //pick a randome number 1-9
        pick = Math.round(random(1,9));
        console.log(grid.includes(pick));
        //call the contains function to check if number already exist in the grid.
        //if it does, pick again, until we have a uniqe number.
        while(contains(grid,pick)){
          pick = Math.round(random(1,9));;
        }
        //finally add it to the grid.
        grid[i][j] = pick;
      }
    }
  }
  //since we dont need the number 9 in the grid, wherever it is in the grid, make it null.
  for(i=0;i<grid.length;i++){
    for(j=0;j<grid.length;j++){
      if(grid[i][j] == 9){
        grid[i][j] = null;
      }
    }
    
  }
}

function drawgrid(){
  //width of each rect box.
  w = 100;
  for(var i = 0;i<3;i++)
    for(var j = 0;j<3;j++){
      // drawing the grid through rect instruction.
      noFill();
      strokeWeight(2);
      stroke(0);
      rect(i*w,j*w,w,w);
      //filling the grid with numbers. 
      if(grid[i][j] != null){
        textAlign(CENTER,CENTER);
        textSize(64);
        fill(0);
        noStroke(0);
        //x is center of the rect, y is also the center of rect.
        text(grid[i][j],j*w+w/2,i*w+w/2); 
      }
    }
}

function mouseClicked(){
  //when the mouse is clicked, find out which box it is on the grid
  // by comparing the min and max x,y location of each co-ordinate.
  // We have saved the i values(or indexes of array according to the location.)
  //position array is taken above as global array.
  if(mouseX < 300 && mouseY > 0 && mouseX < 300 && mouseY > 0){  
    // for i;
    //console.log(mouseX,mouseY);
    for(var i = 0 ;i<3 ; i ++)
    {
      if(mouseX >= positions[i][0] && mouseX <= positions[i][1]){
        positiony = i;
        break;
      }  
    }
    //for j
    for(var i = 0 ;i<3 ; i ++)
    {
      if(mouseY >= positions[i][0] && mouseY <= positions[i][1]){
        positionx = i;
        break;
      }  
    }
    console.log("InFunction");
    //replace the box with empty box
    for(i=0;i<3;i++){
      for(j=0;j<3;j++){
        //loop through the array of array to find which is the empty box and replcace it with
        // the found position.
        if(grid[i][j] == null){
          //once found, swap the values between empty location and clicked location.
          var temp = grid[i][j];
          grid[i][j] = grid[positionx][positiony];
          grid[positionx][positiony] = temp;
          //to move out of the inner for loop.
          stop = true;
          break;
        }
      } 
      // to move out of the outer for loop.
      if(stop == true){
        stop = false;
        break;
      }
    }
  }
}

function draw() {
  background("white");
  //calling drawgrid function to draw the grid.
  drawgrid();
}