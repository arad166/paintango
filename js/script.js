let shuffledWord = "";
var id1 = -1,id2 = -1;
var submit = true;

document.getElementById("control").addEventListener("click", clickControl);

function shuffle(word1, word2) {
    let res = '';

    let i = 0;
    let j = 0;
    while (i < word1.length && j < word2.length) {
        if (Math.random() < 0.5) {
        res += word1[i];
        i++;
        } else {
        res += word2[j];
        j++;
        }
    }

    while (i < word1.length) {
        res += word1[i];
        i++;
    }
    while (j < word2.length) {
        res += word2[j];
        j++;
    }

    return res;
}

function createButtons(word) {
  const buttonsDiv = document.getElementById("buttons");
  for (let i = 0; i < word.length; i++) {
    const button = document.createElement("button");
    button.textContent = word[i];
    button.dataset.index = i;
    button.style.backgroundColor = "#fbdac8";
    button.addEventListener("click", changeColor);
    buttonsDiv.appendChild(button);
  }
}

function deleteButtons(){
    const buttonsDiv = document.getElementById("buttons");
    buttonsDiv.innerHTML = "";
}

function changeColor(event) {
  const button = event.target;
  let currentColor = button.style.backgroundColor;
  let nextColor = "";
  if (currentColor === "rgb(251, 218, 200)") {
    nextColor = "#a1d8e6";
  } else {
    nextColor = "#fbdac8";
  }
  button.style.backgroundColor = nextColor;
}

function checkWord() {
  let redWord = "";
  let blueWord = "";
  for (let i = 0; i < shuffledWord.length; i++) {
    const button = document.querySelector(`button[data-index="${i}"]`);
    if (button.style.backgroundColor === "rgb(251, 218, 200)") {
      redWord += shuffledWord[i];
    } else {
      blueWord += shuffledWord[i];
    }
  }
  var res = true;
  const result = document.getElementById("result");
  if (words[id1] === redWord && words[id2] === blueWord) {
    result.textContent = "〇正解!〇"
    result.style.color = "red";
  } else if(words[id1] === blueWord && words[id2] === redWord){
    result.textContent = "〇正解!〇"
    result.style.color = "red";
  } else {
    result.textContent = "×不正解...×"
    result.style.color = "blue";
    res = false;
  }
  return res;
}

function showAnswer(){
    var idx1 = 0,idx2 = 0;
    for(var i = 0;i < shuffledWord.length;i++){
        const button = document.querySelector(`button[data-index="${i}"]`);
        if(idx1 === words[id1].length){
            button.style.backgroundColor = "#a1d8e6";
            idx2++;
            continue;
        }
        if(idx2 === words[id2].length){
            button.style.backgroundColor = "#fbdac8";
            idx1++;
            continue;
        }
        if(words[id1][idx1] === button.textContent){
            button.style.backgroundColor = "#fbdac8";
            idx1++;
        } else {
            button.style.backgroundColor = "#a1d8e6";
            idx2++;
        }
    }
}

function showMeanings(){
    const meaning1 = document.getElementById("meaning1");
    const meaning2 = document.getElementById("meaning2");
    meaning1.textContent = words[id1] + ': ' + meanings[id1];
    meaning2.textContent = words[id2] + ': ' + meanings[id2];
}

function deleteMeanings(){
    document.getElementById("meaning1").innerHTML = '&nbsp;';
    document.getElementById("meaning2").innerHTML = '&nbsp;';
}

function clickControl(event){
    const controlButton = event.target;
    if(submit){
        if(!checkWord()){
            showAnswer();
        };
        showMeanings();
        controlButton.textContent = "Next";
    } else {
        deleteMeanings();
        startGame();
        controlButton.textContent = "Submit";
    }
    submit = !submit;
}

// ゲームを開始する関数
function startGame() {
  deleteButtons();
  document.getElementById("result").innerHTML = '&nbsp;';
  let wordsSize = words.length;
  id1 = Math.floor(Math.random()*wordsSize);
  id2 = Math.floor(Math.random()*(wordsSize-1));
  if(id1 <= id2){
    id2++;
  }
  shuffledWord = shuffle(words[id1],words[id2]);
  createButtons(shuffledWord);
}

window.onload = function(){
    // ゲームを開始
    startGame();
}
