const recognition = new webkitSpeechRecognition();
recognition.continuous = true;

recognition.onresult = (event) => {
    const textOutput = document.getElementById('text-output');
    const result = event.results[event.results.length - 1];
    const transcript = result[0].transcript;
    textOutput.value += transcript;
    const word = transcript.toLowerCase();
    const phrase = word.split(" ");
    const numbersArray = Array.from({ length: 32 }, (_, i) => (i + 1).toString());
    console.log(phrase)
    removeEmptyStringsFromArray(phrase)
    console.log(phrase)

    if (numbersArray.includes(phrase[0])) {
        console.log(`Girilen değer: ${phrase[0]}`);
        const color = getColorForNumber(phrase[1]);
        changeSquareColor(phrase[0], color,phrase);
    }
}

function getColorForNumber(word) {
    if(word === "çürük"){
        return "red";
    }else if(word === "sağlam"){
        return;
    }else if(word === "kanal"){
        return "blue";
    }else if(word === "dolgu"){
        return "yellow";
    }
}

function changeSquareColor(number, color,word) {
    const squareId = `square${number}`;
    console.log("id = "+squareId);
    console.log(color)
    const square = document.getElementById(squareId);
    let text = word[1];
    if(word[2]){
        text +=" "+word[2];
    }
    if (square) {
        document.getElementById("square121").style.display = "block";
        document.getElementById("square12").style.display = "none";
        // square.style.backgroundColor = color;
        // square.innerText = number +" "+ text; 
    }
}

const startButton = document.getElementById('start-button');
const squareContainer = document.getElementById('square-container');

startButton.addEventListener('click', () => {
    recognition.start();
});

function removeEmptyStringsFromArray(arr) {
    for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i] === "") {
            arr.splice(i, 1); // Boş string'i diziden sil
        }
    }
    return arr;
}

// function createSquare(color, text) {
//     const square = document.createElement('div');
//     square.className = 'square';
//     square.style.backgroundColor = color;

//     // Sayıyı ve kelimeyi al
//     const lastWord = getLastWord();
//     if (lastWord && !isNaN(lastWord)) {
//         square.innerText = lastWord + ' - ' + text;
//     } else {
//         square.innerText = text;
//     }
//     squareContainer.appendChild(square);
// }

// function getLastWord() {
//     const words = document.getElementById('text-output').value.split(' ');
//     return words[words.length - 2];
// }
