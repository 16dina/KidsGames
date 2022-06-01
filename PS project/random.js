var classifier; // variable that will contain our trained model
// var audioModelURL = 'https://teachablemachine.withgoogle.com/models/Xocz5tpLe/'; // variable of our trained model's URL
var audioModelURL = 'https://teachablemachine.withgoogle.com/models/TRgV7fW4d/'; // variable of our trained model's URL
var label = ""; // placeholder for the label, the thing we want to classify, the output of our model

var randomLetter = "";
var nextLetter = "";
const lettersArray = [];
var alphabet = "abcdefghijklmnopqrstuvwxyz";
function create_random_letter(string_length) {
    var alphabetWithoutZ = "abcdefghijklmnopqrstuvwxy";
    for (var i = 0; i < string_length; i++) {
        randomLetter += alphabetWithoutZ.charAt(Math.floor(Math.random() * alphabet.length));
    }
    return randomLetter;
}

// document.getElementById('generatedLetter').innerHTML = create_random_letter(1);
create_random_letter(1);

var img = document.createElement("img");
img.src = "./Images2/" + randomLetter + ".jpg";
var block = document.getElementById("generatedLetter");    
block.appendChild(img);

var indexOfRandom = alphabet.indexOf(randomLetter);
console.log(indexOfRandom);
function generateRandom(min, max) {
    var num = Math.floor(Math.random() * (max - min + 1)) + min;
    return (num === indexOfRandom) ? generateRandom(min, max) : num;
}

function createLettersAroundLetter() {
    var alphabet = "abcdefghijklmnopqrstuvwxyz";
    console.log(alphabet);
    // var randomDiv = document.getElementById('generatedLetter').innerHTML;
    console.log(randomLetter);
    var letter1 = alphabet.charAt(generateRandom(0, 25));
    var letter2 = alphabet.charAt(generateRandom(0, 25));
    nextLetter = alphabet.charAt(indexOfRandom + 1);
    var letter3 = alphabet.charAt(generateRandom(0, 25));
    var letter4 = alphabet.charAt(generateRandom(0, 25));

    lettersArray.push(letter1, letter2, nextLetter, letter3, letter4);

    return nextLetter;

}

// document.getElementById('theNextLetter').innerHTML = createLettersAroundLetter();
createLettersAroundLetter();

function shuffle(lettersArray) {
    let currentIndex = lettersArray.length,  randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [lettersArray[currentIndex], lettersArray[randomIndex]] = [lettersArray[randomIndex], lettersArray[currentIndex]];
    }

    return lettersArray;
}

console.log(lettersArray);
shuffle(lettersArray);
console.log(lettersArray);

var imgTwo = document.createElement("img");
var firstLetter = lettersArray[0];
console.log(firstLetter);
console.log(typeof firstLetter);
imgTwo.src = "./Images2/" + firstLetter + ".jpg";
imgTwo.id = "nextImage";
var blockTwo = document.getElementById("theNextLetter");
blockTwo.appendChild(imgTwo);
// document.getElementById("option").innerHTML = "Option: 1";


let i = 1;
let letter;
let imageURL;

function pictureChangeNext() {
    i++;
    if (i < lettersArray.length) {
        letter = lettersArray[i];
        console.log(letter);
        imageURL = "./Images2/" + letter + ".jpg";
        document.getElementById("nextImage").src = imageURL;
        // document.getElementById("option").innerHTML = "Option: " + i;
    }
}

function pictureChangeBack() {
    i--;
    if (i < lettersArray.length && i > 0) {
        letter = lettersArray[i];
        console.log(letter);
        imageURL = "./Images2/" + letter + ".jpg";
        document.getElementById("nextImage").src = imageURL;
    }
}

function playMusic() {
    var audio = new Audio('abc.mp3');
    audio.play();
}

document.addEventListener('keydown', function(e) {
    // left arrow key
    if (e.which === 37) {
        pictureChangeBack();
    }
    // right arrow key
    else if (e.which === 39) {
        pictureChangeNext();
    }
    // enter key
    else if (e.which === 13) {
        console.log(letter);
        if (letter === nextLetter) {
            document.getElementById("result").innerHTML = "Correct! :) After " + randomLetter.toUpperCase() + " comes " + nextLetter.toUpperCase() + " Press 'Space' to play again.";
            console.log("Winner");
        } else {
            document.getElementById("result").innerHTML = "Nope :( Try again!"
            console.log("try again");
        }
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === " " ||
        e.code === "Space" ||
        e.keyCode === 32
    ) {
        location.reload();
    }
});

function preload() {
    classifier = ml5.soundClassifier(audioModelURL + 'model.json');
}
preload();


function AIController() {
    switch (label) {
        case 'Next':
            pictureChangeNext();
            break;
        case 'Back':
            pictureChangeBack();
            break;
        case 'Choose':
            console.log(letter);
            if (letter === nextLetter) {
                document.getElementById("result").innerHTML = "Correct! :) After " + randomLetter.toUpperCase() + " comes " + nextLetter.toUpperCase() + " Press 'Space' to play again.";
                console.log("Winner");
            } else {
                document.getElementById("result").innerHTML = "Nope :( Try again!"
                console.log("try again");
            }
            break;
    }
}


function classifyAudio() {
    classifier.classify(gotResult);
}

classifyAudio();

function gotResult(error, results) {
    if (error) {
        console.error(error);
        return;
    }
    label = results[0].label;
    AIController();

}

// // Create variable for what you are trying to click
// let button = document.getElementById("theButton");

// // Click the button

// if (2>1) {
//   button.click();
// }
// else {
//   console.log("Error");
// }



