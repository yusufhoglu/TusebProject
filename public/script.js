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
    var numberStringArray = [ "bir","iki","üç","dört","beş","altı","yedi","sekiz","dokuz","on","onbir","oniki","onüç","ondört","onbeş","onaltı","onyedi","onsekiz",
    "ondokuz","yirmi","yirmibir","yirmiiki","yirmiüç","yirmidört","yirmibeş","yirmialtı","yirmiyedi","yirmisekiz","yirmidokuz","otuz"];
    
    removeEmptyStringsFromArray(phrase)
    console.log(phrase[0])
    checkIfContinue(phrase[0]);
    if ((numbersArray.includes(phrase[0].toLowerCase()) || numberStringArray.includes(phrase[0].toLowerCase())) && checkForWord(phrase[1])) {
        const color = getColorForNumber(phrase[1]);
        paint(phrase[0],color);
    };
};

function getColorForNumber(word) {
    if(word === "çürük"){
        return "black";
    }else if(word === "sağlam"){
        return "green";
    }else if(word === "kanal"){
        return "red";
    }else if(word === "dolgu"){
        return "blue";
    }
}

function checkForWord(word) {
    if(word === "çürük"){
        return true;
    }else if(word === "sağlam"){
        return true;
    }else if(word === "kanal"){
        return true;
    }else if(word === "dolgu"){
        return true;
    }return false;
}

function checkIfContinue(word){
    if(word.toLowerCase() === "durdur"){
        recognition.stop();
    }
}

const startButton = document.getElementById('start-button');
const squareContainer = document.getElementById('square-container');
const stopButton = document.getElementById('stop-button');

stopButton.addEventListener('click', () => {
    recognition.stop();
});
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



function paint(numbers,color){
        const image = document.getElementById("image");
        const pointX = [103, 107, 107, 110, 126, 140, 180, 214, 265, 311, 347, 362, 377, 381, 385, 385, 388, 378, 368, 355, 340, 316, 289, 263, 231, 196, 169, 146, 136, 119, 109, 96];
        const pointY = [340, 291, 243, 198, 153, 125, 95, 70, 70, 87, 121, 156, 197, 245, 294, 338, 447, 500, 546, 580, 611, 639, 659, 675, 675, 659, 640, 616, 586, 539, 496, 445];
        
        const number = numbers;
        if (!isNaN(number) && number >= 1 && number <= pointX.length) {

            const x = pointX[number - 1];
            const y = pointY[number - 1];
            drawBlackSquare(x, y,color);
        }
    
        function drawBlackSquare(x, y,color) {
            const canvas = document.createElement("canvas");
            canvas.width = image.width;
            canvas.height = image.height;
            const context = canvas.getContext("2d");
            context.drawImage(image, 0, 0, image.width, image.height);
            context.fillStyle = color;
            context.fillRect(x, y, 10, 10); // 10x10 piksel siyah kare çizimi
            image.src = canvas.toDataURL("image/png");
        }
}

