let gameSeq = [];
let userSeq = [];
let started = false;
let level = 0;
let highest_score = 0;
let btns = ["red" , "yellow" , "green" , "purple"];

let h2 = document.querySelector('h2');

document.addEventListener("keypress" , function()
{
    if(started == false)
    {
        console.log("Game is started");
        started = true;
        levelUp();
    }
});

function gameFlash(btn)
{
    btn.classList.add("gameFlash");

    setTimeout(function()
    {
        btn.classList.remove("gameFlash");
    } ,350);
}

function userFlash(btn)
{
    btn.classList.add("userFlash");

    setTimeout(function()
    {
        btn.classList.remove("userFlash");
    } ,250);
}

function levelUp()
{
    userSeq.length = 0;
    level++;
    h2.innerText = `Level ${level}`;

    let ranIdx = Math.floor(Math.random()*3);
    let ranColor = btns[ranIdx];
    let ranBtn = document.querySelector(`.${ranColor}`);

    // console.log(ranIdx);
    // console.log(ranColor);
    // console.log(ranBtn);
    gameSeq.push(ranColor);
    console.log(gameSeq);

    gameFlash(ranBtn);
}

function checkAns(index)
{
    if(gameSeq[index] == userSeq[index])
    {
        if(userSeq.length == gameSeq.length)
        {
            setTimeout(levelUp() , 1000);
        }
    }

    else{
        highest_score = Math.max(highest_score , level);
        h2.innerHTML = `GAME OVER !! Your score was <b> ${level} </b> <br> Highest score is ${highest_score} <br> Press any key to start`;

        document.querySelector('body').style.backgroundColor = 'red';
        setTimeout(function()
        {
            document.querySelector('body').style.backgroundColor = 'white';
        } , 250);
        reset();
    }
}

function btnPress()
{
    if(started != false) //means game has started and then you have press the btn 
    {
        let btn = this;
        //   console.log(this);
          userFlash(btn);
        
          let userColor = btn.getAttribute('id');
          userSeq.push(userColor);
        
          checkAns(userSeq.length-1);
    }
}

let allBtns = document.querySelectorAll('.btn');
for(btn of allBtns)
{
    btn.addEventListener('click' , btnPress);
}

function reset()
{
    level = 0;
    started = false;
    gameSeq.length = 0;
    userSeq.length = 0;
}