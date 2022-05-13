
let source;

let tiles = [];
let cols = 4;
let rows = 4;
let board = [];
let w, h;

function preload(){
    source = loadImage("kakshi.jpg");
}

function setup(){
    createCanvas(400, 400);
    // pixel dimensions of each tiles
    w = width / cols;
    h = height / rows;

    // Chop up source image into tiles
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
        let x = i * w;
        let y = j * h;
        let img = createImage(w, h);
        img.copy(source, x, y, w, h, 0, 0, w, h);
        let index = i + j * cols;
        board.push(index);
        let tile = new Tile(index, img);
        tiles.push(tile);
        }
    }
    
    tiles.pop();
    board.pop();
    board.push(-1);
    simpleShuffle(board);
}

function randomMove(arr){
    let r1 = floor(random(cols));
    let r2 = floor(random(rows));
    moveBlock(r1,r2,arr);
}

function swap(i,j,arr){
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function simpleShuffle(arr){
    for(let i=0;i<100;i++){
        randomMove(arr);
    }
}

function mousePressed(){
    let i = floor(mouseX/w);
    let j = floor(mouseY/h);
    moveBlock(i,j,board);
}
  
function draw() {
    background(0);
    for(let i=0;i<cols;i++){
        for(let j=0;j<rows;j++){
            let index = i + j * cols;
            let x = i*w;
            let y = j*h;   
            let tileIndex = board[index];    
            if(tileIndex>-1){
                let img = tiles[tileIndex].img;
                image(img,x,y)
            }
        }
    }

    for(let i=0;i<cols;i++){
        for(let j=0;j<rows;j++){
            let x = i*w;
            let y = j*h;
            strokeWeight(2);
            noFill();
            rect(x,y,w,h)
        }
    }

    if(isSolved()){
        alert("Congratulations!!! You Solved the Puzzle");
    }
}

function isNeighbor(x1,y1,x2,y2){
    if(x2!==x1 && y2!==y1){
        return false;
    }

    if(abs(x2-x1)==1 || abs(y2-y1)==1){
        return true;
    }
    return false;
}

function moveBlock(i,j,arr){
    let blank = findBlank();
    let blankCol = blank%cols;
    let blankRow = floor(blank/rows);

    if(isNeighbor(i,j,blankCol,blankRow)){
        swap(blank,i+j*cols,arr);
    }
}

function findBlank(){
    for(let i = 0;i<board.length;i++){
        if(board[i]==-1){
            return i;
        }
    }
}

function isSolved(){
    for(let i=0;i<board.length-1;i++){
        if(board[i]!==tiles[i].index){
            return false;
        }
    }
    return true;
}