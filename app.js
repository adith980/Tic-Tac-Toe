let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newgameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO =true //player X, player O

const winPatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [3,4,5],
    [6,7,8],
    [2,4,6]
];

//reset
const resetgame = () =>{                                //start a new game
    turnO=true;
    enableboxes();
    msgContainer.classList.add("hide");                //hides winner button again

};

boxes.forEach((box) =>{                                 

    box.addEventListener("click", () => {              //arrow function —> click → place symbol → check winner
        
        if(turnO){                  //player X
            box.innerText="X";
            box.classList.add("x-color");
            turnO=false;
        }
        else{                      //player O
        box.innerText="O";
        box.classList.add("o-color");
        turnO=true;
    }
    box.disabled=true;
    checkWinner();                                  //checking winner after the box is clicked every time
    });
});

const enableboxes =()=>{                            //enable all boxses as the new game starts
    for(let box of boxes){
        box.disabled = false;
        box.innerText= "";
        box.classList.remove("x-color","o-color");
    }
};

const disabledBoxes = ()=> {                         //disable all boxses when game ends 
    for(let box of boxes){
        box.disabled = true;
    }
};

const showWinner = (winner)=>{
    msg.innerText= `Congratulations, the Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disabledBoxes();                                //so that game diesnt continue
};

const checkWinner = () => { 
    for(let pattern of winPatterns)                 //pattern now has the winPatterns (2D array)
    {
        let pos1val= boxes[pattern[0]].innerText;   //ps1, ps2, ps3 are positions and they contain the info on which box has x and o
        let pos2val= boxes[pattern[1]].innerText;   //pattern contains the winning 2D array (0,1,2 represents all 3 rows)
        let pos3val= boxes[pattern[2]].innerText; 
        //winning condition
        if(pos1val!="" && pos2val!=""&& pos3val!=""){   //no boxes are empty prevents false winner
            if(pos1val===pos2val&& pos2val===pos3val){  // all boxes have same letter X or O

                showWinner(pos1val);                    //winner shows after win condition satisfies
            }
        }
    }
};
newgameBtn.addEventListener("click",resetgame);
resetBtn.addEventListener("click",resetgame);