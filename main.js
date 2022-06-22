import {words} from "./sub.js"

let loc = 0; // 文字の"r" "e" "d"を表す
let word; // wordsから抜き出した単語
let startTime; // 時間計測用
let isPlaying = false; // Play中かどうか判断 space押してスタートしたら'true'にする
const target = document.getElementById("target")

function setWord() {
  /*一度現れた単語はwords配列から消える*/
  word = words.splice(Math.floor(Math.random() * words.length), 1)[0]; 
  target.textContent = word;
  loc = 0; /* 新しい単語を取得したらlocをゼロにする */
};

document.addEventListener("keydown", e => { // キーが押されるたびに実行
  if (isPlaying === true) { // trueだったらreturn以下の処理は行わない 
    return; //キーが押されるたびにaddEventは発動するが、一度spaceが押されるとtrueになるので,以降spaceを押してもstartTime = Date.now();やsetWord();は発動しない
  }
  if (e.code === "Space") { // spaceが押されるたびに実行
    isPlaying = true; // spaceが押されたらtrueにする
    startTime = Date.now();
    setWord();
  }
});

document.addEventListener("keydown", e => { /*キーが入力されるたびに実行*/
  if (e.key !== word[loc]) { /* 入力されたキーと 文字列のloc番目が一致していなければ */
    return;
  }
  loc++; /* 一致していれば loc +1 */ 

    // 0: red
    // 1: _ed
    // 2: __d
    // 3: ___
  target.textContent = "_".repeat(loc) + word.substring(loc); 

  if (loc === word.length) { /* 文字数の分だけlocは増えていくので "___"の状態の時 */
    if (words.length === 0) {
      const result = document.getElementById("result");
      const finishedTime = ((Date.now() - startTime) / 1000).toFixed(2);
      result.textContent = `Finished!! ${finishedTime}seconds`;
      return;
    }
    setWord(); /* setWordが実行され、キーが押されたらaddEventListenerが発動 */
  }
});


