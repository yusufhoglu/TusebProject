const recognition = new webkitSpeechRecognition();
recognition.continuous = true;

recognition.onresult = (event) => {
    const textOutput = document.getElementById('text-output');
    const result = event.results[event.results.length - 1];
    const transcript = result[0].transcript;
    textOutput.value += transcript;
    const word = transcript.toLowerCase();
    const phrase = word.split(" ");
    const numbersArray =["18","17","16","15","14","13","12","11","21","22","23","24","25","26","27","28","48","47","46"
        ,"45","44","43","42","41","31","32","33","34","35","36","37","38"];
    removeEmptyStringsFromArray(phrase)
    checkIfContinue(phrase[0]);
    if ((numbersArray.includes(phrase[0].toLowerCase())) && checkForWord(phrase[1])) {
        phrase[0] = numberToText(phrase[0]);
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

function numberToText(number){
    console.log("number içine girdi:"+number);
    var text = "";
    switch(Math.floor(number/10)) {
        case 1:
          text+="on";
          break;
        case 2:
          text+="yirmi";
          break;
        case 3:
          text+="otuz";
    }
    switch(number%10){
        case 1:
            text+="-bir"
            break;
        case 2:
            text+="-iki";
        break;  
        case 3:
            text+="-üç";
        break;
        case 4:
            text+="-dört";
        break;
        case 5:
            text+="-beş";
        break;
        case 6:
            text+="-altı";
        break;
        case 7:
            text+="-yedi";
        break;
        case 8:
            text+="-sekiz";
        break;
    }
    return text;
};

function textToNumber(text){
    //GEREK YOK GİBİ! 
    //API DEVAMLI SAYI OLARAK YAZIYOR (STRİNG DEĞİL)
};

function paint(numbers,color){
        document.getElementById(numbers).style.backgroundColor = color;
}

