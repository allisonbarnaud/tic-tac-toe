var activePlayer = "Player 1";
var grid = document.querySelectorAll('.box');
var playerOneBtn = document.querySelector('#p1');
var playerTwoBtn = document.querySelector('#p2');
var box = document.querySelectorAll('.inner-box');
var playerOneClicks = [];
var playerTwoClicks = [];
var allClicks = [];  
var matchTracker = [];
var hideElements = document.querySelectorAll('.hide');
var userAlerts = document.querySelector('.alerts');
var winCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];

function handleClick(event) {
    var boxNum = Number(event.target.dataset.id);
    if (handleDoubleClick(event)) {
        if (activePlayer == "Player 1") {
            playerOneBtn.classList.remove('active-player');
            playerTwoBtn.classList.add('active-player');
            event.target.textContent = "X";
            event.target.classList.add('show-X-O');
            allClicks.push(boxNum); 
            playerOneClicks.push(boxNum);
            if (checkWinner(playerOneClicks).length === 3) {
                handleWin(activePlayer);
            } else {
                handleDraw();
                switchActivePlayer("Player 2");
            }
        } else {
            playerTwoBtn.classList.remove('active-player');
            playerOneBtn.classList.add('active-player');
            event.target.textContent = "O";
            allClicks.push(boxNum);
            playerTwoClicks.push(boxNum);
            if (checkWinner(playerTwoClicks).length === 3) {
                handleWin(activePlayer);
            } else {
                handleDraw();
                switchActivePlayer("Player 1");
            }
        }
    }
}

function switchActivePlayer(playerName) {
    activePlayer = playerName;
}

for (var i = 0; i < 9; i++) {
    grid[i].addEventListener('click', handleClick);
}

function checkWinner(playerClicks) {
    for (var i = 0; i < winCombinations.length; i++) {
        for (var j = 0; j < 3; j++) {
            if (playerClicks.includes(winCombinations[i][j])) {
                matchTracker.push(winCombinations[i][j]);
            }    
        } 
        if (matchTracker.length === 3) {
            return matchTracker;
        } else {
            matchTracker = [];
        }
    }
    return matchTracker;
}

function handleReset() {
    handleRemoveWinComboBgColor();
    setTimeout(handleRemoveUserAlerts, 200);
    activePlayer = "Player 1";
    playerOneClicks = [];
    playerTwoClicks = [];
    allClicks = [];  
    matchTracker = [];
    hideElements[0].classList.remove('hide-elements');
    hideElements[1].classList.remove('hide-elements');
    // userAlerts.textContent = "";
    playerTwoBtn.classList.remove('active-player');
    playerOneBtn.classList.add('active-player');
    for (var i = 0; i < 9; i++) {
        box[i].textContent = "";
    }
}

function handleWin(activePlayer) {
    handleAddWinComboBgColor();
    setTimeout(handleHideElements, 800)
    setTimeout(handleHide, 1500); 
    setTimeout(handleReset, 4000); 
}

function handleHide() {
    if (allClicks.length === 9 && matchTracker.length !== 3) {
        userAlerts.textContent = `It's a draw. Restarting game...`;
        userAlerts.classList.add('show-elements');
    } else {
        userAlerts.classList.add('alerts-transition');
        userAlerts.textContent = `${activePlayer} wins. Restarting game...`;
        userAlerts.classList.add('show-elements');
    }
}

function handleDraw() {
    if (allClicks.length === 9) {
        handleWin();
    }   
}

function handleDoubleClick(event) {
    if (event.target.textContent === "") {
        return true;
    } else {
        hideElements[0].classList.add('hide-elements');
        hideElements[1].classList.add('hide-elements');
        setTimeout(handleDoubleClickMessage, 300);
        setTimeout(handleShowElements, 2500);
    }
}

function handleDoubleClickMessage() {
    userAlerts.textContent = `This box is already selected. Please select another box...`;
    userAlerts.classList.add('show-elements');
}

function handleShowElements() {
    userAlerts.textContent = "";
    hideElements[0].classList.remove('hide-elements');
    hideElements[1].classList.remove('hide-elements');
}

function handleHideElements() {
    hideElements[0].classList.add('hide-elements');
    hideElements[1].classList.add('hide-elements');
}

function handleAddWinComboBgColor() {
    if (matchTracker.length === 3) {
        for (var i = 0; i < 3; i++) {
            box[matchTracker[i]-1].classList.add('highlight-winners');
        }    
    }
}

function handleRemoveWinComboBgColor() {
    for (var i = 0; i < 9; i++) {
        box[i].classList.remove('highlight-winners');
    }
}

function handleRemoveUserAlerts() {
    userAlerts.classList.remove('show-elements');
}
