'use sctrict'

let bulbs = document.querySelectorAll(".bulb");
let arrBtn = document.querySelectorAll(".btn");
let main = document.querySelector(".main");
// sets id's for each button, from 1 to 9.
for (let i = 1; i < arrBtn.length + 1; i++) {
    arrBtn[i - 1].setAttribute("id", i)
}
let counter = 0;
let counter2 = 1;
let randomArr = getRandomArr();

// generates an array with 5 random values [1-9];
function getRandomArr() {
    let random = [];
    while (random.length < 5) {
        random.push(Math.ceil((Math.random() * 9 + 1) - 1));
    }
    return random;
}

// functions for lighting sequence
// callEach, getGame, lightsOff and lightsOff
// they're using randomArr 
function lightsOn(num, cnt) {
    //  console.log("cnt: "+cnt)
    //  console.log("cnt2: "+counter2)
    if (cnt == counter2) {
        return arrBtn.forEach(
            e => e.addEventListener("click", typeInOrder)
        )
    }
    callEach(num + 1, cnt + 1)
    return new Promise(resolve => {
        setTimeout(() => {
            document.getElementById(randomArr[num]).classList.add("btnOn");
            lightsOff(num)
        }, 200)
    })
}
function lightsOff(num) {
    return new Promise(resolve => {
        setTimeout(() =>
            document.getElementById(randomArr[num]).classList.remove("btnOn")
            , 400)
    })
}
function getGame(num, cnt) {
    return new Promise(resolve => {
        setTimeout(() => { lightsOn(num, cnt) }, 600)
    })
}
async function callEach(num, cnt) {
    //  console.log(`called ${cnt} times`)
    let key = await getGame(num, cnt);
}
callEach(0, counter)

// player types sequence

let playerArr = [];

function typeInOrder(e) {
    e.target.classList.toggle("btnSelect");
    setTimeout( () => e.target.classList.toggle("btnSelect"), 200)
    let option = e.target.getAttribute("id");
    playerArr.push(parseInt(option))
    let len = playerArr.length;
    for (let i = 0; i < len; i++) {
        if (playerArr[i] != randomArr[i]) {
            //  console.log(playerArr)
            return youLose()
        }
    }
    //console.log(playerArr)
    if (len >= 5) {
        return youWin()
    }
    //  console.log("cnt2: "+counter2)
    //  console.log("cnt: "+counter)
    if (len >= counter2) {
           
        arrBtn.forEach(
            e => e.removeEventListener("click", typeInOrder)
        )
        playerArr.length = 0;
        return counter2++ && callEach(0, counter) && playerArr && bulbOn();
    }
}

// function triggered when you win;

function youWin() {
    arrBtn.forEach(
        e => e.removeEventListener("click", typeInOrder));

    main.style.display= "none";

    let win = document.createElement("div");
    let winBtn = document.createElement("div");
    winBtn.addEventListener("click", resetGame)
    winBtn.innerHTML = "RESTART";
    win.innerHTML = "YOU WIN THE GAME";
    win.append(winBtn);
    win.classList.add("win");
    winBtn.classList.add("winBtn");
    document.body.append(win)

    function resetGame(){
        location.reload()
    }
}
// function triggered when you lose;
function youLose() {
    arrBtn.forEach(
        e => e.removeEventListener("click", typeInOrder));

    main.style.display= "none";

    let win = document.createElement("div");
    let winBtn = document.createElement("div");
    winBtn.addEventListener("click", resetGame)
    winBtn.innerHTML = "RESTART";
    win.innerHTML = "YOU LOSE THE GAME";
    win.append(winBtn);
    win.classList.add("win");
    winBtn.classList.add("winBtn");
    document.body.append(win)

    function resetGame(){
        location.reload()
    }
}

// function that lights bulbs, showing the level of the game.

function bulbOn(){
    for(let i = 0; i < counter2 ; i++){
        bulbs[i].classList.add("bulbOn");
    }
}
bulbOn()