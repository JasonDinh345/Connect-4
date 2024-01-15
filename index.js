const canvas = document.getElementById('gameBoard');
 const cells = document.querySelectorAll(".cell");
 const ctx = canvas.getContext('2d');
 console.log(ctx);
 let running = false;
 let currentPlayer = "1";

 const CANVAS_WIDTH=  canvas.width = 1050;
 const CANVAS_HEIGHT = canvas.height = 900;

 let game = [
    "0","0","0","0","0","0","0",
    "0","0","0","0","0","0","0",
    "0","0","0","0","0","0","0",
    "0","0","0","0","0","0","0",
    "0","0","0","0","0","0","0",
    "0","0","0","0","0","0","0"];
    const elements = [];

    for (let i = 6; i >= 1; i--) {
        for (let letter of ['A', 'B', 'C', 'D', 'E', 'F', 'G']) {
            const id = `${letter}${i}`;
            const element = document.getElementById(id);
            elements.push(element);
        }
    }
    
const slots =[
    {slot: A6, num: 36, }, {slot: B6, num: 37, }, {slot: C6, num: 38,}, {slot: D6, num: 39,}, {slot: E6, num: 40,}, {slot: F6, num: 41,}, {slot: G6, num: 42,}, 
    {slot: A5, num: 29,}, {slot: B5, num: 30,}, {slot: C5, num: 31,}, {slot: D5, num: 32,}, {slot: E5, num: 33,}, {slot: F5, num: 34,}, {slot: G5, num: 35,}, 
    {slot: A4, num: 22,}, {slot: B4, num: 23,}, {slot: C4, num: 24,}, {slot: D4, num: 25,}, {slot: E4, num: 26,}, {slot: F4, num: 27,}, {slot: G4, num: 28,}, 
    {slot: A3, num: 15,}, {slot: B3, num: 16,}, {slot: C3, num: 17,}, {slot: D3, num: 18,}, {slot: E3, num: 19,}, {slot: F3, num: 20,}, {slot: G3, num: 21,}, 
    {slot: A2, num: 8,}, {slot: B2, num: 9,}, {slot: C2, num: 10,}, {slot: D2, num: 11,}, {slot: E2, num: 12,}, {slot: F2, num: 13,}, {slot: G2, num: 14,}, 
    {slot: A1, num: 1,}, {slot: B1, num: 2,}, {slot: C1, num: 3,}, {slot: D1, num: 4,}, {slot: E1, num: 5,}, {slot: F1, num: 6,}, {slot: G1, num: 7,}, 
     
];

let screen = document.getElementById('screen');
let title = document.getElementById('title');
let btn = document.getElementById('play');
let restart = document.getElementById('playAgain');
let gameOver = document.getElementById('Winner');

btn.addEventListener('click', function(){
    screen.style.zIndex = "-1";
    btn.style.zIndex="-1";
    title.style.zIndex="-1";
})
restart.addEventListener('click', restartGame);

cells.forEach(cell => cell.addEventListener('click', function(){
    cellClicked(cell.getAttribute('cellIndex'));
   }))

function draw(slot, num){
       
        if(num%7 ==0){
            slot.style.width = "150px";
            slot.style.height = "150px";
            slot.style.top = (150*((num-7)/7))+"px"; 
            slot.style.left = 150*6+"px"; 
           
        }else{
            slot.style.width = "150px";
            slot.style.height = "150px";
            slot.style.top = (150*(num-(num%7))/7)+"px"; 
            slot.style.left = 150*((num%7)-1)+"px"; 
        }
        
       
    
    }
   
function makeImages(){
   
    for(let board = 0; board < game.length; board++){
        
       
        if(game[board] == "0"){
                slots[board].slot.src ='blankSpace.png';

                draw(slots[board].slot, slots[board].num);
            }else if(game[board] == "1"){
                
                slots[board].slot.src ='red.png';
                draw(slots[board].slot, slots[board].num);
                
            }else if(game[board] == "2"){
                slots[board].slot.src ='blue.png';
                draw(slots[board].slot, slots[board].num);

            }
            
          
           
            
    }
    console.log(game);
  }
 


function startGame(){
   
    for(let board = 0; board < game.length; board++){
           game[board] = "0";
     }
     
     makeImages();
   
     running = true;
   
    
}
function cellClicked(index){
    if(!running||  game[index-1] != 0){
        return;
    }
    if(currentPlayer == "1"){
        currentPlayer ="2";
    }else{
        currentPlayer ="1"
    }
  
    let checkCol = index-1;
    while(checkCol != findCol(index)-1 && checkCol-7 >=0){
        
        if(game[checkCol-7]=='0'){
            checkCol -= 7;
        }else{
            break;
        }
    }
    
   
    game[checkCol] = currentPlayer;
    makeImages();
    checkWinner(checkCol);
   

}

function checkWinner(index){
    let hCount = horizCount(index);
    let dCount = diagCount(index);
    let vCount = vertCount(index);
   
    if(hCount>=4||dCount>=4||vCount>=4){
        running=false;
        endGame();
    }


}
function horizCount(index){
    let testIndex = index;
    let horizCount = 1;
        //right of index

    while(testIndex<(6-((testIndex)%7)+testIndex)){
        
        testIndex++;
        if(game[testIndex]==currentPlayer){
            horizCount++;
        }else{
            break;
        }
    }
    //left of index
    testIndex = index;

    while(testIndex>(testIndex)-findCol(index)){
        testIndex--;
        if(game[testIndex]==currentPlayer){
        
            horizCount++;
        }else{
            break;
        }
    }


    return horizCount;
}
function diagCount(index){
    let testIndex = index;
    let diagCount =1;
    //up diagonal
    while(testIndex+8<42){
        testIndex +=8;
        if(game[testIndex] == currentPlayer){
            console.log('up');
            diagCount++;
        }else{
            break;
        }
    }
    testIndex = index;
  
    while(testIndex-8>=0){
        testIndex -=8;
        if(game[testIndex] == currentPlayer){
            console.log('down');
            diagCount++;
        }else{
            break;
        }
    }
    return diagCount;
}
function vertCount(index){
    let testIndex = index;
    let vertCount =1;
    while(testIndex+7<42){
        testIndex+=7;
        if(game[testIndex] == currentPlayer){
            vertCount++;
        }else{
            break;
        }
    }
    testIndex = index;
    while(testIndex-7>0){
        testIndex-=7;
        if(game[testIndex]==currentPlayer){
            vertCount++;
        }else{
            break;
        }
    }
    return vertCount;
}
function restartGame(){
    restart.style.zIndex = "-1";
    screen.style.zIndex = "-1";
    gameOver.style.zIndex = "-1";
    startGame();
}
function findCol(num){
    if (num%7 == 0){
        return 7
    }else{
        return num%7;
    }
}
function endGame(){
    restart.style.zIndex = "3";
    screen.style.zIndex = "2";
    gameOver.style.zIndex = "3";
    
}
startGame();



 
 
 
 
