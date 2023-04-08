let shuffledWord = ""; // ミックスされた単語
var id1 = -1,id2 = -1;

// 単語をシャッフルする関数
function shuffle(word1, word2) {
    const length = word1.length + word2.length;
    let shuffledWord = '';

    let i = 0;
    let j = 0;
    while (i < word1.length && j < word2.length) {
        if (Math.random() < 0.5) {
        shuffledWord += word1[i];
        i++;
        } else {
        shuffledWord += word2[j];
        j++;
        }
    }

    // Add any remaining characters from the longer word
    while (i < word1.length) {
        shuffledWord += word1[i];
        i++;
    }
    while (j < word2.length) {
        shuffledWord += word2[j];
        j++;
    }

    return shuffledWord;
}

// ボタンを作成する関数
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

// ボタンがクリックされたとき、文字色を変える関数
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

// チェックボタンがクリックされたときの処理
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
  if (words[id1] === redWord && words[id2] === blueWord) {
    alert("Congratulations! You solved the puzzle!");
  } else if(words[id1] === blueWord && words[id2] === redWord){
    alert("Congratulations! You solved the puzzle!");
  } else {
    alert("Sorry, please try again.");
  }
}

// ゲームを開始する関数
function startGame() {
  id1 = Math.floor(Math.random()*200);
  id2 = Math.floor(Math.random()*199);
  if(id1 === id2){
    id2++;
  }
  shuffledWord = shuffle(words[id1],words[id2]);
  createButtons(shuffledWord);
  document.getElementById("check").addEventListener("click", checkWord);
}

// ゲームを開始
startGame();

