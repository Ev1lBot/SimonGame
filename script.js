let gamePattern = [];
let userPattern = [];
const buttonColorArray = ['red', 'blue', 'green', 'yellow'];

let level = 0;
let gameStarted = false;

$(document).on('keydown', () => {
    if(!gameStarted) {
        newSequence();
        gameStarted = true;
    }
});

$(document).on('touchend', () => {
    if(!gameStarted) {
        newSequence();
        gameStarted = true;
    }
})

$('.btn').on('click', () => {
    if(gameStarted){
        let buttonId = $(this).attr('id');
        userPattern.push(buttonId);
    
        playAudio(`./sounds/${buttonId}.mp3`, 0.45);
        animatePress(buttonId);
        
        checkAnswer(userPattern.length - 1);
    }
});

function newSequence(){
    userPattern = [];

    $('#level-title').text(`Level ${level}`);
    level++;
    
    let randomChosenColor = buttonColorArray[Math.floor(Math.random()*4)];
    gamePattern.push(randomChosenColor);

    for (let i = 0; i < gamePattern.length; i++) {
        setTimeout( () => {
            $(`#${gamePattern[i]}`).fadeOut(100).fadeIn(100);
            playAudio(`./sounds/${gamePattern[i]}.mp3`, 0.45);
        }, i * 500);
    }
}

function playAudio(name, volume) {
    let audio = new Audio(name);
    audio.volume = volume;
    audio.play();
}

function animatePress(currentColor){
    $(`#${currentColor}`).addClass('pressed');
    setTimeout(() =>{ 
        $(`#${currentColor}`).removeClass('pressed');
    }, 100);
}

function checkAnswer(currentValue){
    if(userPattern[currentValue] === gamePattern[currentValue]){
        if(userPattern.length === gamePattern.length){
            setTimeout(newSequence, 1000);
        }
    } else{
        $('body').addClass('game-over');
        $('#level-title').text(`Game Over, Press Any Key to Restart`);
        playAudio('./sounds/wrong.mp3', 0.15);
        setTimeout(() => {
            $('body').removeClass('game-over');
        }, 200);
        startOver();
    }
}

function startOver(){
    gamePattern = [];
    level = 0;
    gameStarted = false;
}